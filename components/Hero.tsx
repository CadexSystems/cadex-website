"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import SectionBadge from "./SectionBadge";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section
      className="relative pt-36 pb-28 sm:pt-44 sm:pb-36 overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF",
      }}
    >
      {/* Gradient orb background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #4FE0FF 0%, #1E8FE1 30%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SectionBadge text="AI Onboarding & Automation Services" />
        </motion.div>

        {/* Headline — large Decagon-style */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
          style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
        >
          Stop Guessing.
          <br />
          Start Automating.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl max-w-xl leading-relaxed"
          style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
        >
          We help businesses unlock operational efficiency through strategic AI
          implementation, automation, and ongoing optimization &mdash; with
          measurable ROI from day one.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-start gap-4"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/services"
            className="rounded-full px-8 py-3.5 text-base font-semibold transition-colors"
            style={{
              color: theme === "dark" ? "#D1D5DB" : "#4B5563",
              border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
              backgroundColor: "transparent",
            }}
          >
            View Our Services &rarr;
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
          style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
        >
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">&#10003;</span> KPI-Driven Accountability
          </span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">&#10003;</span> Enterprise-Grade Automations
          </span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">&#10003;</span> Measurable ROI
          </span>
        </motion.div>
      </div>
    </section>
  );
}
