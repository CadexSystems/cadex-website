"use client";

import { ROI_FRAMEWORK } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";
import SectionBadge from "./SectionBadge";
import AnimateIn, { AnimateInStagger, AnimateInChild } from "./AnimateIn";

const SECTIONS = [
  {
    key: "revenueProtection" as const,
    title: "Revenue Protection",
    icon: "\uD83D\uDEE1\uFE0F",
  },
  {
    key: "revenueRetention" as const,
    title: "Revenue Retention",
    icon: "\uD83D\uDD04",
  },
  {
    key: "revenueGrowth" as const,
    title: "Revenue Growth",
    icon: "\uD83D\uDE80",
  },
];

export default function ROIFramework() {
  const { theme } = useTheme();

  return (
    <section
      className="py-28 sm:py-36 transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#0B0F1A" : "#F9FAFB",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <SectionBadge text="See what's possible" />
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
          >
            Instant ROI on the metrics
            <br />
            that matter.
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <p
            className="mt-4 text-lg max-w-xl leading-relaxed"
            style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
          >
            We don&apos;t promise revenue &mdash; we promise the operational
            improvements that make it possible.
          </p>
        </AnimateIn>

        <AnimateInStagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {SECTIONS.map((section) => (
            <AnimateInChild key={section.key}>
              <div
                className="rounded-2xl p-8 transition-colors duration-300 h-full"
                style={{
                  backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: theme === "dark" ? "#243049" : "#E5E7EB",
                }}
              >
                <div className="text-3xl mb-4">{section.icon}</div>
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {ROI_FRAMEWORK[section.key].map((item) => (
                    <li
                      key={item}
                      className="text-sm flex items-start gap-2.5 leading-relaxed"
                      style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
                    >
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInChild>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
