import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { CheckoutRequest } from "../shared/api";

let orderCounter = 1000;

export default function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body as CheckoutRequest;

  if (!body.items?.length || !body.customerInfo?.email) {
    return res.status(400).json({ success: false, message: "Invalid checkout data" });
  }

  orderCounter++;
  return res.status(200).json({
    success: true,
    orderId: orderCounter,
    message: `Order #${orderCounter} placed successfully! You will receive a confirmation email shortly.`,
  });
}
