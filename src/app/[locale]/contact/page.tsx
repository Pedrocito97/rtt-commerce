"use client";

import { motion } from "framer-motion";
import { Section, fadeInUp } from "@/components/ui/section";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useTranslations } from "next-intl";

const socialLinks = [
  { name: "Facebook", icon: <Facebook className="w-6 h-6" />, href: "https://www.facebook.com/RTTANTWERP" },
  { name: "Instagram", icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/rtt_commerce/" },
  { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/company/rtt-commerce-bv/posts/?feedView=all" },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t("address"),
      content: ["350 Avenue Louise", "1050 Brussels, Belgium"],
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t("email"),
      content: ["support@rtt-commerce.com"],
      link: "mailto:support@rtt-commerce.com",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: t("phone"),
      content: ["+32 492 525 183"],
      link: "tel:+32492525183",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t("openingHours"),
      content: [t("openingHoursWeekdays"), t("openingHoursWeekend")],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
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

      {/* Contact Info Cards */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--gray-100)] text-center hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary-blue-light)] flex items-center justify-center text-[var(--primary-blue)] mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-[var(--dark)] mb-3">
                {item.title}
              </h3>
              {item.content.map((line, i) =>
                item.link ? (
                  <a
                    key={i}
                    href={item.link}
                    className="block text-[var(--gray-600)] hover:text-[var(--primary-blue)] transition-colors text-lg"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={i} className="text-[var(--gray-600)]">
                    {line}
                  </p>
                )
              )}
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-xl text-[var(--dark)] mb-6">
            {t("followUs")}
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-white shadow-md border border-[var(--gray-100)] flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--primary-blue)] hover:text-white hover:border-[var(--primary-blue)] transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Map Section */}
      <Section background="light" className="py-0">
        <div className="rounded-2xl overflow-hidden shadow-lg h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.6969080834347!2d4.3610!3d50.8264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c48f0f0f0f0f%3A0x0!2s350%20Avenue%20Louise%2C%201050%20Brussels!5e0!3m2!1sen!2sbe!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}
