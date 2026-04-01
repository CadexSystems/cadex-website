"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ROIFramework from "@/components/ROIFramework";
import CTASection from "@/components/CTASection";
import SectionBadge from "@/components/SectionBadge";
import AnimateIn, { AnimateInStagger, AnimateInChild } from "@/components/AnimateIn";
import { SERVICE_TIERS } from "@/lib/constants";
import type { ServiceTier } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";
import { sanityClient, SERVICES_QUERY, BLOG_POSTS_QUERY } from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
}

interface SanityService {
  _id: string;
  tierLabel: string;
  title: string;
  description: string;
  setupFee: string;
  monthlyRetainer: string;
  commitment: string;
  setupIncludes: string[];
  monthlyIncludes: string[];
  engagementTypes: string[];
  accentColor: string;
  order: number;
}

function mapSanityToTier(s: SanityService): ServiceTier {
  return {
    id: s._id,
    name: s.tierLabel,
    title: s.title,
    description: s.description || "",
    setupFee: s.setupFee || "",
    monthlyRetainer: s.monthlyRetainer || null,
    commitment: s.commitment || "",
    setupIncludes: s.tierLabel === "ENTERPRISE" ? (s.engagementTypes || []) : (s.setupIncludes || []),
    monthlyIncludes: s.monthlyIncludes || [],
    color: s.accentColor || "gray",
  };
}

const TIMELINE_STEPS = [
  {
    number: 1,
    title: "Discover",
    accent: "your opportunity",
    description:
      "We audit your operations, identify the highest-impact automation opportunities, and build a clear roadmap with ROI estimates — so you invest with confidence, not guesswork.",
  },
  {
    number: 2,
    title: "Build & Deploy",
    accent: "your automations",
    description:
      "Our team implements automations, configures tools, trains your staff, and provides hands-on hypercare to ensure adoption sticks and value is realized from day one.",
  },
  {
    number: 3,
    title: "Optimize & Scale",
    accent: "your results",
    description:
      "Ongoing optimization, KPI tracking, executive reporting, and quarterly roadmap planning to keep momentum building — because the best automations get better over time.",
  },
];

