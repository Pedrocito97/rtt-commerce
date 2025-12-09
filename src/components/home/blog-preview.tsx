"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const posts = [
  {
    id: 1,
    title: "5 Redenen Waarom Direct Sales Jouw Carrière Kan Lanceren",
    excerpt:
      "Ontdek waarom steeds meer young professionals kiezen voor een carrière in direct sales. Van flexibiliteit tot onbeperkt verdienpotentieel.",
    image: "/images/team-conference.webp",
    author: "RTT Commerce Team",
    date: "9 December 2024",
    slug: "waarom-direct-sales-carriere",
  },
  {
    id: 2,
    title: "Werken als Brand Ambassador: Wat Kun Je Verwachten?",
    excerpt:
      "Een kijkje achter de schermen bij RTT Commerce. Ontdek wat een dag als Brand Ambassador inhoudt, van teamevents tot persoonlijke groei.",
    image: "/images/about-image.jpg",
    author: "RTT Commerce Team",
    date: "1 November 2024",
    slug: "werken-als-brand-ambassador",
  },
  {
    id: 3,
    title: "Van Starter tot Team Leader: Jouw Groeipad bij RTT Commerce",
    excerpt:
      "Benieuwd naar de doorgroeimogelijkheden in sales? Ontdek hoe onze Brand Ambassadors uitgroeien tot succesvolle Team Leaders.",
    image: "/images/conference-room.jpg",
    author: "RTT Commerce Team",
    date: "25 November 2024",
    slug: "groeipad-rtt-commerce",
  },
];

export function BlogPreview() {
  const t = useTranslations("blog");

  return (
    <Section background="light">
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
        {posts.map((post) => (
          <motion.article
            key={post.id}
            variants={fadeInUp}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                <h3 className="text-xl font-semibold text-[var(--dark)] mb-3 group-hover:text-[var(--primary-blue)] transition-colors line-clamp-2">
                  {post.title}
                </h3>

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

      {/* View all button */}
      <motion.div
        variants={fadeInUp}
        className="text-center mt-12"
      >
        <Link href="/blog">
          <Button variant="outline" size="lg">
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </Section>
  );
}
