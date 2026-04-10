"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import AnimateIn from "./AnimateIn";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  headline = "Ready to unlock your AI potential?",
  subtext = "Book a discovery call and let\u2019s explore how AI automation can transform your operations.",
  buttonText = "Book a Discovery Call",
  buttonHref = "/contact",
}: CTASectionProps) {
  const { theme } = useTheme();

  return (
    <section
      className="py-28 sm:py-36 transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "#EAF4FF",
      }}
    >
      {/* Subtle gradient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #3DCFED 0%, #1A3CC8 40%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimateIn>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: theme === "dark" ? "#3DCFED" : "#0D1F6E" }}
          >
            {headline}
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p
            className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
          >
            {subtext}
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <Link
            href={buttonHref}
            className="mt-10 inline-block rounded-full px-10 py-4 text-base font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
          >
            {buttonText}
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