export default function Home() {
  const { theme } = useTheme();
  const [tiers, setTiers] = useState<ServiceTier[]>(SERVICE_TIERS);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    sanityClient.fetch(SERVICES_QUERY).then((data: SanityService[]) => {
      if (data && data.length > 0) setTiers(data.map(mapSanityToTier));
    }).catch(() => {});

    sanityClient.fetch(BLOG_POSTS_QUERY).then((data: BlogPost[]) => {
      if (data && data.length > 0) setPosts(data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <>
      <Hero />

      {/* How We Help You Win — Vertical Timeline (Decagon-style) */}
      <section
        className="py-28 sm:py-36 transition-colors duration-300 relative overflow-hidden"
        style={{
          backgroundImage: "url(/hero-3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor:
              theme === "dark"
                ? "rgba(11, 15, 26, 0.90)"
                : "rgba(255, 255, 255, 0.90)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionBadge text="Our process" />
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h2
              className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
              style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
            >
              How we help you win.
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p
              className="mt-4 text-lg max-w-xl leading-relaxed"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              From discovery to enterprise-scale rollout, we meet you where you
              are and build the AI infrastructure your business needs.
            </p>
          </AnimateIn>

          {/* Timeline */}
          <div className="mt-20 relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-px"
              style={{
                backgroundColor: theme === "dark" ? "#243049" : "#E5E7EB",
              }}
            />

            <div className="space-y-20">
              {TIMELINE_STEPS.map((step, i) => (
                <AnimateIn key={step.number} delay={i * 0.15}>
                  <div className="relative flex items-start gap-8 sm:gap-12">
                    {/* Number circle */}
                    <div
                      className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold"
                      style={{
                        backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
                        border: `2px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
                        color: "#4FE0FF",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="pt-1 sm:pt-3">
                      <h3
                        className="text-2xl sm:text-3xl font-bold"
                        style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
                      >
                        <span className="text-cyan-400">{step.title}</span>{" "}
                        {step.accent}
                      </h3>
                      <p
                        className="mt-3 text-base sm:text-lg leading-relaxed max-w-lg"
                        style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers — Dark Panel Section (Decagon-style contrast) */}
      <section
        className="py-28 sm:py-36 transition-colors duration-300 rounded-3xl mx-4 sm:mx-8 lg:mx-12 my-4"
        style={{
          backgroundColor: theme === "dark" ? "#111827" : "#0B0F1A",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="mb-2">
              <div
                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                style={{
                  backgroundColor: "rgba(79,224,255,0.08)",
                  color: "#9CA3AF",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="mr-1.5" style={{ color: "#4FE0FF" }}>&#10038;</span>
                Service tiers
              </div>
            </div>
          </AnimateIn>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <AnimateIn delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
                Flexible engagement models
                <br />
                designed to scale.
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <Link
                href="/services"
                className="mt-6 lg:mt-0 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium text-white transition-colors"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                View all services &rarr;
              </Link>
            </AnimateIn>
          </div>

          <AnimateInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {tiers.slice(0, 3).map((tier) => (
              <AnimateInChild key={tier.id}>
                <ServiceCard tier={tier} compact />
              </AnimateInChild>
            ))}
          </AnimateInStagger>

          <AnimateInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto" staggerDelay={0.1}>
            {tiers.slice(3).map((tier) => (
              <AnimateInChild key={tier.id}>
                <ServiceCard tier={tier} compact />
              </AnimateInChild>
            ))}
          </AnimateInStagger>
        </div>
      </section>

      <ROIFramework />

      {/* Recent Articles */}
      {posts.length > 0 && (
        <section
          className="py-28 sm:py-36 transition-colors duration-300"
          style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#F9FAFB" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateIn>
              <SectionBadge text="From the blog" />
            </AnimateIn>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-6 mb-12">
              <AnimateIn delay={0.1}>
                <h2
                  className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
                  style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
                >
                  Recent articles.
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <Link
                  href="/blog"
                  className="mt-4 sm:mt-0 text-sm font-medium transition-colors hover:text-cyan-400"
                  style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
                >
                  View all posts →
                </Link>
              </AnimateIn>
            </div>

            <AnimateInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {posts.map((post) => (
                <AnimateInChild key={post._id}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group flex flex-col rounded-2xl p-6 h-full transition-all hover:-translate-y-1"
                    style={{
                      backgroundColor: theme === "dark" ? "#0F1623" : "#FFFFFF",
                      border: `1px solid ${theme === "dark" ? "#1E2D45" : "#E5E7EB"}`,
                    }}
                  >
                    {/* Category */}
                    {post.category && (
                      <span
                        className="self-start text-xs font-medium px-3 py-1 rounded-full mb-4"
                        style={{
                          backgroundColor: theme === "dark" ? "rgba(79,224,255,0.08)" : "rgba(30,143,225,0.06)",
                          color: "#4FE0FF",
                        }}
                      >
                        {post.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3
                      className="text-lg font-semibold leading-snug mb-3 group-hover:text-cyan-400 transition-colors"
                      style={{ color: theme === "dark" ? "#F9FAFB" : "#111827" }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p
                        className="text-sm leading-relaxed flex-1"
                        style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
                      >
                        {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + "…" : post.excerpt}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4"
                      style={{ borderTop: `1px solid ${theme === "dark" ? "#1E2D45" : "#F3F4F6"}` }}
                    >
                      {post.publishedAt && (
                        <span className="text-xs" style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      )}
                      <span className="text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform inline-block">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </AnimateInChild>
              ))}
            </AnimateInStagger>
          </div>
        </section>
      )}

      <CTASection
        headline="See how much you could save."
        subtext="Our free ROI calculator shows you exactly how much time and money your business is losing to manual work — in under 60 seconds."
        buttonText="Calculate Your Savings"
        buttonHref="/roi"
      />
    </>
  );
}
