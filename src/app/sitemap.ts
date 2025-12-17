import { MetadataRoute } from "next";

const BASE_URL = "https://www.rtt-commerce.com";

// All locales supported
const locales = ["nl", "fr", "en"] as const;

// All static pages with their priorities and change frequencies
const pages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/vacatures", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/soliciteer-nu", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/over-ons", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/evenementen", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and page
  for (const locale of locales) {
    for (const page of pages) {
      const url = `${BASE_URL}/${locale}${page.path}`;

      // Create alternates for all languages
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        languages[altLocale] = `${BASE_URL}/${altLocale}${page.path}`;
      }
      languages["x-default"] = `${BASE_URL}/nl${page.path}`; // Dutch as default

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemapEntries;
}
