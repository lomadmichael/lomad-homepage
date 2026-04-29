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
        // /impact가 이제 정식 URL — /partners-outcomes는 과거 잠시 사용된 경로라 SEO 보호용 308
        source: "/partners-outcomes",
        destination: "/impact",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
