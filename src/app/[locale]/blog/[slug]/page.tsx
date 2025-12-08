"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

const blogPosts: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string[];
    image: string;
    author: string;
    date: string;
    category: string;
  }
> = {
  "start-sales-career-belgium": {
    title: "How to Start Your Sales Career in Belgium",
    excerpt:
      "Discover the essential steps to kickstart your sales career and make a strong impression in the Belgian market.",
    content: [
      "Starting a career in sales can be both exciting and challenging. Belgium offers a unique market with opportunities in both B2B and B2C sectors. Here's what you need to know to get started.",
      "## Understanding the Belgian Market",
      "Belgium's multilingual environment presents unique opportunities. Being fluent in Dutch, French, or both can significantly boost your career prospects. The country's strategic location in Europe also means you'll often work with international clients.",
      "## Essential Skills for Success",
      "Communication is key in sales, but it's not just about talking. Active listening, understanding customer needs, and building genuine relationships are equally important. At RTT Commerce, we focus on developing these skills through comprehensive training programs.",
      "## Getting Your First Sales Role",
      "Many companies, including RTT Commerce, offer entry-level positions that don't require prior experience. What matters most is your attitude, willingness to learn, and ability to connect with people. Look for companies that offer structured training and mentorship programs.",
      "## Building Your Network",
      "Networking is crucial in sales. Attend industry events, join professional associations, and leverage LinkedIn to connect with other professionals. Your network can open doors to opportunities you might not find otherwise.",
      "## Continuous Learning",
      "The best sales professionals never stop learning. Stay updated on industry trends, customer behavior patterns, and new sales techniques. Consider pursuing certifications or attending workshops to enhance your skills.",
    ],
    image:
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=1200&q=80",
    author: "RTT Commerce",
    date: "December 5, 2024",
    category: "Career",
  },
  "power-networking-b2b-sales": {
    title: "The Power of Networking in B2B Sales",
    excerpt:
      "Learn how strategic networking can transform your B2B sales approach and open doors to new opportunities.",
    content: [
      "In B2B sales, your network is often your most valuable asset. The relationships you build can lead to referrals, partnerships, and long-term business opportunities.",
      "## Why Networking Matters",
      "Unlike B2C sales, B2B transactions often involve longer sales cycles and multiple decision-makers. Having established relationships can help you navigate these complexities and build trust more quickly.",
      "## Building Meaningful Connections",
      "Networking isn't just about collecting business cards. It's about creating genuine connections that provide mutual value. Focus on understanding what others need and how you can help, rather than just what you can gain.",
      "## Leveraging Digital Platforms",
      "LinkedIn has become an essential tool for B2B networking. Share valuable content, engage with others' posts, and participate in industry discussions to build your professional presence.",
      "## Following Up Effectively",
      "The real work begins after the initial connection. Follow up promptly, provide value in your communications, and maintain regular contact to keep relationships strong.",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    author: "RTT Commerce",
    date: "November 28, 2024",
    category: "Sales Tips",
  },
  "building-client-relationships": {
    title: "Building Long-term Client Relationships",
    excerpt:
      "Expert tips on nurturing client relationships that lead to sustainable business growth.",
    content: [
      "Long-term client relationships are the foundation of sustainable business success. Here's how to build and maintain them effectively.",
      "## Start with Understanding",
      "Before you can serve a client well, you need to truly understand their business, challenges, and goals. Take the time to ask questions and listen actively.",
      "## Deliver Consistent Value",
      "Reliability builds trust. Always deliver on your promises and look for ways to exceed expectations. Small gestures of extra value can make a big difference.",
      "## Communication is Key",
      "Keep clients informed about progress, challenges, and opportunities. Regular check-ins show that you care about the relationship, not just the transaction.",
      "## Handle Issues Gracefully",
      "Problems will arise. How you handle them often matters more than the problem itself. Be transparent, take responsibility, and focus on solutions.",
    ],
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    author: "RTT Commerce",
    date: "November 15, 2024",
    category: "Business",
  },
};

const relatedPosts = [
  {
    title: "Top 5 Skills Every Sales Professional Needs",
    slug: "top-5-sales-skills",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Future of Direct Sales in Europe",
    slug: "future-direct-sales-europe",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
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
              Back to Blog
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

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
              Back to Blog
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
                  Share this article
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
            Related Articles
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
                  href={`/blog/${related.slug}`}
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
                      Read more
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
            Ready to start your sales career?
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
                Solliciteer nu!
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
