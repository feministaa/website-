import { NextResponse } from "next/server";
import { getOrders, updateOrder } from "@/lib/dataStore";
import { isAdminAuthed } from "@/lib/auth";
import { createShipment, trackShipment, mapCourierStatusToOrderStatus } from "@/lib/ithinklogistics";

export const runtime = "nodejs";

export async function POST(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const orders = await getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const shipment = await createShipment(order);
    const updated = await updateOrder(id, {
      awb_number: shipment.awbNumber,
      courier_name: shipment.courierName,
      shipment_status: "created",
    });
    return NextResponse.json(updated);
  } catch (err) {
    await updateOrder(id, { shipment_status: "failed" }).catch(() => {});
    return NextResponse.json({ error: err.message || "Could not create shipment." }, { status: 502 });
  }
}

export async function GET(request, { params }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const orders = await getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!order.awbNumber) return NextResponse.json({ error: "No shipment booked yet." }, { status: 400 });

  const tracking = await trackShipment(order.awbNumber);

  const mappedStatus = mapCourierStatusToOrderStatus(tracking.status);
  const hasRealDeliveryDate = tracking.expectedDelivery && !/^0000/.test(tracking.expectedDelivery);
  const patch = {};
  if (mappedStatus && mappedStatus !== order.status) patch.status = mappedStatus;
  if (hasRealDeliveryDate && tracking.expectedDelivery !== order.expectedDelivery) {
    patch.expected_delivery = tracking.expectedDelivery;
  }
  if (Object.keys(patch).length) await updateOrder(id, patch).catch(() => {});

  return NextResponse.json({
    ...tracking,
    orderStatus: mappedStatus || order.status,
    expectedDelivery: hasRealDeliveryDate ? tracking.expectedDelivery : order.expectedDelivery,
  });
}
