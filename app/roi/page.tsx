"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import SectionBadge from "@/components/SectionBadge";

/* ── Question data ─────────────────────────────────────────────── */

const DEPARTMENTS = [
  "Sales & Business Development",
  "Operations",
  "Finance & Accounting",
  "Human Resources",
  "Customer Support",
  "Marketing",
];

type Step = 1 | 2 | 3 | 4 | 5;

/* ── Component ─────────────────────────────────────────────────── */

export default function ROICalculatorPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // Form state
  const [step, setStep] = useState<Step>(1);
  const [employees, setEmployees] = useState(10);
  const [hoursWasted, setHoursWasted] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [departments, setDepartments] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  // Results
  const results = useMemo(() => {
    const annualHoursWasted = employees * hoursWasted * 52;
    const annualCostWasted = annualHoursWasted * hourlyCost;
    const automationSavingsPercent = 0.6; // conservative 60% recovery
    const hoursSaved = Math.round(annualHoursWasted * automationSavingsPercent);
    const costSaved = Math.round(annualCostWasted * automationSavingsPercent);
    const fteEquivalent = (hoursSaved / 2080).toFixed(1); // 2080 = 40hr * 52wk
    return { annualHoursWasted, annualCostWasted, hoursSaved, costSaved, fteEquivalent };
  }, [employees, hoursWasted, hourlyCost]);

  const totalSteps = 5;
  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  const toggleDepartment = (dept: string) => {
    setDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const canAdvance = () => {
    if (step === 4) return departments.length > 0;
    if (step === 5) return email.trim().length > 0;
    return true;
  };

  const next = () => {
    if (canAdvance() && step < 5) setStep((s) => (s + 1) as Step);
  };
  const prev = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/roi-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          email,
          employees,
          hoursWasted,
          hourlyCost,
          departments,
          results,
        }),
      });
    } catch {
      // Non-blocking — show results regardless
    }
    setStep(5);
  };

  /* ── Styles ──────────────────────────────────────────────────── */

  const cardBg = dark ? "#1A2235" : "#FFFFFF";
  const cardBorder = dark ? "#243049" : "#E5E7EB";
  const headingColor = dark ? "#3DCFED" : "#0D1F6E";
  const textColor = dark ? "#D1D5DB" : "#4B5563";
  const mutedColor = dark ? "#9CA3AF" : "#6B7280";
  const surfaceBg = dark ? "#111827" : "#EAF4FF";
  const inputBg = dark ? "#0B0F1A" : "#FFFFFF";
  const inputBorder = dark ? "#243049" : "#E5E7EB";

  /* ── Slider thumb styling ────────────────────────────────────── */

  const sliderStyle = `
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 999px;
      outline: none;
      background: linear-gradient(to right, #3DCFED, #1A3CC8);
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      cursor: pointer;
      border: 3px solid #3DCFED;
    }
    input[type="range"]::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      cursor: pointer;
      border: 3px solid #3DCFED;
    }
  `;

  /* ── Render helpers ──────────────────────────────────────────── */

  const renderStep = () => {
    return (
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                  How many employees handle repetitive tasks?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={1000}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span
                    className="text-3xl font-bold w-24 text-right tabular-nums"
                    style={{ color: headingColor }}
                  >
                    {employees}
                  </span>
                </div>
                <p className="text-xs mt-2" style={{ color: mutedColor }}>
                  Include anyone who spends time on manual data entry, copy-paste between tools, reporting, or follow-ups.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                  How many hours per week does each person spend on manual, repetitive work?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={hoursWasted}
                    onChange={(e) => setHoursWasted(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span
                    className="text-3xl font-bold w-24 text-right tabular-nums"
                    style={{ color: headingColor }}
                  >
                    {hoursWasted}h
                  </span>
                </div>
                <p className="text-xs mt-2" style={{ color: mutedColor }}>
                  Think: manual data entry, chasing approvals, building reports from scratch, copy-pasting between systems.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                  What&apos;s the average fully-loaded hourly cost per employee?
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium" style={{ color: mutedColor }}>$</span>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value) || 0)}
                    className="flex-1 rounded-lg border px-4 py-3 text-lg font-semibold outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    style={{
                      backgroundColor: inputBg,
                      borderColor: inputBorder,
                      color: headingColor,
                    }}
                  />
                  <span className="text-sm" style={{ color: mutedColor }}>/hour</span>
                </div>
                <p className="text-xs mt-2" style={{ color: mutedColor }}>
                  Include salary, benefits, and overhead. A $75K/year employee is roughly $45/hour fully loaded.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: textColor }}>
                  Which departments have the most bottlenecks? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEPARTMENTS.map((dept) => {
                    const selected = departments.includes(dept);
                    return (
                      <button
                        key={dept}
                        onClick={() => toggleDepartment(dept)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-left transition-all"
                        style={{
                          backgroundColor: selected
                            ? dark
                              ? "rgba(61,207,237,0.1)"
                              : "rgba(13,31,110,0.06)"
                            : surfaceBg,
                          border: `1.5px solid ${
                            selected
                              ? dark
                                ? "#3DCFED"
                                : "#0D1F6E"
                              : cardBorder
                          }`,
                          color: selected ? headingColor : textColor,
                        }}
                      >
                        <span className="mr-2">{selected ? "✓" : "○"}</span>
                        {dept}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8">
              {/* Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Hours recovered / year",
                    value: results.hoursSaved.toLocaleString(),
                    sub: `of ${results.annualHoursWasted.toLocaleString()} wasted`,
                  },
                  {
                    label: "Estimated annual savings",
                    value: `$${results.costSaved.toLocaleString()}`,
                    sub: `from $${results.annualCostWasted.toLocaleString()} in waste`,
                  },
                  {
                    label: "FTE equivalent freed up",
                    value: results.fteEquivalent,
                    sub: "full-time employees worth of capacity",
                  },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-xl p-5 text-center"
                    style={{
                      backgroundColor: surfaceBg,
                      border: `1px solid ${cardBorder}`,
                    }}
                  >
                    <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: mutedColor }}>
                      {stat.label}
                    </p>
                    <p
                      className="text-3xl sm:text-4xl font-bold tabular-nums"
                      style={{ color: headingColor }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs mt-1" style={{ color: mutedColor }}>
                      {stat.sub}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: dark ? "rgba(61,207,237,0.05)" : "rgba(13,31,110,0.03)",
                  border: `1px solid ${dark ? "rgba(61,207,237,0.15)" : "rgba(13,31,110,0.1)"}`,
                }}
              >
                <h3 className="text-lg font-bold mb-1" style={{ color: headingColor }}>
                  Want a custom automation roadmap?
                </h3>
                <p className="text-sm mb-5" style={{ color: mutedColor }}>
                  These are conservative estimates. In a free 30-minute consultation, we&apos;ll map your exact
                  bottlenecks and show you a prioritized automation plan with projected ROI.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: textColor }}>
                      Company name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                      style={{
                        backgroundColor: inputBg,
                        borderColor: inputBorder,
                        color: dark ? "#EAF4FF" : "#111827",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: textColor }}>
                      Work email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                      style={{
                        backgroundColor: inputBg,
                        borderColor: inputBorder,
                        color: dark ? "#EAF4FF" : "#111827",
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!email.trim()}
                  className="w-full rounded-full px-8 py-3.5 text-base font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                >
                  Book a Discovery Call →
                </button>
              </motion.div>

              <p className="text-xs text-center" style={{ color: mutedColor }}>
                Based on automating 60% of identified manual workflows, a conservative industry benchmark.
                Actual savings depend on your specific processes and are typically higher.
              </p>
            </div>
          )}
        </motion.div>
    );
  };

  /* ── Main render ─────────────────────────────────────────────── */

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sliderStyle }} />

      <section
        className="pt-32 pb-20 min-h-screen transition-colors duration-300"
        style={{ backgroundColor: dark ? "#0B0F1A" : "#FFFFFF" }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <SectionBadge text="Free ROI calculator" />
            <h1
              className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
              style={{ color: headingColor }}
            >
              How much is manual work
              <br />
              costing your business?
            </h1>
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: mutedColor }}
            >
              Answer 4 quick questions and see exactly how much time and money
              you could recover with AI-powered automation.
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: mutedColor }}>
                {step < 5 ? `Step ${step} of 4` : "Your results"}
              </span>
              <span className="text-xs font-medium" style={{ color: headingColor }}>
                {step < 5 ? `${Math.round((step / 4) * 100)}%` : "100%"}
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: dark ? "#243049" : "#E5E7EB" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(to right, #3DCFED, #1A3CC8)",
                }}
                initial={false}
                animate={{ width: step < 5 ? `${(step / 4) * 100}%` : "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question card */}
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
            }}
          >
            {/* Step title */}
            {step < 5 && (
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    backgroundColor: dark ? "rgba(61,207,237,0.1)" : "rgba(13,31,110,0.06)",
                    color: headingColor,
                    border: `1.5px solid ${dark ? "rgba(61,207,237,0.3)" : "rgba(13,31,110,0.15)"}`,
                  }}
                >
                  {step}
                </div>
                <h2 className="text-xl font-bold" style={{ color: headingColor }}>
                  {step === 1 && "Team Size"}
                  {step === 2 && "Time Spent"}
                  {step === 3 && "Cost Per Hour"}
                  {step === 4 && "Bottleneck Areas"}
                </h2>
              </div>
            )}

            {step === 5 && (
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    backgroundColor: dark ? "rgba(61,207,237,0.1)" : "rgba(13,31,110,0.06)",
                    border: `2px solid ${dark ? "#3DCFED" : "#0D1F6E"}`,
                  }}
                >
                  <span className="text-2xl">📊</span>
                </motion.div>
                <h2 className="text-2xl font-bold" style={{ color: headingColor }}>
                  Your Automation Savings Estimate
                </h2>
                <p className="text-sm mt-1" style={{ color: mutedColor }}>
                  Based on {employees} employees × {hoursWasted}h/week × ${hourlyCost}/hr
                </p>
              </div>
            )}

            {renderStep()}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    color: textColor,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  ← Back
                </button>

                {step < 4 ? (
                  <button
                    onClick={next}
                    className="rounded-full px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(5)}
                    disabled={!canAdvance()}
                    className="rounded-full px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                  >
                    See My Results →
                  </button>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-medium transition-colors hover:text-cyan-400"
                  style={{ color: mutedColor }}
                >
                  ← Recalculate with different numbers
                </button>
              </div>
            )}
          </div>

          {/* Social proof */}
          {step < 5 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-xs"
              style={{ color: mutedColor }}
            >
              Takes less than 60 seconds &middot; No credit card &middot; Instant results
            </motion.p>
          )}
        </div>
      </section>
    </>
  );
}
