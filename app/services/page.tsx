"use client";

import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { SERVICE_TIERS } from "@/lib/constants";
import type { ServiceTier } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";
import { sanityClient, SERVICES_QUERY } from "@/lib/sanity";

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

export default function ServicesPage() {
  const { theme } = useTheme();
  const [tiers, setTiers] = useState<ServiceTier[]>(SERVICE_TIERS);

  useEffect(() => {
    sanityClient.fetch(SERVICES_QUERY).then((data: SanityService[]) => {
      if (data && data.length > 0) {
        setTiers(data.map(mapSanityToTier));
      }
    }).catch(() => {
      // Fallback to hardcoded tiers
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 transition-colors duration-300"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
          >
            Offerings
          </h1>
          <p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
          >
            From a one-time discovery session to enterprise-wide transformation,
            choose the engagement that fits your needs.
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <section
        className="py-12 transition-colors duration-300"
        style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.slice(0, 3).map((tier) => (
              <ServiceCard key={tier.id} tier={tier} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
            {tiers.slice(3).map((tier) => (
              <ServiceCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not Sure Which Tier Is Right?"
        subtext="Let's talk through your goals and find the perfect fit. No commitment required."
        buttonText="Schedule a Consultation"
      />
    </>
  );
}
