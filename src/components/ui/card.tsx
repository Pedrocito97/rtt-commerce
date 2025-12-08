"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "./section";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--gray-100)]",
        hover &&
          "transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary-blue)]/5 hover:-translate-y-1 hover:border-[var(--primary-blue)]/20",
        className
      )}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
}

export function IconCard({
  icon,
  title,
  description,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="w-14 h-14 rounded-xl bg-[var(--primary-blue-light)] flex items-center justify-center text-[var(--primary-blue)] mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-[var(--dark)]">{title}</h3>
      <p className="text-[var(--gray-600)] leading-relaxed">{description}</p>
    </Card>
  );
}
