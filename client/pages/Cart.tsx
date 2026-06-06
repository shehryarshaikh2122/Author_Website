import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h1 className="mt-6 font-serif text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mt-2 text-muted-foreground">Browse our collection and add some books!</p>
          <Link to="/books" className="btn-primary mt-8 inline-flex">Browse Books</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container py-8">
        <Link to="/books" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="section-title">Shopping Cart</h1>
        <p className="section-subtitle">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.bookId} className="card-literary flex gap-4 p-4">
                <img src={item.coverImage} alt={item.title} className="h-28 w-20 rounded-md object-cover" />
                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif font-semibold">{item.title}</h3>
                  <p className="mt-1 font-semibold text-primary">{formatPrice(item.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                        className="rounded-md border border-border p-1 hover:bg-secondary"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                        className="rounded-md border border-border p-1 hover:bg-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.bookId)}
                      className="text-muted-foreground transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card-literary h-fit">
            <h2 className="font-serif text-xl font-bold">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="font-serif text-xl text-primary">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary mt-6 w-full text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
