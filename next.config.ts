import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Old French URLs
      {
        source: "/a-propos-de-nous",
        destination: "/fr/over-ons",
        permanent: true,
      },
      {
        source: "/fr/a-propos-de-nous",
        destination: "/fr/over-ons",
        permanent: true,
      },
      // Old Dutch URLs
      {
        source: "/over-ons",
        destination: "/nl/over-ons",
        permanent: true,
      },
      // Old vacatures URLs
      {
        source: "/vacatures",
        destination: "/nl/vacatures",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
