"use client";

import { motion } from "framer-motion";
import { Section, fadeInUp } from "@/components/ui/section";
import { Shield, Lock, Eye, Users, Clock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t("sections.dataCollection.title"),
      content: t.raw("sections.dataCollection.content") as string[],
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t("sections.dataUsage.title"),
      content: t.raw("sections.dataUsage.content") as string[],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t("sections.dataSecurity.title"),
      content: t.raw("sections.dataSecurity.content") as string[],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("sections.cookies.title"),
      content: t.raw("sections.cookies.content") as string[],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("sections.retention.title"),
      content: t.raw("sections.retention.content") as string[],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t("sections.rights.title"),
      content: t.raw("sections.rights.content") as string[],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[var(--primary-blue)]/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--dark)] mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <p className="text-sm text-[var(--gray-500)] mt-4">
              {t("lastUpdated")}: {t("lastUpdatedDate")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <motion.div
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--gray-600)] leading-relaxed">
              {t("introduction")}
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Main Content Sections */}
      <Section background="light">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--gray-100)]"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary-blue-light)] text-[var(--primary-blue)] flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--dark)]">
                    {index + 1}. {section.title}
                  </h2>
                </div>
              </div>
              <div className="pl-16 space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-[var(--gray-600)] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-[var(--dark)] mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-[var(--gray-600)] mb-6">
            {t("contact.description")}
          </p>
          <div className="bg-[var(--primary-blue-light)] rounded-2xl p-8 inline-block">
            <p className="text-[var(--dark)] font-medium">RTT Commerce BV</p>
            <p className="text-[var(--gray-600)]">350 Avenue Louise</p>
            <p className="text-[var(--gray-600)]">1050 Brussels, Belgium</p>
            <a
              href="mailto:privacy@rtt-commerce.com"
              className="text-[var(--primary-blue)] hover:underline mt-2 inline-block"
            >
              privacy@rtt-commerce.com
            </a>
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center text-[var(--primary-blue)] hover:underline font-medium"
            >
              {t("contact.link")} →
            </Link>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
