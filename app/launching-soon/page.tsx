"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { supabase } from "@/lib/supabase";

export default function LaunchingSoonPage() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("email_subscribers")
        .insert({ email, source: "launching-soon" });

      if (insertError) {
        // Duplicate email — treat as success
        if (insertError.code === "23505") {
          setSubmitted(true);
          return;
        }
        throw insertError;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#0B0F1A" : "#FFFFFF",
      }}
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #4FE0FF 0%, #1E8FE1 30%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #0A4FBF 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={theme === "dark" ? "/cadex-logo-light.png" : "/cadex-logo-dark.png"}
            alt="Cadex Systems"
            width={200}
            height={55}
            className="h-12 w-auto mx-auto"
            priority
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <div
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
            style={{
              backgroundColor: theme === "dark" ? "rgba(79,224,255,0.08)" : "rgba(30,143,225,0.06)",
              color: theme === "dark" ? "#9CA3AF" : "#6B7280",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}
          >
            <span className="mr-1.5" style={{ color: "#4FE0FF" }}>&#10038;</span>
            Coming soon
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
          style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
        >
          Something big
          <br />
          is coming.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl leading-relaxed"
          style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
        >
          We&apos;re building the future of AI onboarding and automation
          for businesses ready to scale. Be the first to know when we launch.
        </motion.p>

        {/* Email signup or success */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          {submitted ? (
            <div
              className="rounded-2xl p-6 mx-auto max-w-md"
              style={{
                backgroundColor: theme === "dark" ? "#1A2235" : "#F9FAFB",
                border: `1px solid ${theme === "dark" ? "#243049" : "#E5E7EB"}`,
              }}
            >
              <div className="text-3xl mb-2">&#10003;</div>
              <p
                className="font-semibold"
                style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C" }}
              >
                You&apos;re on the list.
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
              >
                We&apos;ll notify you the moment we go live.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:flex-1 rounded-full border px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#1A2235" : "#FFFFFF",
                  borderColor: theme === "dark" ? "#243049" : "#E5E7EB",
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Notify Me"}
              </button>
            </form>
          )}
          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm"
          style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
        >
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">&#10003;</span> AI Onboarding & Automation
          </span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">&#10003;</span> Custom Consulting
          </span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">&#10003;</span> Venture / MVP Studio
          </span>
        </motion.div>

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-sm"
          style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
        >
          Questions?{" "}
          <a
            href="mailto:info@cadexhq.com"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            info@cadexhq.com
          </a>
        </motion.p>

        {/* Team login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6"
        >
          <a
            href="/password?redirect=/"
            className="text-xs transition-colors hover:text-cyan-400"
            style={{ color: theme === "dark" ? "#4B5563" : "#D1D5DB" }}
          >
            Team Login
          </a>
        </motion.div>
      </div>
    </div>
  );
}
