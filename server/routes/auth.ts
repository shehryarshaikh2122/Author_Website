import { RequestHandler } from "express";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@shared/api";

const demoUsers = [
  { id: 1, name: "Demo User", email: "user@demo.com", password: "demo123", role: "user" as const },
  { id: 2, name: "Admin", email: "admin@demo.com", password: "admin123", role: "admin" as const },
];

export const login: RequestHandler = (req, res) => {
  const { email, password } = req.body as LoginRequest;
  const user = demoUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    const response: AuthResponse = { success: false, message: "Invalid email or password" };
    res.status(401).json(response);
    return;
  }

  const response: AuthResponse = {
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    message: "Login successful",
  };
  res.json(response);
};

export const register: RequestHandler = (req, res) => {
  const { name, email } = req.body as RegisterRequest;

  if (!name || !email) {
    const response: AuthResponse = { success: false, message: "Name and email are required" };
    res.status(400).json(response);
    return;
  }

  const response: AuthResponse = {
    success: true,
    user: { id: Date.now(), name, email, role: "user" },
    message: "Registration successful",
  };
  res.json(response);
};
