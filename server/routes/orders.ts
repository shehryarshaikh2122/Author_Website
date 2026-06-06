import { RequestHandler } from "express";
import type { CheckoutRequest, CheckoutResponse } from "@shared/api";

let orderCounter = 1000;

export const checkout: RequestHandler = (req, res) => {
  const body = req.body as CheckoutRequest;

  if (!body.items?.length || !body.customerInfo?.email) {
    res.status(400).json({ success: false, message: "Invalid checkout data" });
    return;
  }

  orderCounter++;
  const response: CheckoutResponse = {
    success: true,
    orderId: orderCounter,
    message: `Order #${orderCounter} placed successfully! You will receive a confirmation email shortly.`,
  };
  res.json(response);
};
