"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  const footerLinks = {
    company: [
      { name: navT("about"), href: "/over-ons" },
      { name: navT("jobs"), href: "/vacatures" },
      { name: navT("events"), href: "/evenementen" },
      { name: navT("blog"), href: "/blog" },
    ],
    support: [
      { name: navT("contact"), href: "/contact" },
      { name: navT("apply"), href: "/soliciteer-nu" },
      { name: t("privacy"), href: "/privacy" },
      { name: t("terms"), href: "/terms" },
    ],
  };

  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="RTT Commerce"
                width={160}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--primary-blue)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as "/"}
                    className="text-gray-300 hover:text-[var(--primary-blue)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t("support")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as "/"}
                    className="text-gray-300 hover:text-[var(--primary-blue)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--primary-blue)] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  350 Avenue Louise
                  <br />
                  1050 Brussels, Belgium
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--primary-blue)] flex-shrink-0" />
                <a
                  href="mailto:support@rtt-commerce.com"
                  className="text-gray-300 text-sm hover:text-[var(--primary-blue)] transition-colors"
                >
                  support@rtt-commerce.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--primary-blue)] flex-shrink-0" />
                <a
                  href="tel:+32492525183"
                  className="text-gray-300 text-sm hover:text-[var(--primary-blue)] transition-colors"
                >
                  +32 492 525 183
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RTT Commerce BV. {t("rights")}
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t("privacy")}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
