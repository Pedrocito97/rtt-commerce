"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const blogPostSlugs = [
  {
    slug: "waarom-direct-sales-carriere",
    image: "/images/team-conference.webp",
    category: "Career",
  },
  {
    slug: "groeipad-rtt-commerce",
    image: "/images/conference-room.jpg",
    category: "Career",
  },
  {
    slug: "klantrelaties-bouwen",
    image: "/images/events/event5.jpg",
    category: "Business",
  },
  {
    slug: "sales-tips-young-professionals-2024",
    image: "/images/hero-bg.jpg",
    category: "Sales Tips",
  },
  {
    slug: "werken-als-brand-ambassador",
    image: "/images/about-image.jpg",
    category: "Lifestyle",
  },
];

const categories = ["All", "Career", "Sales Tips", "Business", "Industry", "Lifestyle"];

export default function BlogPage() {
  const t = useTranslations("blog");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const blogPosts = blogPostSlugs.map((post) => ({
    ...post,
    title: t(`posts.${post.slug}.title`),
    excerpt: t(`posts.${post.slug}.excerpt`),
    date: t(`posts.${post.slug}.date`),
    author: "RTT Commerce Team",
  }));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] text-sm font-medium mb-6">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--dark)] mb-6">
              {t("pageTitle")}
            </h1>
            <p className="text-xl text-[var(--gray-600)]">
              {t("pageSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <Section>
        <motion.div
          className="flex flex-col md:flex-row gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--gray-200)] focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[var(--primary-blue)] text-white"
                    : "bg-[var(--gray-100)] text-[var(--gray-600)] hover:bg-[var(--gray-200)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              animate: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="initial"
            animate="animate"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--gray-100)]"
              >
                <Link href={`/blog/${post.slug}` as "/"}>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-[var(--primary-blue)]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-[var(--gray-500)] mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-[var(--dark)] mb-3 group-hover:text-[var(--primary-blue)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[var(--gray-600)] line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center text-[var(--primary-blue)] font-medium">
                      <span>{t("readMore")}</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[var(--gray-500)] text-lg">
              {t("noResults")}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="mt-4 text-[var(--primary-blue)] font-medium hover:underline"
            >
              {t("clearFilters")}
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <button className="px-8 py-3 rounded-full border-2 border-[var(--gray-200)] text-[var(--gray-600)] font-medium hover:border-[var(--primary-blue)] hover:text-[var(--primary-blue)] transition-all">
              {t("loadMore")}
            </button>
          </motion.div>
        )}
      </Section>

      {/* Newsletter */}
      <Section background="light">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            title={t("stayUpdated")}
            subtitle={t("newsletterSubtitle")}
          />
          <motion.form
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="flex-1 px-6 py-4 rounded-xl border border-[var(--gray-200)] focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-[var(--primary-blue)] text-white font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors"
            >
              {t("subscribe")}
            </button>
          </motion.form>
          <p className="text-sm text-[var(--gray-500)] mt-4">
            {t("privacyNote")}
          </p>
        </div>
      </Section>
    </>
  );
}
