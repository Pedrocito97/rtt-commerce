"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import {
  Handshake,
  Users2,
  Building2,
  PartyPopper,
  Briefcase,
  Store,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Services() {
  const t = useTranslations("services");

  const services = [
    {
      icon: <Handshake className="w-8 h-8" />,
      title: t("service1.title"),
      description: t("service1.description"),
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: t("service2.title"),
      description: t("service2.description"),
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: t("service3.title"),
      description: t("service3.description"),
    },
    {
      icon: <PartyPopper className="w-8 h-8" />,
      title: t("service4.title"),
      description: t("service4.description"),
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: t("service5.title"),
      description: t("service5.description"),
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: t("service6.title"),
      description: t("service6.description"),
    },
  ];

  return (
    <Section background="white">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          animate: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group relative p-8 rounded-2xl bg-white border border-[var(--gray-100)] hover:border-[var(--primary-blue)]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary-blue)]/5"
          >
            {/* Icon with animated background */}
            <motion.div
              className="relative w-16 h-16 rounded-xl bg-[var(--primary-blue-light)] flex items-center justify-center text-[var(--primary-blue)] mb-6 overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-[var(--primary-blue)]"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </span>
            </motion.div>

            <h3 className="text-xl font-semibold text-[var(--dark)] mb-3">
              {service.title}
            </h3>
            <p className="text-[var(--gray-600)] leading-relaxed">
              {service.description}
            </p>

            {/* Hover gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
