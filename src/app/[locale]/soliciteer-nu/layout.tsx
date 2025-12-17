import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.apply" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://www.rtt-commerce.com/${locale}/soliciteer-nu`,
      siteName: "RTT Commerce",
      locale: locale === "nl" ? "nl_BE" : locale === "fr" ? "fr_BE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `https://www.rtt-commerce.com/${locale}/soliciteer-nu`,
      languages: {
        nl: "https://www.rtt-commerce.com/nl/soliciteer-nu",
        fr: "https://www.rtt-commerce.com/fr/soliciteer-nu",
        en: "https://www.rtt-commerce.com/en/soliciteer-nu",
      },
    },
  };
}

export default function ApplyLayout({ children }: Props) {
  return children;
}
