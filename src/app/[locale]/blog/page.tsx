"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 Redenen Waarom Direct Sales Jouw Carrière Kan Lanceren",
    excerpt:
      "Ontdek waarom steeds meer young professionals kiezen voor een carrière in direct sales. Van flexibiliteit tot onbeperkt verdienpotentieel - dit zijn de voordelen die jij moet kennen.",
    image: "/images/team-conference.webp",
    author: "RTT Commerce Team",
    date: "9 December 2024",
    slug: "waarom-direct-sales-carriere",
    category: "Career",
  },
  {
    id: 2,
    title: "De Kunst van B2B Netwerken in België",
    excerpt:
      "Effectief netwerken in de Belgische zakelijke wereld vereist een unieke aanpak. Leer de geheimen van succesvolle B2B-relaties in Vlaanderen en Wallonië.",
    image: "/images/events/rooftop-event.jpg",
    author: "RTT Commerce Team",
    date: "2 December 2024",
    slug: "kunst-b2b-netwerken-belgie",
    category: "Sales Tips",
  },
  {
    id: 3,
    title: "Van Starter tot Team Leader: Jouw Groeipad bij RTT Commerce",
    excerpt:
      "Benieuwd naar de doorgroeimogelijkheden in sales? Ontdek hoe onze Brand Ambassadors uitgroeien tot succesvolle Team Leaders met begeleiding en training.",
    image: "/images/conference-room.jpg",
    author: "RTT Commerce Team",
    date: "25 November 2024",
    slug: "groeipad-rtt-commerce",
    category: "Career",
  },
  {
    id: 4,
    title: "Hoe Je Klantrelaties Bouwt Die Blijven",
    excerpt:
      "Duurzame klantrelaties zijn de sleutel tot langdurig succes in sales. Leer de technieken die onze top performers gebruiken om klanten te behouden.",
    image: "/images/events/event5.jpg",
    author: "RTT Commerce Team",
    date: "18 November 2024",
    slug: "klantrelaties-bouwen",
    category: "Business",
  },
  {
    id: 5,
    title: "Sales Tips voor Young Professionals in 2024",
    excerpt:
      "De saleswereld evolueert snel. Van social selling tot personal branding - dit zijn de moderne technieken die elke jonge professional moet beheersen.",
    image: "/images/hero-bg.jpg",
    author: "RTT Commerce Team",
    date: "10 November 2024",
    slug: "sales-tips-young-professionals-2024",
    category: "Sales Tips",
  },
  {
    id: 6,
    title: "Werken als Brand Ambassador: Wat Kun Je Verwachten?",
    excerpt:
      "Een kijkje achter de schermen bij RTT Commerce. Ontdek wat een dag als Brand Ambassador inhoudt, van teamevents tot persoonlijke groei.",
    image: "/images/about-image.jpg",
    author: "RTT Commerce Team",
    date: "1 November 2024",
    slug: "werken-als-brand-ambassador",
    category: "Lifestyle",
  },
];

const categories = ["All", "Career", "Sales Tips", "Business", "Industry", "Lifestyle"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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
              Insights & Stories
            </h1>
            <p className="text-xl text-[var(--gray-600)]">
              Tips, insights, and stories from the world of sales and marketing.
              Stay updated with the latest trends.
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
              placeholder="Search articles..."
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
                key={post.id}
                variants={fadeInUp}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--gray-100)]"
              >
                <Link href={`/blog/${post.slug}`}>
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
                      <span>Read more</span>
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
              No articles found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="mt-4 text-[var(--primary-blue)] font-medium hover:underline"
            >
              Clear filters
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
              Load more articles
            </button>
          </motion.div>
        )}
      </Section>

      {/* Newsletter */}
      <Section background="light">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            title="Stay Updated"
            subtitle="Subscribe to our newsletter for the latest insights and career tips."
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
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border border-[var(--gray-200)] focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-[var(--primary-blue)] text-white font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors"
            >
              Subscribe
            </button>
          </motion.form>
          <p className="text-sm text-[var(--gray-500)] mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Section>
    </>
  );
}
