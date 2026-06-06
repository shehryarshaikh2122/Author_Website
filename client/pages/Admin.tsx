import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, FolderOpen, ShoppingBag,
  Link as LinkIcon, BarChart3, Plus, Edit, Trash2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import type { Author, Book, Category } from "@shared/api";
import { formatPrice } from "@/lib/utils";

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        fetch("/api/authors").then((r) => r.json()),
        fetch("/api/books").then((r) => r.json()),
        fetch("/api/categories").then((r) => r.json()),
      ]).then(([a, b, c]) => {
        setAuthors(a.authors);
        setBooks(b.books);
        setCategories(c.categories);
      });
    }
  }, [isAdmin]);

  if (!user || !isAdmin) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <h1 className="font-serif text-2xl font-bold">Admin Access Required</h1>
          <p className="mt-2 text-muted-foreground">Please sign in with an admin account.</p>
          <Link to="/login" className="btn-primary mt-6 inline-flex">Sign In</Link>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "authors", label: "Authors", icon: Users },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "categories", label: "Categories", icon: FolderOpen },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "affiliate", label: "Amazon Links", icon: LinkIcon },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <Layout>
      <div className="border-b border-border bg-card">
        <div className="page-container py-6">
          <h1 className="font-serif text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage authors, books, orders, and content</p>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <nav className="flex gap-2 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-6">Overview</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Total Authors", value: authors.length, icon: Users, color: "text-blue-500" },
                    { label: "Total Books", value: books.length, icon: BookOpen, color: "text-green-500" },
                    { label: "Categories", value: categories.length, icon: FolderOpen, color: "text-purple-500" },
                    { label: "Orders", value: "12", icon: ShoppingBag, color: "text-orange-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="card-literary">
                      <div className="flex items-center justify-between">
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        <span className="font-serif text-3xl font-bold">{stat.value}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "authors" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold">Author Management</h2>
                  <button className="btn-primary text-xs"><Plus className="h-4 w-4" /> Add Author</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Nationality</th>
                        <th className="pb-3 pr-4">Books</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authors.map((a) => (
                        <tr key={a.id} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-medium">{a.name}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{a.nationality}</td>
                          <td className="py-3 pr-4">{a.totalBooks}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button className="text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></button>
                              <button className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "books" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold">Book Management</h2>
                  <button className="btn-primary text-xs"><Plus className="h-4 w-4" /> Add Book</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-3 pr-4">Title</th>
                        <th className="pb-3 pr-4">Author</th>
                        <th className="pb-3 pr-4">Price</th>
                        <th className="pb-3 pr-4">Rating</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((b) => (
                        <tr key={b.id} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-medium">{b.title}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{b.authorName}</td>
                          <td className="py-3 pr-4">{formatPrice(b.price)}</td>
                          <td className="py-3 pr-4">{b.rating}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button className="text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></button>
                              <button className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold">Categories</h2>
                  <button className="btn-primary text-xs"><Plus className="h-4 w-4" /> Add Category</button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((cat) => (
                    <div key={cat.id} className="card-literary flex items-center justify-between py-3">
                      <span className="font-medium">{cat.name}</span>
                      <div className="flex gap-2">
                        <button className="text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></button>
                        <button className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-6">Order Management</h2>
                <div className="space-y-3">
                  {[
                    { id: 1001, customer: "Sarah M.", total: 42.97, status: "delivered" },
                    { id: 1002, customer: "James K.", total: 28.98, status: "processing" },
                    { id: 1003, customer: "Emily R.", total: 55.47, status: "pending" },
                  ].map((order) => (
                    <div key={order.id} className="card-literary flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        <span className={`text-xs font-medium capitalize ${
                          order.status === "delivered" ? "text-green-600" :
                          order.status === "processing" ? "text-blue-600" : "text-yellow-600"
                        }`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "affiliate" && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-6">Amazon Affiliate Links</h2>
                <div className="space-y-3">
                  {books.slice(0, 5).map((b) => (
                    <div key={b.id} className="card-literary flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-sm">{b.title}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-md">{b.amazonLink}</p>
                      </div>
                      <button className="text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h2 className="font-serif text-xl font-bold mb-6">Analytics Dashboard</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Page Views", value: "12,450" },
                    { label: "Amazon Clicks", value: "1,230" },
                    { label: "Affiliate Revenue", value: "$342.50" },
                  ].map((stat) => (
                    <div key={stat.label} className="card-literary text-center">
                      <p className="font-serif text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
