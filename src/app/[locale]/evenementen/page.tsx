"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, X, ArrowRight } from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Entrepreneur Meet-Up London",
    date: "October 2024",
    location: "London, UK",
    attendees: 150,
    image: "/images/events/event1.jpg",
  },
  {
    id: 2,
    title: "Entrepreneur Meet-Up Paris",
    date: "September 2024",
    location: "Paris, France",
    attendees: 120,
    image: "/images/events/event2.jpg",
  },
  {
    id: 3,
    title: "Team Building Event",
    date: "August 2024",
    location: "Brussels, Belgium",
    attendees: 80,
    image: "/images/events/event3.jpg",
  },
  {
    id: 4,
    title: "Sales Training Workshop",
    date: "July 2024",
    location: "Antwerp, Belgium",
    attendees: 50,
    image: "/images/events/event4.jpg",
  },
  {
    id: 5,
    title: "Annual Conference",
    date: "June 2024",
    location: "Brussels, Belgium",
    attendees: 200,
    image: "/images/events/event5.jpg",
  },
  {
    id: 6,
    title: "Networking Dinner",
    date: "May 2024",
    location: "Ghent, Belgium",
    attendees: 60,
    image: "/images/events/event6.jpg",
  },
];

const upcomingEvents = [
  {
    id: 7,
    title: "New Year Kickoff 2025",
    date: "January 15, 2025",
    location: "Brussels, Belgium",
    description:
      "Start the new year strong with our annual kickoff event. Network with the team and learn about our exciting plans for 2025.",
  },
  {
    id: 8,
    title: "Sales Mastery Workshop",
    date: "February 10, 2025",
    location: "Antwerp, Belgium",
    description:
      "An intensive one-day workshop focused on advanced sales techniques and strategies for success.",
  },
];

export default function EventsPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof pastEvents)[0] | null>(
    null
  );
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] text-sm font-medium mb-6">
              Evenementen
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--dark)] mb-6">
              Join us at our events
            </h1>
            <p className="text-xl text-[var(--gray-600)]">
              Dynamic events across Europe. Connect, learn, and grow with the
              RTT Commerce community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <Section>
        <SectionHeader
          title="Upcoming Events"
          subtitle="Don't miss our next gathering. Reserve your spot today."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-2xl border border-[var(--gray-100)] overflow-hidden hover:shadow-xl transition-shadow"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-[var(--primary-blue-light)] flex flex-col items-center justify-center">
                    <Calendar className="w-6 h-6 text-[var(--primary-blue)]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    Upcoming
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--dark)] mb-2">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-[var(--gray-500)] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
                <p className="text-[var(--gray-600)] mb-6">{event.description}</p>
                <Link href="/contact">
                  <Button variant="primary">
                    Register Interest
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Past Events Gallery */}
      <Section background="light">
        <SectionHeader
          title="Past Events"
          subtitle="Check out highlights from our recent gatherings across Europe."
        />

        {/* Filter tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {["all", "upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as typeof filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tab
                  ? "bg-[var(--primary-blue)] text-white"
                  : "bg-white text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={{
            animate: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={fadeInUp}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(event)}
            >
              <div
                className={`relative w-full ${
                  index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                }`}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-[var(--dark)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.attendees} attendees
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

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
                <div className="flex items-center justify-center gap-4 text-white/70 mt-2">
                  <span>{selectedImage.date}</span>
                  <span>•</span>
                  <span>{selectedImage.location}</span>
                  <span>•</span>
                  <span>{selectedImage.attendees} attendees</span>
                </div>
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
            Don&apos;t miss out!
          </motion.h2>
          <motion.p
            className="text-white/80 mb-8 max-w-xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Join our team and be part of these amazing events and networking
            opportunities.
          </motion.p>
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
