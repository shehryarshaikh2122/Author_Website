import * as esbuild from "esbuild";
import { unlinkSync } from "node:fs";

const entries = [
  "api/authors.ts",
  "api/books.ts",
  "api/categories.ts",
  "api/checkout.ts",
  "api/auth/login.ts",
  "api/auth/register.ts",
  "api/authors/[id].ts",
  "api/books/[id].ts",
];

for (const entry of entries) {
  const outfile = entry.replace(/\.ts$/, ".js");

  await esbuild.build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    logLevel: "info",
  });

  if (process.env.VERCEL) {
    try {
      unlinkSync(entry);
    } catch {
      // Ignore missing source files during repeated builds.
    }
  }
}
