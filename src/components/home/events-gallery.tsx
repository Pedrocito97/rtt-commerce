"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";

const events = [
  {
    id: 1,
    title: "Rooftop Networking Event",
    image: "/images/events/rooftop-event.jpg",
    location: "Brussels",
  },
  {
    id: 2,
    title: "Annual Conference",
    image: "/images/conference-room.jpg",
    location: "Istanbul",
  },
  {
    id: 3,
    title: "Team Conference",
    image: "/images/team-conference.webp",
    location: "Europe",
  },
  {
    id: 4,
    title: "Entrepreneur Meet-Up",
    image: "/images/events/event5.jpg",
    location: "Brussels",
  },
  {
    id: 5,
    title: "Networking Event",
    image: "/images/events/event6.jpg",
    location: "Belgium",
  },
];

export function EventsGallery() {
  const t = useTranslations("events");
  const [selectedImage, setSelectedImage] = useState<(typeof events)[0] | null>(
    null
  );

  return (
    <Section background="white">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Masonry Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={{
          animate: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            variants={fadeInUp}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
              index === 0 || index === 5 ? "md:row-span-2" : ""
            }`}
            onClick={() => setSelectedImage(event)}
          >
            <div
              className={`relative w-full ${
                index === 0 || index === 5
                  ? "aspect-[3/4] md:aspect-auto md:h-full"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-lg">
                  {event.title}
                </h3>
                <p className="text-white/70 text-sm">{event.location}</p>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-semibold">
                  {selectedImage.title}
                </h3>
                <p className="text-white/70">{selectedImage.location}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--dark)] hover:bg-[var(--gray-100)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
