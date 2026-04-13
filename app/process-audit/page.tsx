"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROCESSES = [
  { id: "sales", title: "Sales & Lead Management", icon: "💼" },
  { id: "hr", title: "HR & Recruiting", icon: "👥" },
  { id: "finance", title: "Finance & Accounting", icon: "💰" },
  { id: "support", title: "Customer Support", icon: "🎧" },
  { id: "operations", title: "Operations & Fulfillment", icon: "⚙️" },
  { id: "marketing", title: "Marketing & Campaigns", icon: "📣" },
  { id: "reporting", title: "Reporting & Analytics", icon: "📊" },
  { id: "onboarding", title: "Client/Employee Onboarding", icon: "🚀" },
  { id: "compliance", title: "Compliance & Legal", icon: "⚖️" },
  { id: "it", title: "IT & Systems", icon: "🖥️" },
];

const QUESTIONS = [
  {
    text: "How many people regularly touch this process?",
    options: [
      { label: "Just me", value: 0 },
      { label: "2–5 people", value: 1 },
      { label: "6–15 people", value: 2 },
      { label: "16+ people", value: 3 },
    ],
  },
  {
    text: "How many hours per week does your team spend on this?",
    options: [
      { label: "Less than 2 hrs/week", value: 0 },
      { label: "2–10 hrs/week", value: 1 },
      { label: "10–20 hrs/week", value: 2 },
      { label: "20+ hrs/week", value: 3 },
    ],
  },
  {
    text: "How repetitive and rule-based is this process?",
    options: [
      { label: "Highly creative, requires constant judgment", value: 0 },
      { label: "Mix of judgment and repetition", value: 1 },
      { label: "Mostly repetitive with some exceptions", value: 2 },
      { label: "Fully repetitive, same steps every time", value: 3 },
    ],
  },
  {
    text: "How often do errors or dropped tasks occur?",
    options: [
      { label: "Rarely, almost never", value: 0 },
      { label: "Monthly", value: 1 },
      { label: "Weekly", value: 2 },
      { label: "Daily, it's a real problem", value: 3 },
    ],
  },
];

// ─── Scoring helpers ─────────────────────────────────────────────────────────

function calcScore(answers: (number | undefined)[]): number {
  const raw = (answers ?? []).reduce<number>((sum, v) => sum + (v ?? 0), 0);
  return Math.round((raw / 12) * 100);
}

function potentialLabel(score: number): string {
  if (score <= 30) return "Low";
  if (score <= 60) return "Medium";
  if (score <= 80) return "High";
  return "Critical";
}

function hoursSaved(score: number): string {
  if (score <= 30) return "0–5 hrs/week";
  if (score <= 60) return "5–15 hrs/week";
  if (score <= 80) return "15–30 hrs/week";
  return "30+ hrs/week";
}

function hoursSavedMid(score: number): number {
  if (score <= 30) return 2.5;
  if (score <= 60) return 10;
  if (score <= 80) return 22.5;
  return 35;
}

function potentialColor(score: number): string {
  if (score <= 30) return "#6B7280";
  if (score <= 60) return "#1A3CC8";
  if (score <= 80) return "#3DCFED";
  return "#A855F7";
}

// ─── Types ───────────────────────────────────────────────────────────────────

type ProcessAnswers = Record<string, (number | undefined)[]>;

