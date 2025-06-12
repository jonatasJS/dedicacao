import type { NextConfig } from "next";
// @ts-check
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/~offline",
  },
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: ({ url }: { url: { origin: string; pathname: string } }) => url.origin === self.location.origin && /^\/(|amor)$/.test(url.pathname),
        handler: 'CacheFirst',
        options: {
          cacheName: 'html-pages-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|woff2|woff|ttf|eot|svg)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-assets-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 1 month
          },
        },
      },
    ],
  },
})(nextConfig as any);

export default pwaConfig;
