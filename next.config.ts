import type { NextConfig } from "next";

// Served at pitch.alttrednexxus.com/guhantara_300826
const basePath = "/guhantara_300826";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  async redirects() {
    // Bare domain root (e.g. guhantara.vercel.app/) → the pitch page
    return [{ source: "/", destination: basePath, basePath: false, permanent: false }];
  },
};

export default nextConfig;
