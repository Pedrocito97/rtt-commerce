"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isInView ? value : 0}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

export function AboutPreview() {
  const t = useTranslations("about");

  const stats = [
    { value: 2017, label: t("founded") },
    { value: 100, suffix: "+", label: t("teamMembers") },
    { value: 50, suffix: "+", label: t("clients") },
  ];

  return (
    <Section background="light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-image.jpg"
              alt="RTT Commerce Team"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl bg-[var(--primary-blue)]/10 -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl bg-[var(--primary-blue)]/5 -z-10" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-blue-light)] text-[var(--primary-blue)] text-sm font-medium mb-4">
            {t("badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dark)] mb-6">
            {t("title")}
          </h2>
          <p className="text-[var(--gray-600)] text-lg leading-relaxed mb-6">
            {t("description1")}
          </p>
          <p className="text-[var(--gray-600)] leading-relaxed mb-8">
            {t("description2")}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-[var(--primary-blue)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[var(--gray-500)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Link href="/over-ons">
            <Button variant="primary" size="md">
              {t("cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
