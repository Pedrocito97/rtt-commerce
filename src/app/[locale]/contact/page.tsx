"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Section, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  CheckCircle,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/RTTANTWERP" },
  { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/rtt_commerce/" },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/rtt-commerce-bv/posts/?feedView=all" },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("address"),
      content: ["350 Avenue Louise", "1050 Brussels, Belgium"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t("email"),
      content: ["support@rtt-commerce.com"],
      link: "mailto:support@rtt-commerce.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t("phone"),
      content: ["+32 492 525 183"],
      link: "tel:+32492525183",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("openingHours"),
      content: [t("openingHoursWeekdays"), t("openingHoursWeekend")],
    },
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
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

      {/* Contact Content */}
      <Section>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--gray-100)]">
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-6">
                {t("formTitle")}
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--dark)] mb-2">
                    {t("success")}
                  </h3>
                  <p className="text-[var(--gray-600)]">
                    {t("successMessage")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                        {t("name")} *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name
                            ? "border-red-500"
                            : "border-[var(--gray-200)]"
                        } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                        placeholder={t("namePlaceholder")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                        {t("phone")}
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all"
                        placeholder={t("phonePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      {t("email")} *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-red-500"
                          : "border-[var(--gray-200)]"
                      } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                      placeholder={t("emailPlaceholder")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      {t("subject")} *
                    </label>
                    <input
                      {...register("subject")}
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.subject
                          ? "border-red-500"
                          : "border-[var(--gray-200)]"
                      } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                      placeholder={t("subjectPlaceholder")}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      {t("message")} *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message
                          ? "border-red-500"
                          : "border-[var(--gray-200)]"
                      } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all resize-none`}
                      placeholder={t("messagePlaceholder")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        {t("sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {t("send")}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--gray-100)]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary-blue-light)] flex items-center justify-center text-[var(--primary-blue)] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--dark)] mb-1">
                        {item.title}
                      </h3>
                      {item.content.map((line, i) =>
                        item.link ? (
                          <a
                            key={i}
                            href={item.link}
                            className="block text-[var(--gray-600)] hover:text-[var(--primary-blue)] transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={i} className="text-[var(--gray-600)]">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--gray-100)]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-[var(--dark)] mb-4">
                  {t("followUs")}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[var(--gray-100)] flex items-center justify-center text-[var(--gray-600)] hover:bg-[var(--primary-blue)] hover:text-white transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
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
