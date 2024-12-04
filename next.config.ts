import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
        port: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'readaton.netlify.app',
        'proxy.proxy-production.svc.cluster.local:80',
        'localhost:3000'
      ]
    }
  }
};

export default nextConfig;
