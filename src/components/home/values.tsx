"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { IconCard } from "@/components/ui/card";
import { Sparkles, GraduationCap, Rocket, Users, TrendingUp, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export function Values() {
  const t = useTranslations("values");

  const values = [
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: t("value1.title"),
      description: t("value1.description"),
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: t("value2.title"),
      description: t("value2.description"),
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: t("value3.title"),
      description: t("value3.description"),
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: t("value4.title"),
      description: t("value4.description"),
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: t("value5.title"),
      description: t("value5.description"),
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: t("value6.title"),
      description: t("value6.description"),
    },
  ];

  return (
    <Section>
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={{
          animate: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {values.map((value, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <IconCard
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
