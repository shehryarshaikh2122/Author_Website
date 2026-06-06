import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createApp } from "./app";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const PORT = parseInt(process.env.PORT || "8080");

async function startServer() {
  const app = createApp({ apiOnly: !isProduction });

  if (!isProduction) {
    const vite = await createViteServer({
      root: path.resolve(__dirname, "../client"),
      server: { middlewareMode: true },
      appType: "spa",
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../client"),
          "@shared": path.resolve(__dirname, "../shared"),
        },
      },
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
