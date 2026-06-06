import { Link } from "react-router-dom";
import { BookOpen, Mail, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-literary-brown text-literary-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-literary-gold" />
              <span className="font-serif text-xl font-bold">Literary Haven</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-literary-parchment/80">
              Your gateway to discovering famous authors, exploring literary masterpieces, and finding your next great read.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-literary-parchment/60 transition-colors hover:text-literary-gold" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-literary-parchment/60 transition-colors hover:text-literary-gold" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-literary-parchment/60 transition-colors hover:text-literary-gold" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-literary-gold">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/authors" className="text-literary-parchment/70 hover:text-literary-gold">All Authors</Link></li>
              <li><Link to="/books" className="text-literary-parchment/70 hover:text-literary-gold">All Books</Link></li>
              <li><Link to="/books?featured=true" className="text-literary-parchment/70 hover:text-literary-gold">Featured Books</Link></li>
              <li><Link to="/books?trending=true" className="text-literary-parchment/70 hover:text-literary-gold">Trending Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-literary-gold">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/books?genre=fiction" className="text-literary-parchment/70 hover:text-literary-gold">Fiction</Link></li>
              <li><Link to="/books?genre=mystery" className="text-literary-parchment/70 hover:text-literary-gold">Mystery</Link></li>
              <li><Link to="/books?genre=fantasy" className="text-literary-parchment/70 hover:text-literary-gold">Fantasy</Link></li>
              <li><Link to="/books?genre=horror" className="text-literary-parchment/70 hover:text-literary-gold">Horror</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-literary-gold">Newsletter</h4>
            <p className="mt-4 text-sm text-literary-parchment/70">
              Subscribe for book recommendations and author updates.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border border-literary-parchment/20 bg-literary-ink/30 px-3 py-2 text-sm text-literary-cream placeholder:text-literary-parchment/40 outline-none focus:border-literary-gold"
              />
              <button type="submit" className="rounded-md bg-literary-gold px-4 py-2 text-sm font-semibold text-literary-ink hover:brightness-110">
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-literary-parchment/10 pt-8 text-sm text-literary-parchment/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Literary Haven. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-literary-gold">Contact</Link>
            <a href="#" className="hover:text-literary-gold">Privacy Policy</a>
            <a href="#" className="hover:text-literary-gold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
