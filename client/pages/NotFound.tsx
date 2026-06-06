import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="page-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/30" />
        <h1 className="mt-6 font-serif text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    </Layout>
  );
}
