import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import type { CheckoutRequest } from "@shared/api";

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<CheckoutRequest["paymentMethod"]>("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ orderId: number; message: string } | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
  });

  if (items.length === 0 && !success) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <h1 className="font-serif text-2xl font-bold">Nothing to Checkout</h1>
          <p className="mt-2 text-muted-foreground">Add some books to your cart first.</p>
          <Link to="/books" className="btn-primary mt-6 inline-flex">Browse Books</Link>
        </div>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-6 font-serif text-2xl font-bold">Order Placed Successfully!</h1>
          <p className="mt-2 text-muted-foreground">Order #{success.orderId}</p>
          <p className="mt-4 text-sm text-muted-foreground">{success.message}</p>
          <button onClick={() => navigate("/")} className="btn-primary mt-8">Back to Home</button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerInfo: form, paymentMethod }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        setSuccess({ orderId: data.orderId, message: data.message });
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="page-container py-8">
        <Link to="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>

        <h1 className="section-title">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-literary">
              <h2 className="font-serif text-lg font-semibold">Customer Information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Full Name *</label>
                  <input required className="input-field" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email *</label>
                  <input required type="email" className="input-field" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Phone *</label>
                  <input required className="input-field" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Billing Address *</label>
                  <textarea required className="input-field" rows={2} value={form.billingAddress} onChange={(e) => updateField("billingAddress", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Shipping Address *</label>
                  <textarea required className="input-field" rows={2} value={form.shippingAddress} onChange={(e) => updateField("shippingAddress", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="card-literary">
              <h2 className="font-serif text-lg font-semibold">Payment Method</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(["card", "stripe", "paypal", "cod"] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-md border-2 px-4 py-3 text-sm font-medium capitalize transition-all ${
                      paymentMethod === method
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {method === "cod" ? "Cash on Delivery" : method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-literary h-fit">
            <h2 className="font-serif text-lg font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.bookId} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.title} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-50">
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
