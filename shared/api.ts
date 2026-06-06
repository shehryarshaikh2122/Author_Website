export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  biography: string;
  image: string;
  nationality: string;
  birthDate: string;
  deathDate?: string;
  genres: string[];
  awards: string[];
  socialLinks?: {
    twitter?: string;
    website?: string;
    wikipedia?: string;
  };
  totalBooks: number;
  featured: boolean;
}

export interface Book {
  id: number;
  authorId: number;
  authorName: string;
  title: string;
  description: string;
  coverImage: string;
  amazonLink: string;
  price: number;
  genre: string;
  categoryId: number;
  isbn: string;
  publicationDate: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  trending: boolean;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface CartItem {
  bookId: number;
  title: string;
  coverImage: string;
  price: number;
  quantity: number;
  amazonLink: string;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
}

export interface OrderItem {
  bookId: number;
  title: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
}

export interface AuthorsResponse {
  authors: Author[];
  total: number;
}

export interface BooksResponse {
  books: Book[];
  total: number;
}

export interface AuthorDetailResponse {
  author: Author;
  books: Book[];
  reviews: Review[];
}

export interface BookDetailResponse {
  book: Book;
  author: Author;
  relatedBooks: Book[];
  reviews: Review[];
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface CheckoutRequest {
  items: CartItem[];
  customerInfo: CustomerInfo;
  paymentMethod: "cod" | "stripe" | "paypal" | "card";
}

export interface CheckoutResponse {
  success: boolean;
  orderId: number;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message: string;
}
