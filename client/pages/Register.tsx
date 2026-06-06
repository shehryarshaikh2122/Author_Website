import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, UserPlus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import type { AuthResponse } from "@shared/api";

export default function Register() {
  const [name, setName] = useState("");
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.user) {
        login(data.user);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Registration failed. Please try again.");
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
            <h1 className="mt-4 font-serif text-2xl font-bold">Create Account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Join Literary Haven and start exploring</p>
          </div>

          <form onSubmit={handleSubmit} className="card-literary mt-8">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Full Name</label>
                <input required className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input type="password" required minLength={6} className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-50">
              <UserPlus className="h-4 w-4" />
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
