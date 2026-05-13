import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/diputacion-permanente',
        destination: '/mesa-directiva',
      },
    ];
  },
};

export default nextConfig;
