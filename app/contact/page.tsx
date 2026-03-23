"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = {
    backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
    borderColor: theme === "dark" ? "#243049" : "#E5E7EB",
    color: theme === "dark" ? "#4FE0FF" : "#0A3D7C",
  };

  const labelStyle = {
    color: theme === "dark" ? "#D1D5DB" : "#374151",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to GHL webhook
    setSubmitted(true);
  };

  return (
    <section
      className="pt-32 pb-20 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
          >
            Get In Touch
          </h1>
          <p
            className="mt-4 text-lg"
            style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
          >
            Ready to explore how AI can transform your operations? Let&apos;s
            start the conversation.
          </p>
        </div>

        {submitted ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{
              backgroundColor: theme === "dark" ? "#1A2235" : "#F9FAFB",
              border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
            }}
          >
            <div className="text-4xl mb-4">&#10003;</div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
            >
              Message Sent
            </h2>
            <p style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}>
              Thank you for reaching out. We&apos;ll be in touch within 24
              hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
              border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={labelStyle}
                >
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  style={inputStyle}
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={labelStyle}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  style={inputStyle}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                className="block text-sm font-medium mb-1.5"
                style={labelStyle}
              >
                Work Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                style={inputStyle}
                placeholder="john@company.com"
              />
            </div>

            <div className="mt-6">
              <label
                className="block text-sm font-medium mb-1.5"
                style={labelStyle}
              >
                Company
              </label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                style={inputStyle}
                placeholder="Acme Corp"
              />
            </div>

            <div className="mt-6">
              <label
                className="block text-sm font-medium mb-1.5"
                style={labelStyle}
              >
                Which service tier are you interested in?
              </label>
              <select
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                style={inputStyle}
              >
                <option value="">Not sure yet</option>
                <option value="spark">Spark — AI Discovery ($7,500)</option>
                <option value="ignite">Ignite — Premium Audit</option>
                <option value="accelerate">
                  Accelerate — Full Implementation
                </option>
                <option value="transform">
                  Transform — Enterprise Partnership
                </option>
                <option value="enterprise">Enterprise — Custom Consulting</option>
              </select>
            </div>

            <div className="mt-6">
              <label
                className="block text-sm font-medium mb-1.5"
                style={labelStyle}
              >
                Message
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
                style={inputStyle}
                placeholder="Tell us about your business and what you're looking to achieve with AI..."
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Direct contact */}
        <div className="mt-8 text-center">
          <p
            className="text-sm"
            style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
          >
            Prefer email? Reach us at{" "}
            <a
              href="mailto:info@cadexhq.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              info@cadexhq.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
