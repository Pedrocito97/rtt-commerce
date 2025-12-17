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

// Job Posting Schema for Google Jobs
export interface JobPostingData {
  id: string;
  title: string;
  description: string;
  department: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "INTERN";
  datePosted?: string;
  validThrough?: string;
}

function createJobPostingSchema(job: JobPostingData, locale: string) {
  // Set valid through to 3 months from now if not provided
  const validThrough = job.validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const datePosted = job.datePosted || new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "RTT Commerce",
      value: `rtt-${job.id}`,
    },
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "RTT Commerce BV",
      sameAs: "https://www.rtt-commerce.com",
      logo: "https://www.rtt-commerce.com/icon.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "350 Avenue Louise",
        addressLocality: "Brussels",
        postalCode: "1050",
        addressRegion: "Brussels Capital",
        addressCountry: "BE",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: 1800,
        maxValue: 3500,
        unitText: "MONTH",
      },
    },
    jobBenefits: "Training included, Career growth, Team events, Flexible schedule, Commission bonuses",
    industry: "Sales & Marketing",
    occupationalCategory: "41-3099.00",
    qualifications: "No experience required. Strong communication skills. 18-30 years old.",
    responsibilities: job.description,
    skills: "Communication, Sales, Customer Service, Teamwork",
    workHours: "Full-time, Monday to Friday",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Belgium",
    },
    jobLocationType: "TELECOMMUTE",
    directApply: true,
    applicationContact: {
      "@type": "ContactPoint",
      email: "support@rtt-commerce.com",
      url: `https://www.rtt-commerce.com/${locale}/soliciteer-nu`,
    },
  };
}

interface JobPostingsJsonLdProps {
  jobs: JobPostingData[];
  locale: string;
}

export function JobPostingsJsonLd({ jobs, locale }: JobPostingsJsonLdProps) {
  const schemas = jobs.map((job) => createJobPostingSchema(job, locale));

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`job-posting-${index}`}
          id={`job-posting-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
