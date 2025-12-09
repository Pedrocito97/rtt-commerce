"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const postSlugs = [
  {
    slug: "waarom-direct-sales-carriere",
    image: "/images/team-conference.webp",
  },
  {
    slug: "werken-als-brand-ambassador",
    image: "/images/about-image.jpg",
  },
  {
    slug: "groeipad-rtt-commerce",
    image: "/images/conference-room.jpg",
  },
];

export function BlogPreview() {
  const t = useTranslations("blog");

  const posts = postSlugs.map((post) => ({
    ...post,
    title: t(`posts.${post.slug}.title`),
    excerpt: t(`posts.${post.slug}.excerpt`),
    date: t(`posts.${post.slug}.date`),
    author: "RTT Commerce Team",
  }));

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
            key={post.slug}
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
