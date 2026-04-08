"use client";

import { useTheme } from "@/components/ThemeProvider";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 transition-colors duration-300"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
            >
              About Cadex Systems
            </h1>
            <p
              className="mt-6 text-lg"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              We&apos;re an AI onboarding and automation company built on a
              simple belief: businesses shouldn&apos;t have to guess where AI
              fits. We show them, build it, deploy it, and prove
              it works.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Approach */}
      <section
        className="py-20 transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
              >
                Our Approach
              </h2>
              <div
                className="space-y-4 text-sm leading-relaxed"
                style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
              >
                <p>
                  We don&apos;t sell AI hype. We start with your operations,
                  identify the bottlenecks that cost you the most time and
                  money, and build automations that deliver measurable results.
                </p>
                <p>
                  Every engagement comes with KPI baselines, monthly tracking,
                  and executive reporting. If we can&apos;t measure it,
                  we can&apos;t improve it.
                </p>
                <p>
                  From one-time discovery sessions to full enterprise rollouts,
                  we scale with you. Our tiered service model means you never
                  pay for more than you need.
                </p>
              </div>
            </div>

            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
              >
                What Sets Us Apart
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "ROI Accountability",
                    desc: "We establish baselines and track KPIs from day one. You see the impact in hard numbers.",
                  },
                  {
                    title: "Hands-On Implementation",
                    desc: "We don\u2019t just recommend \u2014 we build, deploy, train your team, and provide ongoing support.",
                  },
                  {
                    title: "Flexible Engagement Models",
                    desc: "Five service tiers from $7,500 discovery to enterprise partnerships. Start small, scale when ready.",
                  },
                  {
                    title: "Governance & Compliance",
                    desc: "For enterprise clients, we build AI governance frameworks and policy documentation.",
                  },
                ].map((item) => (
                  <li key={item.title}>
                    <h3
                      className="text-sm font-semibold"
                      style={{
                        color: theme === "dark" ? "#4FE0FF" : "#0A3D7C",
                      }}
                    >
                      <span className="text-cyan-400 mr-2">&#10003;</span>
                      {item.title}
                    </h3>
                    <p
                      className="text-sm mt-1 ml-6"
                      style={{
                        color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                      }}
                    >
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
