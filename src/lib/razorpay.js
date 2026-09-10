import Razorpay from "razorpay";

// Server-only: never import this from a Client Component or expose the key secret to the browser.
let instance = null;

export function razorpayClient() {
  if (instance) return instance;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variable.");
  }

  instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return instance;
}
