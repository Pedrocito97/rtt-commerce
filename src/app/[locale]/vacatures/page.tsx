"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const jobs = [
  {
    id: 1,
    title: "Sales Advisor",
    location: "350 Avenue Louise, 1050 Brussels",
    type: "Full-time",
    department: "Sales",
    description:
      "Join our dynamic sales team as a Sales Advisor. You will be responsible for building relationships with clients and helping them find the right solutions for their needs.",
    requirements: [
      "Strong communication skills in Dutch and English",
      "Customer-focused mindset",
      "Ability to work in a fast-paced environment",
      "Previous sales experience is a plus but not required",
    ],
    benefits: [
      "Comprehensive training program",
      "Career growth opportunities",
      "Dynamic and young team",
      "Flexible working arrangements",
    ],
  },
  {
    id: 2,
    title: "Sales Representative",
    location: "350 Avenue Louise, 1050 Brussels",
    type: "Full-time",
    department: "Sales",
    description:
      "As a Sales Representative, you will be at the forefront of our B2B campaigns, helping businesses grow through our scalable marketing solutions.",
    requirements: [
      "Excellent interpersonal skills",
      "Goal-oriented attitude",
      "Fluent in Dutch, French is a plus",
      "Driver's license preferred",
    ],
    benefits: [
      "Performance-based bonuses",
      "Training and development",
      "Team building events",
      "Growth into leadership roles",
    ],
  },
  {
    id: 3,
    title: "Sales & Marketing",
    location: "350 Avenue Louise, 1050 Brussels",
    type: "Full-time",
    department: "Marketing",
    description:
      "Combine your passion for sales and marketing in this hybrid role. Help develop and execute campaigns that drive results for our clients.",
    requirements: [
      "Creative mindset with analytical skills",
      "Understanding of digital marketing",
      "Strong presentation abilities",
      "Team player with independent work capability",
    ],
    benefits: [
      "Hands-on marketing experience",
      "Access to industry events",
      "Mentorship program",
      "Franchise opportunities",
    ],
  },
];

export default function VacaturesPage() {
  const t = useTranslations("jobs");
  const navT = useTranslations("nav");
  const ctaT = useTranslations("cta");

  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "All" || job.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
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
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <Section>
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="text"
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--gray-200)] focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border border-[var(--gray-200)] focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all appearance-none bg-white"
            >
              <option value="All">{t("allDepartments")}</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[var(--gray-100)] overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() =>
                  setExpandedJob(expandedJob === job.id ? null : job.id)
                }
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--dark)] mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--gray-500)]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="/soliciteer-nu">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("applyNow")}
                      </Button>
                    </Link>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--gray-400)] transition-transform ${
                        expandedJob === job.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-[var(--gray-100)]">
                      <p className="text-[var(--gray-600)] mb-6">
                        {job.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[var(--dark)] mb-3">
                            {t("requirements")}
                          </h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-[var(--gray-600)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-blue)] mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--dark)] mb-3">
                            {t("benefits")}
                          </h4>
                          <ul className="space-y-2">
                            {job.benefits.map((benefit, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-[var(--gray-600)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--gray-500)]">
              {t("noResults")}
            </p>
          </div>
        )}
      </Section>

      {/* Additional Opportunities */}
      <Section background="light">
        <SectionHeader
          title={t("moreOpportunities")}
          subtitle={t("moreSubtitle")}
        />
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-sm"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-[var(--dark)] mb-4">
              {t("internships")}
            </h3>
            <p className="text-[var(--gray-600)] mb-6">
              {t("internshipsDesc")}
            </p>
            <Link href="/contact">
              <Button variant="outline">
                {t("learnMore")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-sm"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-[var(--dark)] mb-4">
              {t("businessDev")}
            </h3>
            <p className="text-[var(--gray-600)] mb-6">
              {t("businessDevDesc")}
            </p>
            <Link href="/contact">
              <Button variant="outline">
                {t("learnMore")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
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
            {t("readyToApply")}
          </motion.h2>
          <motion.p
            className="text-white/80 mb-8 max-w-xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t("readySubtitle")}
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
