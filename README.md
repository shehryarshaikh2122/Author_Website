# Literary Haven — Author & Books Discovery Platform

A full-stack web application for discovering famous authors, exploring their biographies, browsing books, and purchasing through Amazon affiliate links. Built with a modern React + TypeScript + Express stack with a beautiful, responsive literary-themed design.

![Literary Haven](https://img.shields.io/badge/Stack-React%20%2B%20Express-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

---

## Features

### Public Website
- **Home Page** — Featured authors, popular books, trending section, genre categories, hero banner
- **Authors Page** — Grid listing with search, genre & nationality filters
- **Author Detail** — Full biography, awards, statistics, all books by author
- **Books Page** — Searchable catalog with genre filtering
- **Book Detail** — Description, ratings, reviews, related books, Amazon buy link
- **Shopping Cart** — Add/remove books, quantity management, order summary
- **Checkout** — Customer info form, payment method selection (Card, Stripe, PayPal, COD)
- **Contact Page** — Contact form with business information
- **User Auth** — Registration, login, user dashboard
- **Dark Mode** — Toggle between light and dark themes

### Admin Panel
- Dashboard with statistics overview
- Author management (CRUD interface)
- Book management (CRUD interface)
- Category management
- Order management with status tracking
- Amazon affiliate link management
- Analytics dashboard

### Integrations
- Amazon Affiliate Links on every book
- Payment gateway UI (Stripe, PayPal, Card, COD)
- Newsletter subscription in footer

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, React Router 6, TailwindCSS 3 |
| Backend | Express.js, TypeScript |
| Build | Vite 6 |
| Icons | Lucide React |
| State | React Context (Cart, Auth) |
| Storage | localStorage (cart & auth persistence) |

---

## Project Structure

```
Authorwebsite/
├── client/                     # React SPA Frontend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigation with search, cart, dark mode
│   │   │   ├── Footer.tsx      # Footer with links & newsletter
│   │   │   └── Layout.tsx      # Page wrapper
│   │   ├── AuthorCard.tsx      # Author grid card
│   │   ├── BookCard.tsx        # Book grid card with add-to-cart
│   │   ├── StarRating.tsx      # Star rating display
│   │   └── SectionHeader.tsx   # Reusable section headers
│   ├── context/
│   │   ├── CartContext.tsx     # Shopping cart state
│   │   └── AuthContext.tsx     # User authentication state
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   ├── Authors.tsx         # Authors listing
│   │   ├── AuthorDetail.tsx    # Single author profile
│   │   ├── Books.tsx           # Books catalog
│   │   ├── BookDetail.tsx      # Single book page
│   │   ├── Cart.tsx            # Shopping cart
│   │   ├── Checkout.tsx        # Checkout flow
│   │   ├── Login.tsx           # User login
│   │   ├── Register.tsx        # User registration
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── Admin.tsx           # Admin panel
│   │   ├── Contact.tsx         # Contact page
│   │   └── NotFound.tsx        # 404 page
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Router configuration
│   ├── main.tsx                # App entry point
│   ├── global.css              # Tailwind + literary theme
│   └── index.html              # HTML template
├── server/                     # Express API Backend
│   ├── data/
│   │   └── mockData.ts         # Authors, books, categories, reviews
│   ├── routes/
│   │   ├── authors.ts          # Author API endpoints
│   │   ├── books.ts            # Book API endpoints
│   │   ├── categories.ts       # Category endpoints
│   │   ├── orders.ts           # Checkout endpoint
│   │   └── auth.ts             # Login/register endpoints
│   └── index.ts                # Server setup + Vite integration
├── shared/
│   └── api.ts                  # Shared TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server (frontend + backend on port 8080)
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Other Commands

```bash
pnpm build       # Production build
pnpm start       # Start production server
pnpm typecheck   # TypeScript validation
pnpm test        # Run tests
```

---

## Demo Accounts

| Role  | Email            | Password  |
|-------|------------------|-----------|
| User  | user@demo.com    | demo123   |
| Admin | admin@demo.com   | admin123  |

---

## API Endpoints

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/ping`           | Health check                   |
| GET    | `/api/authors`        | List authors (with filters)    |
| GET    | `/api/authors/:id`    | Author detail with books       |
| GET    | `/api/books`          | List books (with filters)      |
| GET    | `/api/books/:id`      | Book detail with reviews       |
| GET    | `/api/categories`     | List categories                |
| POST   | `/api/checkout`       | Place an order                 |
| POST   | `/api/auth/login`     | User login                     |
| POST   | `/api/auth/register`  | User registration              |

### Query Parameters

**Authors:** `?search=shakespeare&genre=fantasy&nationality=english&featured=true`

**Books:** `?search=harry&genre=fantasy&authorId=2&featured=true&trending=true&categoryId=7`

---

## Database Schema (Reference)

The current version uses mock data. For production with MySQL:

| Table        | Key Fields                                              |
|-------------|---------------------------------------------------------|
| users       | id, name, email, password, role                         |
| authors     | id, name, biography, image, nationality                 |
| books       | id, author_id, title, description, cover_image, amazon_link, price |
| categories  | id, name                                                |
| orders      | id, user_id, total_amount, status                       |
| order_items | id, order_id, book_id, quantity                         |
| reviews     | id, user_id, book_id, rating, comment                     |

---

## Design System

- **Fonts:** Playfair Display (headings), Source Sans 3 (body)
- **Colors:** Literary cream, burgundy, gold, brown palette
- **Components:** Card-based layout with hover effects and shadows
- **Responsive:** Mobile-first with breakpoints at sm, md, lg, xl

---

## Deployment

### Standard Build
```bash
pnpm build
pnpm start
```

### Hosting Options
- **Vercel / Netlify** — Deploy the built client + serverless API
- **VPS / cPanel** — Run `pnpm start` with Apache/Nginx reverse proxy
- **Docker** — Containerize with Node.js base image

---

## Future Enhancements

- [ ] MySQL database integration
- [ ] Real Stripe/PayPal payment processing
- [ ] Email notifications for orders
- [ ] Book recommendations engine
- [ ] Multi-language support
- [ ] Blog section
- [ ] Wishlist system
- [ ] SEO meta tags per page
- [ ] Affiliate click tracking analytics

---

## License

MIT License — Free to use for personal and commercial projects.
