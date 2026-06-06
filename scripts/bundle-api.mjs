import * as esbuild from "esbuild";

const entries = [
  { input: "api-src/authors.ts", output: "api/authors.js" },
  { input: "api-src/books.ts", output: "api/books.js" },
  { input: "api-src/categories.ts", output: "api/categories.js" },
  { input: "api-src/checkout.ts", output: "api/checkout.js" },
  { input: "api-src/auth/login.ts", output: "api/auth/login.js" },
  { input: "api-src/auth/register.ts", output: "api/auth/register.js" },
  { input: "api-src/authors/[id].ts", output: "api/authors/[id].js" },
  { input: "api-src/books/[id].ts", output: "api/books/[id].js" },
];

for (const { input, output } of entries) {
  await esbuild.build({
    entryPoints: [input],
    outfile: output,
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    logLevel: "info",
  });
}
