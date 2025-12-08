"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { useTranslations } from "next-intl";

const partners = [
  { name: "Partner 1", logo: "/images/partners/partner1.png" },
  { name: "Partner 2", logo: "/images/partners/partner2.png" },
  { name: "Partner 3", logo: "/images/partners/partner3.png" },
  { name: "Partner 4", logo: "/images/partners/partner4.png" },
  { name: "Partner 5", logo: "/images/partners/partner5.png" },
];

export function Partners() {
  const t = useTranslations("partners");

  return (
    <Section className="py-12 md:py-16" background="light">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-[var(--gray-500)] uppercase tracking-wider">
          {t("title")}
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--gray-50)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--gray-50)] to-transparent z-10" />

        {/* Infinite scroll animation */}
        <motion.div
          className="flex space-x-16 items-center"
          animate={{ x: [0, -800] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain max-h-12"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
