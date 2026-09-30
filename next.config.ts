import type { NextConfig } from "next";

// Fully static site. On GitHub Pages it lives under /cytology, so CI sets BASE_PATH;
// local dev leaves it empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
