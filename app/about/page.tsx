"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CTASection from "@/components/CTASection";
import { useTheme } from "@/components/ThemeProvider";
import { sanityClient, TEAM_MEMBERS_QUERY, urlFor } from "@/lib/sanity";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
}

export default function AboutPage() {
  const { theme } = useTheme();
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    sanityClient.fetch(TEAM_MEMBERS_QUERY).then((data: TeamMember[]) => {
      setTeam(data || []);
    });
  }, []);

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
              fits. We show them &mdash; then we build it, deploy it, and prove
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
                  and executive reporting &mdash; because if we can&apos;t
                  measure it, we can&apos;t improve it.
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

      {/* Team placeholder */}
      <section
        className="py-20 transition-colors duration-300"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
          >
            Our Team
          </h2>
          <p
            className="text-lg mb-12"
            style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
          >
            Meet the people behind Cadex Systems.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(team.length > 0 ? team : [
              { _id: "1", name: "Team Member", role: "Position", bio: "", photo: null },
              { _id: "2", name: "Team Member", role: "Position", bio: "", photo: null },
              { _id: "3", name: "Team Member", role: "Position", bio: "", photo: null },
            ]).map((member) => (
              <div
                key={member._id}
                className="rounded-xl p-6 transition-colors duration-300"
                style={{
                  backgroundColor: theme === "dark" ? "#1A2235" : "#F9FAFB",
                  border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
                }}
              >
                {member.photo ? (
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden relative">
                    <Image
                      src={urlFor(member.photo).width(160).height(160).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                    style={{
                      backgroundColor: theme === "dark" ? "#243049" : "#E5E7EB",
                    }}
                  />
                )}
                <h3
                  className="font-semibold"
                  style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
                >
                  {member.role}
                </p>
                {member.bio && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
                  >
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
