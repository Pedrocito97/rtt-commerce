import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTT Commerce BV | Unlock Your Sales Potential",
  description:
    "Join our young and innovative team for constant support, dynamic events, and B2B campaigns helping you discover your potential and launch a successful sales career.",
  keywords: [
    "RTT Commerce",
    "sales career",
    "marketing",
    "Belgium",
    "Brussels",
    "job opportunities",
    "sales training",
  ],
  authors: [{ name: "RTT Commerce BV" }],
  openGraph: {
    title: "RTT Commerce BV | Unlock Your Sales Potential",
    description:
      "Join our young and innovative team for constant support, dynamic events, and B2B campaigns.",
    url: "https://rtt-commerce.com",
    siteName: "RTT Commerce BV",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
