"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Heart,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const team = [
  {
    name: "Jan D. Anderson",
    role: "CEO",
    image: "/images/team/team01.jpg",
  },
  {
    name: "Jennefer Tange",
    role: "Operations Director",
    image: "/images/team/team05.jpg",
  },
  {
    name: "Leopold Wolterink",
    role: "Sales Director",
    image: "/images/team/team06.jpg",
  },
  {
    name: "Janelle Arensman",
    role: "HR Manager",
    image: "/images/team/team01.jpg",
  },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const navT = useTranslations("nav");
  const ctaT = useTranslations("cta");

  const timeline = [
    {
      year: "2017",
      title: t("timeline.2017.title"),
      description: t("timeline.2017.description"),
    },
    {
      year: "2020",
      title: t("timeline.2020.title"),
      description: t("timeline.2020.description"),
    },
    {
      year: t("timeline.now.year"),
      title: t("timeline.now.title"),
      description: t("timeline.now.description"),
    },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: t("mission.title"),
      description: t("mission.description"),
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: t("vision.title"),
      description: t("vision.description"),
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t("valuesSection.title"),
      description: t("valuesSection.description"),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[var(--primary-blue)]/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] text-sm font-medium mb-6">
              {t("badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--dark)] mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-[var(--gray-600)]">
              {t("description1")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-10 z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: <Calendar className="w-6 h-6" />, value: "2017", label: t("founded") },
            { icon: <Users className="w-6 h-6" />, value: "100+", label: t("teamMembers") },
            { icon: <MapPin className="w-6 h-6" />, value: "BE", label: t("nationwide") },
            { icon: <Award className="w-6 h-6" />, value: "50+", label: t("clients") },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--primary-blue-light)] text-[var(--primary-blue)] mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[var(--dark)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--gray-500)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Mission, Vision, Values */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-white border border-[var(--gray-100)] hover:shadow-xl transition-all duration-300"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary-blue-light)] text-[var(--primary-blue)] mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--dark)] mb-4">
                {item.title}
              </h3>
              <p className="text-[var(--gray-600)]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section background="light">
        <SectionHeader
          title={t("journeyTitle")}
          subtitle={t("journeySubtitle")}
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--primary-blue)]/20 transform md:-translate-x-1/2" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[var(--primary-blue)] border-4 border-white shadow-lg transform -translate-x-1/2" />

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-blue)] text-white text-sm font-medium mb-2">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold text-[var(--dark)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--gray-600)]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <SectionHeader
          title={t("teamTitle")}
          subtitle={t("teamSubtitle")}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group text-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-semibold text-[var(--dark)]">{member.name}</h3>
              <p className="text-sm text-[var(--gray-500)]">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="gradient">
        <div className="text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {ctaT("title")}
          </motion.h2>
          <motion.p
            className="text-white/80 mb-8 max-w-xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {ctaT("subtitle")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href="/soliciteer-nu">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[var(--primary-blue)] hover:bg-white/90"
              >
                {navT("apply")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
