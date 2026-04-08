"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import type { ServiceTier } from "@/lib/constants";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0WP4JV9un7wAocLf9x62K6dakQxUKIH0_qElJwbZs-zSjuA6Wv1NmbdiwT-6rJWV2HDH2j-Hrf?gv=true";

interface ServiceCardProps {
  tier: ServiceTier;
  compact?: boolean;
}

const TIER_ACCENTS: Record<string, { border: string; label: string }> = {
  gray: { border: "#6B7280", label: "#9CA3AF" },
  blue: { border: "#1E8FE1", label: "#60A5FA" },
  cyan: { border: "#4FE0FF", label: "#4FE0FF" },
  purple: { border: "#A855F7", label: "#C084FC" },
  amber: { border: "#F59E0B", label: "#FBBF24" },
};

export default function ServiceCard({ tier, compact = false }: ServiceCardProps) {
  const { theme } = useTheme();
  const accent = TIER_ACCENTS[tier.color] || TIER_ACCENTS.gray;
  const buttonRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (compact || initialized.current || !buttonRef.current) return;
    initialized.current = true;

    // Load CSS once across all cards
    if (!document.querySelector('link[href*="scheduling-button-script.css"]')) {
      const link = document.createElement("link");
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const initButton = () => {
      if (buttonRef.current && (window as any).calendar?.schedulingButton) {
        (window as any).calendar.schedulingButton.load({
          url: CALENDAR_URL,
          color: "#1574c0",
          label: "Book a Discovery Call",
          target: buttonRef.current,
        });
      }
    };

    if ((window as any).calendar?.schedulingButton) {
      // Script already loaded (e.g. contact page loaded it, or another card loaded it first)
      initButton();
    } else {
      const existingScript = document.querySelector('script[src*="scheduling-button-script.js"]');
      if (!existingScript) {
        // First card to load — inject the script
        const script = document.createElement("script");
        script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
        script.async = true;
        script.onload = initButton;
        document.head.appendChild(script);
      } else {
        // Script tag exists but hasn't finished loading yet — poll until ready
        const interval = setInterval(() => {
          if ((window as any).calendar?.schedulingButton) {
            clearInterval(interval);
            initButton();
          }
        }, 100);
        setTimeout(() => clearInterval(interval), 10000);
      }
    }
  }, [compact]);

  return (
    <div
      className="relative rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
      style={{
        backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4FE0FF",
      }}
    >
      {/* Tier label */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: accent.label }}
        >
          {tier.name}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold"
        style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
      >
        {tier.title}
      </h3>

      {/* Description */}
      <p
        className="mt-2 text-sm"
        style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
      >
        {tier.description}
      </p>

      {/* Pricing */}
      <div className="mt-4 space-y-1">
        <div className="flex items-baseline gap-1">
          <span
            className="text-2xl font-bold"
            style={{ color: accent.label }}
          >
            {tier.setupFee}
          </span>
          {tier.monthlyRetainer === null && tier.id !== "enterprise" && (
            <span
              className="text-xs"
              style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
            >
              one-time
            </span>
          )}
        </div>
        {tier.monthlyRetainer && (
          <p
            className="text-sm"
            style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
          >
            + {tier.monthlyRetainer} retainer
          </p>
        )}
        <p
          className="text-xs"
          style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
        >
          {tier.commitment}
        </p>
      </div>

      {/* Details (full mode) */}
      {!compact && (
        <div className="mt-6 space-y-4 flex-1">
          {tier.setupIncludes.length > 0 && (
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
              >
                {tier.id === "enterprise" ? "Engagement Types" : "Setup Includes"}
              </h4>
              <ul className="space-y-1.5">
                {tier.setupIncludes.map((item) => (
                  <li
                    key={item}
                    className="text-sm flex items-start gap-2"
                    style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
                  >
                    <span style={{ color: accent.label }} className="mt-0.5">
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tier.monthlyIncludes.length > 0 && (
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
              >
                Monthly Includes
              </h4>
              <ul className="space-y-1.5">
                {tier.monthlyIncludes.map((item) => (
                  <li
                    key={item}
                    className="text-sm flex items-start gap-2"
                    style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
                  >
                    <span style={{ color: accent.label }} className="mt-0.5">
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Google Calendar CTA button */}
      {!compact && (
        <div
          className="mt-6 pt-6 flex justify-center"
          style={{ borderTop: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}` }}
        >
          <div ref={buttonRef} />
        </div>
      )}
    </div>
  );
}
