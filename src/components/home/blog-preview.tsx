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
    title: "How to Start Your Sales Career in Belgium",
    excerpt:
      "Discover the essential steps to kickstart your sales career and make a strong impression in the Belgian market.",
    image:
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=800&q=80",
    author: "RTT Commerce",
    date: "December 5, 2024",
    slug: "start-sales-career-belgium",
  },
  {
    id: 2,
    title: "The Power of Networking in B2B Sales",
    excerpt:
      "Learn how strategic networking can transform your B2B sales approach and open doors to new opportunities.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    author: "RTT Commerce",
    date: "November 28, 2024",
    slug: "power-networking-b2b-sales",
  },
  {
    id: 3,
    title: "Building Long-term Client Relationships",
    excerpt:
      "Expert tips on nurturing client relationships that lead to sustainable business growth and repeat success.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    author: "RTT Commerce",
    date: "November 15, 2024",
    slug: "building-client-relationships",
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
