// Server-only: never import this from a Client Component or expose the secret key to the browser.

const ADD_ORDER_URL = "https://my.ithinklogistics.com/api_v3/order/add.json";
const TRACK_ORDER_URL = "https://api.ithinklogistics.com/api_v3/order/track.json";

function credentials() {
  const accessToken = process.env.ITHINK_ACCESS_TOKEN;
  const secretKey = process.env.ITHINK_SECRET_KEY;
  const pickupAddressId = process.env.ITHINK_WAREHOUSE_ID;
  if (!accessToken || !secretKey || !pickupAddressId) {
    throw new Error("Missing ITHINK_ACCESS_TOKEN, ITHINK_SECRET_KEY or ITHINK_WAREHOUSE_ID environment variable.");
  }
  return { accessToken, secretKey, pickupAddressId };
}

function formatDate(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

// Every fragrance ships as a small, well-padded parcel — these are reasonable
// flat defaults for rate/label purposes, not exact per-SKU measurements.
// Weight is in kilograms (the API rejects values above 150).
const DEFAULT_WEIGHT_KG = 0.4;
const DEFAULT_DIMENSIONS_CM = { length: 15, width: 12, height: 10 };

export async function createShipment(order) {
  const { accessToken, secretKey, pickupAddressId } = credentials();

  const [addressLine, ...cityStateParts] = (order.address || "").split(",");
  const city = order.city || cityStateParts.join(",").trim() || "";
  const pin = (order.address || "").match(/\b\d{6}\b/)?.[0] || "";

  const payload = {
    data: {
      shipments: [
        {
          order: order.id,
          sub_order: "",
          order_date: formatDate(order.date || new Date()),
          total_amount: String(order.total),
          name: order.customerName,
          add: addressLine || order.address || "",
          pin,
          city,
          state: "",
          country: "India",
          phone: order.phone,
          alt_phone: order.phone,
          email: order.email || "",
          is_billing_same_as_shipping: "yes",
          products: order.items.map((item) => ({
            product_name: item.productId,
            product_quantity: String(item.qty),
            product_price: String(item.price),
          })),
          shipment_length: String(DEFAULT_DIMENSIONS_CM.length),
          shipment_width: String(DEFAULT_DIMENSIONS_CM.width),
          shipment_height: String(DEFAULT_DIMENSIONS_CM.height),
          weight: String(DEFAULT_WEIGHT_KG),
          payment_mode: "Prepaid",
          cod_amount: "0",
          shipping_charges: "0",
          giftwrap_charges: "0",
          transaction_charges: "0",
          total_discount: "0",
          first_attemp_discount: "0",
          cod_charges: "0",
          advance_amount: "0",
          return_address_id: pickupAddressId,
          eway_bill_number: "",
          gst_number: "",
          what3words: "",
          add2: "",
          add3: "",
        },
      ],
      pickup_address_id: pickupAddressId,
      access_token: accessToken,
      secret_key: secretKey,
      s_type: "surface",
    },
  };

  const res = await fetch(ADD_ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`iThink Logistics returned a non-JSON response (HTTP ${res.status}): ${text.slice(0, 200)}`);
  }

  const result = json?.data?.["1"];
  if (!result || result.status?.toLowerCase() !== "success") {
    throw new Error(result?.remark || json?.html_message || "Could not create shipment with iThink Logistics.");
  }

  return { awbNumber: result.waybill, courierName: result.logistic_name || null };
}

export async function trackShipment(awbNumber) {
  const { accessToken, secretKey } = credentials();

  const res = await fetch(TRACK_ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { awb_number_list: awbNumber, access_token: accessToken, secret_key: secretKey },
    }),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`iThink Logistics returned a non-JSON response (HTTP ${res.status}): ${text.slice(0, 200)}`);
  }

  const shipment = json?.data?.[awbNumber];
  if (!shipment) throw new Error("Could not fetch tracking status.");

  return {
    status: shipment.current_status || "Unknown",
    courier: shipment.logistic || "",
    expectedDelivery: shipment.expected_delivery_date || null,
  };
}