type Step = "intro" | number | "results";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProcessAuditPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<ProcessAnswers>({});
  const [direction, setDirection] = useState(1);
  const [skipped, setSkipped] = useState<Set<string>>(new Set());

  // ── Theme tokens ─────────────────────────────────────────────────────────

  const bg = isDark ? "#0B0F1A" : "#EAF4FF";
  const cardBg = isDark ? "#0F1623" : "#FFFFFF";
  const border = isDark ? "#1E2D45" : "#E5E7EB";
  const textPrimary = isDark ? "#EAF4FF" : "#111827";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";
  const trackBg = isDark ? "#1E2D45" : "#E5E7EB";

  // ── Navigation ───────────────────────────────────────────────────────────

  const goTo = (next: Step, dir = 1) => {
    setDirection(dir);
    setStep(next);
  };

  const currentIndex = typeof step === "number" ? step : -1;
  const currentProcess = currentIndex >= 0 ? PROCESSES[currentIndex] : null;

  const currentAnswers: (number | undefined)[] =
    currentProcess ? (answers[currentProcess.id] ?? Array(4).fill(undefined)) : [];

  const canAdvance = (): boolean => {
    if (!currentProcess) return false;
    if (skipped.has(currentProcess.id)) return true;
    const ans = answers[currentProcess.id] ?? [];
    return ans.filter((v) => v !== undefined).length === QUESTIONS.length;
  };

  const setAnswer = (procId: string, qIndex: number, value: number) => {
    setAnswers((prev) => {
      const existing = prev[procId] ?? Array(4).fill(undefined);
      const updated = [...existing];
      updated[qIndex] = value;
      return { ...prev, [procId]: updated };
    });
    // Un-skip if they start answering after skipping
    if (skipped.has(procId)) {
      setSkipped((prev) => {
        const next = new Set(prev);
        next.delete(procId);
        return next;
      });
    }
  };

  const handleSkip = () => {
    if (!currentProcess) return;
    setSkipped((prev) => new Set(prev).add(currentProcess.id));
    setAnswers((prev) => ({
      ...prev,
      [currentProcess.id]: Array(4).fill(0),
    }));
    const nextStep =
      currentIndex === PROCESSES.length - 1 ? "results" : currentIndex + 1;
    goTo(nextStep, 1);
  };

  const handleNext = () => {
    if (!currentProcess) return;
    const nextStep =
      currentIndex === PROCESSES.length - 1 ? "results" : currentIndex + 1;
    goTo(nextStep, 1);
  };

  const handleBack = () => {
    if (typeof step === "number") {
      goTo(step === 0 ? "intro" : step - 1, -1);
    }
  };

  // ── Progress ─────────────────────────────────────────────────────────────

  const progressPercent = (): number => {
    if (step === "intro") return 0;
    if (typeof step === "number") return ((step + 1) / PROCESSES.length) * 100;
    return 100;
  };

  // ── Results computation ───────────────────────────────────────────────────

  const ranked = PROCESSES.map((proc) => {
    const ans = answers[proc.id] ?? Array(4).fill(0);
    const score = calcScore(ans);
    return { ...proc, score, ans };
  }).sort((a, b) => b.score - a.score);

  const top3 = ranked.slice(0, 3);

  const totalHoursSaved = ranked.reduce((sum, p) => sum + hoursSavedMid(p.score), 0);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: "100vh",
        paddingTop: "7rem",
        paddingBottom: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div style={{ maxWidth: "42rem", margin: "0 auto" }}>

        {/* ── Progress bar ─────────────────────────────────────────────── */}
        {step !== "intro" && (
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                height: "6px",
                borderRadius: "9999px",
                overflow: "hidden",
                backgroundColor: trackBg,
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, #3DCFED, #1A3CC8)",
                }}
                animate={{ width: `${progressPercent()}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {typeof step === "number" && (
              <p style={{ color: textMuted, fontSize: "0.75rem", marginTop: "0.5rem" }}>
                {step + 1} of {PROCESSES.length}
              </p>
            )}
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>

          {/* ── Intro ──────────────────────────────────────────────────── */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "9999px",
                    padding: "0.375rem 1rem",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    marginBottom: "1.5rem",
                    backgroundColor: isDark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)",
                    color: "#3DCFED",
                    border: "1px solid rgba(61,207,237,0.2)",
                  }}
                >
                  Free Tool · Takes about 5 minutes
                </div>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: textPrimary,
                    marginBottom: "1rem",
                    lineHeight: 1.15,
                  }}
                >
                  Process Discovery Worksheet
                </h1>
                <p style={{ color: textMuted, fontSize: "1.0625rem", lineHeight: 1.65 }}>
                  Rate 10 business functions across 4 dimensions to discover your highest-impact automation opportunities, ranked by potential time savings.
                </p>
              </div>

              {/* Process list preview */}
              <div
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: "1rem",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.875rem",
                }}
              >
                {PROCESSES.map((proc) => (
                  <div key={proc.id} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <span style={{ fontSize: "1.375rem" }}>{proc.icon}</span>
                    <span style={{ fontSize: "0.8125rem", color: textPrimary, fontWeight: 500 }}>
                      {proc.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* What you'll get */}
              <div
                style={{
                  backgroundColor: isDark ? "rgba(61,207,237,0.05)" : "rgba(26,60,200,0.04)",
                  border: `1px solid rgba(61,207,237,0.15)`,
                  borderRadius: "1rem",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#3DCFED", marginBottom: "0.625rem" }}>
                  What you&apos;ll get:
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {[
                    "Top 3 automation opportunities ranked by impact",
                    "Estimated weekly hours saved per process",
                    "Full ranked breakdown of all 10 functions",
                    "A recommended next step",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8125rem", color: textMuted }}>
                      <span style={{ color: "#3DCFED", flexShrink: 0, marginTop: "1px" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => goTo(0)}
                style={{
                  width: "100%",
                  borderRadius: "1rem",
                  padding: "1rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(135deg, #3DCFED, #1A3CC8)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                }}
              >
                Start the Worksheet →
              </button>
            </motion.div>
          )}

          {/* ── Process screen ─────────────────────────────────────────── */}
          {typeof step === "number" && currentProcess && (
            <motion.div
              key={`proc-${step}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -48 }}
              transition={{ duration: 0.3 }}
            >
              {/* Process header */}
              <div style={{ marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "2rem" }}>{currentProcess.icon}</span>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: textPrimary, margin: 0 }}>
                      {currentProcess.title}
                    </h2>
                  </div>
                </div>
                <p style={{ fontSize: "0.8125rem", color: textMuted, marginTop: "0.25rem" }}>
                  Rate this function honestly. Skipped processes score zero.
                </p>
              </div>

              {/* Questions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {QUESTIONS.map((q, qIndex) => {
                  const selected = currentAnswers[qIndex];
                  const isSkipped = skipped.has(currentProcess.id);
                  return (
                    <div
                      key={qIndex}
                      style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${border}`,
                        borderRadius: "1rem",
                        padding: "1.25rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: textPrimary,
                          marginBottom: "0.875rem",
                          lineHeight: 1.45,
                        }}
                      >
                        {qIndex + 1}. {q.text}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {q.options.map((opt, optIdx) => {
                          const isSelected = !isSkipped && selected === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => setAnswer(currentProcess.id, qIndex, opt.value)}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                borderRadius: "0.75rem",
                                padding: "0.75rem 1rem",
                                fontSize: "0.875rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                backgroundColor: isSelected
                                  ? isDark ? "rgba(61,207,237,0.1)" : "rgba(26,60,200,0.07)"
                                  : isDark ? "rgba(30,45,69,0.4)" : "#EAF4FF",
                                border: `1.5px solid ${isSelected ? "#3DCFED" : border}`,
                                color: isSelected ? (isDark ? "#3DCFED" : "#0D1F6E") : textPrimary,
                                fontWeight: isSelected ? 500 : 400,
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "1.375rem",
                                  height: "1.375rem",
                                  borderRadius: "50%",
                                  fontSize: "0.6875rem",
                                  fontWeight: 600,
                                  flexShrink: 0,
                                  backgroundColor: isSelected ? "#3DCFED" : trackBg,
                                  color: isSelected ? "#000" : textMuted,
                                }}
                              >
                                {["A", "B", "C", "D"][optIdx]}
                              </span>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                <button
                  onClick={handleBack}
                  style={{
                    flex: 1,
                    borderRadius: "1rem",
                    padding: "0.875rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    backgroundColor: cardBg,
                    border: `1.5px solid ${border}`,
                    color: textMuted,
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSkip}
                  style={{
                    flex: 1,
                    borderRadius: "1rem",
                    padding: "0.875rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    border: `1.5px solid ${border}`,
                    color: textMuted,
                    cursor: "pointer",
                  }}
                >
                  Skip
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  style={{
                    flex: 2,
                    borderRadius: "1rem",
                    padding: "0.875rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#fff",
                    background: "linear-gradient(135deg, #3DCFED, #1A3CC8)",
                    border: "none",
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                    opacity: canAdvance() ? 1 : 0.4,
                    transition: "opacity 0.2s",
                  }}
                >
                  {currentIndex === PROCESSES.length - 1 ? "See Results →" : "Next →"}
                </button>
              </div>

              {/* Skip hint */}
              {!canAdvance() && !skipped.has(currentProcess.id) && (
                <p style={{ textAlign: "center", fontSize: "0.75rem", color: textMuted, marginTop: "0.875rem" }}>
                  Answer all 4 questions, or tap Skip to score this process as zero.
                </p>
              )}
            </motion.div>
          )}

          {/* ── Results ────────────────────────────────────────────────── */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "9999px",
                    padding: "0.375rem 1rem",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    marginBottom: "1rem",
                    backgroundColor: isDark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)",
                    color: "#3DCFED",
                    border: "1px solid rgba(61,207,237,0.2)",
                  }}
                >
                  Your Automation Opportunities
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                    fontWeight: 700,
                    color: textPrimary,
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Here&apos;s Where to Start
                </h2>
                <p style={{ color: textMuted, fontSize: "0.9375rem" }}>
                  Based on your responses, we&apos;ve ranked all 10 business functions by automation potential.
                </p>
              </div>

              {/* Total hours saved */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                style={{
                  backgroundColor: cardBg,
                  border: "1.5px solid rgba(61,207,237,0.3)",
                  borderRadius: "1.25rem",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "0.75rem", fontWeight: 500, color: textMuted, marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Total Estimated Savings
                </p>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #3DCFED, #1A3CC8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.25rem",
                  }}
                >
                  ~{Math.round(totalHoursSaved)}
                </div>
                <p style={{ fontSize: "0.9375rem", color: textMuted }}>
                  estimated hours saved per week across all processes
                </p>
              </motion.div>

              {/* Top 3 priority cards */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.875rem" }}>
                  Top Priorities
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {top3.map((proc, i) => {
                    const color = potentialColor(proc.score);
                    return (
                      <motion.div
                        key={proc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                        style={{
                          backgroundColor: cardBg,
                          border: `1.5px solid ${color}40`,
                          borderRadius: "1rem",
                          padding: "1.25rem",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* Rank badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            width: "1.75rem",
                            height: "1.75rem",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            backgroundColor: `${color}20`,
                            color: color,
                          }}
                        >
                          #{i + 1}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
                          <span style={{ fontSize: "1.5rem" }}>{proc.icon}</span>
                          <div>
                            <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: textPrimary, margin: 0 }}>
                              {proc.title}
                            </p>
                            <p style={{ fontSize: "0.75rem", color: textMuted, margin: 0 }}>
                              {hoursSaved(proc.score)} saved
                            </p>
                          </div>
                        </div>

                        {/* Score bar */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div
                            style={{
                              flex: 1,
                              height: "6px",
                              borderRadius: "9999px",
                              overflow: "hidden",
                              backgroundColor: trackBg,
                            }}
                          >
                            <motion.div
                              style={{
                                height: "100%",
                                borderRadius: "9999px",
                                backgroundColor: color,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${proc.score}%` }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                            />
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 600,
                                padding: "0.2rem 0.5rem",
                                borderRadius: "9999px",
                                backgroundColor: `${color}18`,
                                color: color,
                              }}
                            >
                              {potentialLabel(proc.score)}
                            </span>
                            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: color }}>
                              {proc.score}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Full ranked table */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.875rem" }}>
                  All Processes: Ranked
                </p>
                <div
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${border}`,
                    borderRadius: "1rem",
                    overflow: "hidden",
                  }}
                >
                  {ranked.map((proc, i) => {
                    const color = potentialColor(proc.score);
                    return (
                      <motion.div
                        key={proc.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                        style={{
                          padding: "0.875rem 1.25rem",
                          borderBottom: i < ranked.length - 1 ? `1px solid ${border}` : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        {/* Rank */}
                        <span
                          style={{
                            width: "1.5rem",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: i < 3 ? color : textMuted,
                            flexShrink: 0,
                            textAlign: "center",
                          }}
                        >
                          {i + 1}
                        </span>

                        {/* Icon + name */}
                        <span style={{ fontSize: "1.125rem", flexShrink: 0 }}>{proc.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: textPrimary, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {proc.title}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                            <div
                              style={{
                                flex: 1,
                                maxWidth: "100px",
                                height: "4px",
                                borderRadius: "9999px",
                                overflow: "hidden",
                                backgroundColor: trackBg,
                              }}
                            >
                              <motion.div
                                style={{ height: "100%", borderRadius: "9999px", backgroundColor: color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${proc.score}%` }}
                                transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                              />
                            </div>
                            <span style={{ fontSize: "0.6875rem", color: textMuted }}>
                              {hoursSaved(proc.score)}
                            </span>
                          </div>
                        </div>

                        {/* Potential + score */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0, gap: "0.25rem" }}>
                          <span
                            style={{
                              fontSize: "0.625rem",
                              fontWeight: 600,
                              padding: "0.15rem 0.4rem",
                              borderRadius: "9999px",
                              backgroundColor: `${color}18`,
                              color: color,
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {potentialLabel(proc.score)}
                          </span>
                          <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: color }}>
                            {proc.score}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${border}`,
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: textPrimary, marginBottom: "0.375rem" }}>
                    Ready to act on these insights?
                  </p>
                  <p style={{ fontSize: "0.875rem", color: textMuted, marginBottom: "1.25rem" }}>
                    Book a free 30-minute call and we&apos;ll walk through your top opportunities together.
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      borderRadius: "0.875rem",
                      padding: "0.9375rem",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "#fff",
                      background: "linear-gradient(135deg, #3DCFED, #1A3CC8)",
                      textDecoration: "none",
                    }}
                  >
                    Book a Free Consultation →
                  </Link>
                </div>

                <button
                  onClick={() => {
                    setAnswers({});
                    setSkipped(new Set());
                    goTo("intro", -1);
                  }}
                  style={{
                    width: "100%",
                    borderRadius: "0.875rem",
                    padding: "0.875rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    border: `1.5px solid ${border}`,
                    color: textMuted,
                    cursor: "pointer",
                  }}
                >
                  ← Start Over
                </button>

                <p style={{ textAlign: "center", fontSize: "0.75rem", color: textMuted, marginTop: "1.5rem" }}>
                  Questions? Reach us at{" "}
                  <a href="mailto:discovery@cadexhq.com" style={{ color: "#3DCFED", textDecoration: "none" }}>
                    discovery@cadexhq.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
