"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

const navigation = [
  { key: "home", href: "/" },
  { key: "about", href: "/over-ons" },
  { key: "jobs", href: "/vacatures" },
  { key: "events", href: "/evenementen" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

const languages = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (langCode: "nl" | "en" | "fr") => {
    router.replace(pathname, { locale: langCode });
    setLangOpen(false);
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-[var(--dark)]/80 backdrop-blur-sm py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-14 w-52"
            >
              {/* Logo for dark background (white version) */}
              <Image
                src="/images/logo.png"
                alt="RTT Commerce"
                fill
                sizes="208px"
                className={cn(
                  "object-contain object-left transition-opacity duration-300 [filter:brightness(0)_invert(1)]",
                  scrolled ? "opacity-0" : "opacity-100"
                )}
                priority
              />
              {/* Logo for light background (original) */}
              <Image
                src="/images/logo.png"
                alt="RTT Commerce"
                fill
                sizes="208px"
                className={cn(
                  "object-contain object-left transition-opacity duration-300",
                  scrolled ? "opacity-100" : "opacity-0"
                )}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href as "/"}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors group",
                  scrolled
                    ? "text-[var(--charcoal)] hover:text-[var(--primary-blue)]"
                    : "text-white/90 hover:text-white"
                )}
              >
                {t(item.key)}
                <span className={cn(
                  "absolute bottom-0 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
                  scrolled ? "bg-[var(--primary-blue)]" : "bg-white"
                )} />
              </Link>
            ))}
          </div>

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  scrolled
                    ? "text-[var(--charcoal)] hover:text-[var(--primary-blue)] hover:bg-[var(--gray-50)]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    langOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[var(--gray-100)] overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-[var(--primary-blue-light)] transition-colors",
                          currentLang.code === lang.code &&
                            "bg-[var(--primary-blue-light)] text-[var(--primary-blue)]"
                        )}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/soliciteer-nu">
              <Button variant="primary" size="md">
                {t("apply")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled
                ? "text-[var(--charcoal)] hover:text-[var(--primary-blue)]"
                : "text-white hover:text-white/80"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href as "/"}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        scrolled
                          ? "text-[var(--charcoal)] hover:text-[var(--primary-blue)] hover:bg-[var(--primary-blue-light)]"
                          : "text-white hover:bg-white/10"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Language Selector */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.05 }}
                  className="px-4 py-3"
                >
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          switchLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-lg text-center transition-colors",
                          currentLang.code === lang.code
                            ? "bg-[var(--primary-blue)] text-white"
                            : scrolled
                            ? "bg-[var(--gray-100)] text-[var(--charcoal)]"
                            : "bg-white/10 text-white"
                        )}
                      >
                        {lang.flag}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navigation.length + 1) * 0.05 }}
                  className="pt-4 px-4"
                >
                  <Link href="/soliciteer-nu" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      {t("apply")}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
