import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/custom-house",
        destination: "/what-we-do",
        permanent: true, // 308 — SEO 보호를 위해 반드시 permanent
      },
      {
        source: "/impact",
        destination: "/partners-outcomes",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
