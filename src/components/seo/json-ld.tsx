import Script from "next/script";

// Organization Schema for RTT Commerce
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RTT Commerce BV",
  alternateName: "RTT Commerce",
  url: "https://www.rtt-commerce.com",
  logo: "https://www.rtt-commerce.com/icon.png",
  description:
    "RTT Commerce is a sales & marketing company based in Brussels, Belgium. We specialize in direct sales and provide career opportunities for young professionals aged 18-30.",
  foundingDate: "2017",
  address: {
    "@type": "PostalAddress",
    streetAddress: "350 Avenue Louise",
    addressLocality: "Brussels",
    postalCode: "1050",
    addressRegion: "Brussels Capital",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.8275,
    longitude: 4.3600,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "recruitment",
    availableLanguage: ["Dutch", "French", "English"],
  },
  sameAs: [
    "https://www.linkedin.com/company/rtt-commerce",
    "https://www.instagram.com/rttcommerce",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 150,
  },
  areaServed: {
    "@type": "Country",
    name: "Belgium",
  },
  knowsAbout: [
    "Direct Sales",
    "Sales Training",
    "Marketing",
    "Career Development",
    "Youth Employment",
  ],
};

// WebSite Schema for search features
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RTT Commerce",
  url: "https://www.rtt-commerce.com",
  inLanguage: ["nl", "fr", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.rtt-commerce.com/nl/vacatures?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export function OrganizationJsonLd() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
      strategy="afterInteractive"
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
      strategy="afterInteractive"
    />
  );
}

// Combined component for layout
export default function JsonLdSchemas() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
    </>
  );
}
