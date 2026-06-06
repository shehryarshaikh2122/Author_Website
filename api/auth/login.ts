import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { AuthResponse, LoginRequest } from "../../shared/api";

const demoUsers = [
  { id: 1, name: "Demo User", email: "user@demo.com", password: "demo123", role: "user" as const },
  { id: 2, name: "Admin", email: "admin@demo.com", password: "admin123", role: "admin" as const },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { email, password } = req.body as LoginRequest;
  const user = demoUsers.find((entry) => entry.email === email && entry.password === password);

  if (!user) {
    const response: AuthResponse = { success: false, message: "Invalid email or password" };
    return res.status(401).json(response);
  }

  const response: AuthResponse = {
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    message: "Login successful",
  };
  return res.status(200).json(response);
}
