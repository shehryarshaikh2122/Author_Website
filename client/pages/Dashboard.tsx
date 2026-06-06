import { Link } from "react-router-dom";
import { BookOpen, Heart, User, Package, Settings } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <h1 className="font-serif text-2xl font-bold">Please Sign In</h1>
          <Link to="/login" className="btn-primary mt-6 inline-flex">Sign In</Link>
        </div>
      </Layout>
    );
  }

  const menuItems = [
    { icon: Package, label: "Order History", desc: "View your past orders", count: "3 orders" },
    { icon: Heart, label: "Saved Books", desc: "Books you've bookmarked", count: "5 saved" },
    { icon: User, label: "Favorite Authors", desc: "Authors you follow", count: "2 authors" },
    { icon: Settings, label: "Profile Settings", desc: "Update your account", count: "" },
  ];

  return (
    <Layout>
      <div className="hero-gradient border-b border-border">
        <div className="page-container py-12">
          <h1 className="section-title">My Dashboard</h1>
          <p className="section-subtitle">Welcome back, {user.name}</p>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="card-literary mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {menuItems.map((item) => (
            <div key={item.label} className="card-literary flex items-start gap-4 transition-all hover:shadow-literary-lg cursor-pointer">
              <div className="rounded-lg bg-secondary p-3">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {item.count && <p className="mt-1 text-xs font-medium text-primary">{item.count}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/books" className="btn-secondary inline-flex">
            <BookOpen className="h-4 w-4" /> Continue Browsing
          </Link>
        </div>
      </div>
    </Layout>
  );
}
