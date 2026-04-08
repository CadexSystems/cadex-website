"use client";

import { useTheme } from "./ThemeProvider";
import SectionBadge from "./SectionBadge";
import AnimateIn, { AnimateInStagger, AnimateInChild } from "./AnimateIn";

const SECTIONS = [
  {
    icon: "🛡️",
    title: "Revenue Protection & Retention",
    items: [
      "Reduction in missed leads and follow-up failures",
      "Decrease in manual errors that cause client churn",
      "Improved response time to inbound inquiries",
    ],
  },
  {
    icon: "🚀",
    title: "Revenue Growth",
    items: [
      "Faster sales cycle and proposal turnaround",
      "Increase in qualified leads processed per week",
      "New service lines enabled by automation",
    ],
  },
  {
    icon: "⏱️",
    title: "Time & Capacity Recovered",
    items: [
      "Staff hours recaptured from manual and repetitive tasks",
      "Reduction in overtime and contractor dependency",
      "Increased team capacity without adding headcount",
    ],
  },
  {
    icon: "🎯",
    title: "Error Rate Reduction",
    items: [
      "Fewer data entry and processing mistakes",
      "Reduced rework and exception handling",
      "Higher output quality with less human intervention",
    ],
  },
  {
    icon: "📋",
    title: "Compliance Readiness",
    items: [
      "Automated audit trails and documentation",
      "Consistent process execution across every workflow",
      "Reduced exposure from missed deadlines or regulatory gaps",
    ],
  },
  {
    icon: "⚡",
    title: "Decision Speed",
    items: [
      "Real-time dashboards replacing manual reporting",
      "Faster access to the data that drives action",
      "Shorter cycles from insight to execution",
    ],
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <SectionBadge text="See what's possible" />
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h2
            className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
          >
            Instant impact on the metrics
            <br />
            that matter.
          </h2>
        </AnimateIn>

        <AnimateInStagger className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {SECTIONS.map((section) => (
            <AnimateInChild key={section.title}>
              <div
                className="rounded-2xl p-8 transition-colors duration-300 h-full"
                style={{
                  backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
                  border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
                }}
              >
                <div className="text-3xl mb-4">{section.icon}</div>
                <h3
                  className="text-lg font-bold mb-5"
                  style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
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
