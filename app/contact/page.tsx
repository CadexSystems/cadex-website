"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();
  const buttonRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const link = document.createElement("link");
    link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
    script.async = true;
    script.onload = () => {
      if (buttonRef.current && (window as any).calendar?.schedulingButton) {
        (window as any).calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0WP4JV9un7wAocLf9x62K6dakQxUKIH0_qElJwbZs-zSjuA6Wv1NmbdiwT-6rJWV2HDH2j-Hrf?gv=true",
          color: "#1574c0",
          label: "Book Discovery Call",
          target: buttonRef.current,
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const isDark = theme === "dark";

  return (
    <section
      className="pt-32 pb-20 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#0B0F1A" : "#FFFFFF" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: isDark ? "#3DCFED" : "#0D1F6E" }}
          >
            Book a Discovery Call
          </h1>
        </div>

        {/* Booking card */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{
            backgroundColor: isDark ? "#0F1623" : "#EAF4FF",
            border: `1px solid ${isDark ? "#1E2D45" : "#E5E7EB"}`,
          }}
        >
          <div className="text-4xl mb-4">📅</div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: isDark ? "#EAF4FF" : "#111827" }}
          >
            Schedule a 30-Minute Discovery Call
          </h2>
          <p
            className="text-sm mb-8 max-w-md mx-auto"
            style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
          >
            We&apos;ll review your current operations, identify your highest-value
            automation opportunities, and walk you through what working with
            Cadex looks like.
          </p>

          {/* Google Calendar button renders here */}
          <div ref={buttonRef} className="flex justify-center" />

          {/* What to expect */}
          <div
            className="mt-10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left"
            style={{ borderTop: `1px solid ${isDark ? "#1E2D45" : "#E5E7EB"}` }}
          >
            {[
              { icon: "🔍", title: "Operations Review", desc: "We map your current workflows and identify bottlenecks." },
              { icon: "🎯", title: "Top Opportunities", desc: "You'll leave with your 3 highest-impact automation opportunities." },
              { icon: "🗺️", title: "Clear Next Steps", desc: "A recommended starting point with realistic timelines and costs." },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold mb-1" style={{ color: isDark ? "#EAF4FF" : "#111827" }}>
                  {item.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct contact */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: isDark ? "#6B7280" : "#9CA3AF" }}>
            Prefer email? Reach us at{" "}
            <a href="mailto:discovery@cadexhq.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              discovery@cadexhq.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
