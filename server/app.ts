import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAuthors, getAuthorById } from "./routes/authors";
import { getBooks, getBookById } from "./routes/books";
import { getCategories } from "./routes/categories";
import { checkout } from "./routes/orders";
import { login, register } from "./routes/auth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp(options: { apiOnly?: boolean } = {}): Express {
  const app = express();
  app.use(express.json());

  app.get("/api/ping", (_req, res) => res.json({ message: "pong" }));
  app.get("/api/authors", getAuthors);
  app.get("/api/authors/:id", getAuthorById);
  app.get("/api/books", getBooks);
  app.get("/api/books/:id", getBookById);
  app.get("/api/categories", getCategories);
  app.post("/api/checkout", checkout);
  app.post("/api/auth/login", login);
  app.post("/api/auth/register", register);

  if (!options.apiOnly) {
    const clientPath = path.resolve(__dirname, "../client");
    app.use(express.static(clientPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(clientPath, "index.html"));
    });
  }

  return app;
}
