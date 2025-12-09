"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Section, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const blogPostData: Record<string, { image: string; category: string }> = {
  "waarom-direct-sales-carriere": {
    image: "/images/team-conference.webp",
    category: "Career",
  },
  "groeipad-rtt-commerce": {
    image: "/images/conference-room.jpg",
    category: "Career",
  },
  "klantrelaties-bouwen": {
    image: "/images/events/event5.jpg",
    category: "Business",
  },
  "sales-tips-young-professionals-2024": {
    image: "/images/hero-bg.jpg",
    category: "Sales Tips",
  },
  "werken-als-brand-ambassador": {
    image: "/images/about-image.jpg",
    category: "Lifestyle",
  },
};

const relatedPostSlugs = [
  {
    slug: "groeipad-rtt-commerce",
    image: "/images/conference-room.jpg",
  },
  {
    slug: "sales-tips-young-professionals-2024",
    image: "/images/hero-bg.jpg",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations("blog");
  const navT = useTranslations("nav");

  const postData = blogPostData[slug];

  if (!postData) {
    return (
      <Section className="pt-40">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--dark)] mb-4">
            Article Not Found
          </h1>
          <p className="text-[var(--gray-600)] mb-8">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToBlog")}
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

  const post = {
    title: t(`posts.${slug}.title`),
    excerpt: t(`posts.${slug}.excerpt`),
    date: t(`posts.${slug}.date`),
    content: t.raw(`posts.${slug}.content`) as string[],
    image: postData.image,
    category: postData.category,
    author: "RTT Commerce Team",
  };

  const relatedPosts = relatedPostSlugs.map((rp) => ({
    ...rp,
    title: t(`posts.${rp.slug}.title`),
  }));

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] mt-20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-[var(--dark)]/40 to-transparent" />
      </section>

      {/* Content */}
      <Section className="-mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.article
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-[var(--primary-blue)] font-medium mb-6 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToBlog")}
            </Link>

            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-blue-light)] text-[var(--primary-blue)] text-sm font-medium mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--dark)] mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--gray-500)] mb-8 pb-8 border-b border-[var(--gray-100)]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-[var(--dark)] mt-8 mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-[var(--gray-600)] leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-[var(--gray-100)]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="flex items-center gap-2 text-[var(--gray-600)]">
                  <Share2 className="w-5 h-5" />
                  {t("shareArticle")}
                </span>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full bg-[var(--gray-100)] flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--primary-blue)] hover:text-white transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </Section>

      {/* Related Posts */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--dark)] mb-8">
            {t("relatedArticles")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((related, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Link
                  href={`/blog/${related.slug}` as "/"}
                  className="group flex items-center gap-4 bg-white rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--dark)] group-hover:text-[var(--primary-blue)] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <span className="text-sm text-[var(--primary-blue)] flex items-center mt-2">
                      {t("readMore")}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
            {t("readyToStart")}
          </motion.h2>
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
