import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { AuthResponse, RegisterRequest } from "../../shared/api";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name, email } = req.body as RegisterRequest;

  if (!name || !email) {
    const response: AuthResponse = { success: false, message: "Name and email are required" };
    return res.status(400).json(response);
  }

  const response: AuthResponse = {
    success: true,
    user: { id: Date.now(), name, email, role: "user" },
    message: "Registration successful",
  };
  return res.status(200).json(response);
}
