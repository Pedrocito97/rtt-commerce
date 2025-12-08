"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  background?: "white" | "light" | "dark" | "gradient";
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export function Section({
  children,
  className,
  id,
  containerClassName,
  background = "white",
}: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    light: "bg-[var(--gray-50)]",
    dark: "bg-[var(--dark)] text-white",
    gradient: "gradient-blue text-white",
  };

  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 lg:py-32", backgrounds[background], className)}
    >
      <motion.div
        className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          animate: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
      variants={fadeInUp}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export { fadeInUp };
