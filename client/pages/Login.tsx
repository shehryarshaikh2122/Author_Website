import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import type { AuthResponse } from "@shared/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user) {
        login(data.user);
        navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page-container flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <BookOpen className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-4 font-serif text-2xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your Literary Haven account</p>
          </div>

          <form onSubmit={handleSubmit} className="card-literary mt-8">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-50">
              <LogIn className="h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">Register</Link>
            </p>

            <div className="mt-6 rounded-md bg-secondary/50 p-3 text-xs text-muted-foreground">
              <p className="font-semibold">Demo Accounts:</p>
              <p>User: user@demo.com / demo123</p>
              <p>Admin: admin@demo.com / admin123</p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
