import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 상위 폴더(ClaudeCode)의 lockfile 때문에 Turbopack이 워크스페이스 루트를
  // 잘못 추론하는 문제 방지 — 이 프로젝트를 루트로 고정.
  turbopack: {
    root: path.resolve(__dirname),
  },
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
