import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="hero-gradient border-b border-border">
        <div className="page-container py-12">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-xl font-bold">Get in Touch</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Have a question about an author, book recommendation, or partnership inquiry? 
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3"><Mail className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">hello@literaryhaven.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3"><Phone className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3"><MapPin className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">123 Literary Lane, Booktown, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="card-literary flex flex-col items-center justify-center py-16 text-center">
              <Send className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-bold">Message Sent!</h3>
              <p className="mt-2 text-muted-foreground">Thank you for reaching out. We'll respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-literary space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input required className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input required type="email" className="input-field" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Subject</label>
                <input required className="input-field" placeholder="How can we help?" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea required className="input-field" rows={5} placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
