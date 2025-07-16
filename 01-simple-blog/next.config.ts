import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freecodecamp.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "websecuritylab.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "linkedin.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.scrapingdog.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chidiadi.hashnode.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media2.dev.to",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
