"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    id: 1,
    name: "Lou",
    role: "Brand Ambassador",
    image: "/images/team/lou.jpg",
    content:
      "Cette expérience me permet de me développer professionnellement et personnellement. Chaque jour est un nouveau challenge et cela me permet de me dépasser !",
    rating: 5,
  },
  {
    id: 2,
    name: "Quentin",
    role: "Brand Ambassador",
    image: "/images/team/quentin.jpg",
    content:
      "Travailler chez RTT Commerce m'a fait réaliser que j'ai un talent pour la gestion d'entreprise et le recrutement. J'ai appris à me connaître moi-même de plus en plus.",
    rating: 5,
  },
  {
    id: 3,
    name: "Yaren",
    role: "Brand Ambassador",
    image: "/images/team/yaren.jpg",
    content:
      "Bij RTT Commerce heb ik geleerd om mijn grenzen te verleggen en mezelf te ontwikkelen. De sfeer in het team is ongelooflijk en elke dag is een kans om te groeien!",
    rating: 5,
  },
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <Section background="light">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Quote decoration */}
        <div className="absolute -top-4 -left-4 text-[var(--primary-blue)]/10">
          <Quote className="w-24 h-24" />
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-[var(--primary-blue)]/20">
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-[var(--gray-700)] leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>

                  <div>
                    <div className="font-semibold text-[var(--dark)]">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-[var(--gray-500)]">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--gray-600)] hover:text-[var(--primary-blue)] hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === current
                      ? "bg-[var(--primary-blue)] w-8"
                      : "bg-[var(--gray-300)] hover:bg-[var(--gray-400)]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--gray-600)] hover:text-[var(--primary-blue)] hover:shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
