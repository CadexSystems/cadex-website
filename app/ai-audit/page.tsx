"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "data",
    title: "Data & Systems",
    icon: "🗄️",
    description: "How organized and accessible is your business data?",
    questions: [
      {
        text: "How do you currently manage customer or client information?",
        options: [
          { label: "Spreadsheets or paper records", value: 0 },
          { label: "Basic CRM with limited use", value: 1 },
          { label: "CRM with some automation", value: 2 },
          { label: "Advanced CRM fully integrated with other tools", value: 3 },
        ],
      },
      {
        text: "How would you describe the quality of your business data?",
        options: [
          { label: "Inconsistent and hard to access", value: 0 },
          { label: "Exists but scattered across tools", value: 1 },
          { label: "Mostly clean and centralized", value: 2 },
          { label: "Clean, structured, and reliable", value: 3 },
        ],
      },
      {
        text: "Do you have documented processes or SOPs?",
        options: [
          { label: "No documentation at all", value: 0 },
          { label: "Some key processes documented", value: 1 },
          { label: "Most processes documented", value: 2 },
          { label: "Fully documented with regular updates", value: 3 },
        ],
      },
      {
        text: "How well do your current tools integrate with each other?",
        options: [
          { label: "They don't, everything is siloed", value: 0 },
          { label: "Manual data transfers between tools", value: 1 },
          { label: "Some integrations in place", value: 2 },
          { label: "Fully connected tech stack", value: 3 },
        ],
      },
    ],
  },
  {
    id: "processes",
    title: "Processes",
    icon: "⚙️",
    description: "How structured and measurable are your day-to-day operations?",
    questions: [
      {
        text: "What percentage of your team's time is spent on repetitive manual tasks?",
        options: [
          { label: "Less than 10%", value: 0 },
          { label: "10–25%", value: 1 },
          { label: "25–50%", value: 2 },
          { label: "More than 50%", value: 3 },
        ],
      },
      {
        text: "How often do manual errors or dropped tasks occur in your operations?",
        options: [
          { label: "Daily, it's a real problem", value: 0 },
          { label: "Weekly", value: 1 },
          { label: "Monthly", value: 2 },
          { label: "Rarely, we have good controls", value: 3 },
        ],
      },
      {
        text: "How well-defined are the steps in your key business processes?",
        options: [
          { label: "Most work requires judgment calls", value: 0 },
          { label: "A few processes follow predictable steps", value: 1 },
          { label: "Many processes are rule-based", value: 2 },
          { label: "Most processes are consistent and well-defined", value: 3 },
        ],
      },
      {
        text: "Do you actively track performance metrics for your operations?",
        options: [
          { label: "No metrics in place", value: 0 },
          { label: "We track a few things informally", value: 1 },
          { label: "We have dashboards but rarely act on them", value: 2 },
          { label: "We actively measure and improve processes", value: 3 },
        ],
      },
    ],
  },
  {
    id: "team",
    title: "Team",
    icon: "👥",
    description: "How ready is your team to adopt and work alongside AI?",
    questions: [
      {
        text: "How would you describe your team's overall comfort with technology?",
        options: [
          { label: "Low — we avoid new tools when possible", value: 0 },
          { label: "Basic — we use what's required", value: 1 },
          { label: "Moderate — we adopt tools fairly easily", value: 2 },
          { label: "High — we actively seek better tools", value: 3 },
        ],
      },
      {
        text: "How open is your team to changing how they work?",
        options: [
          { label: "Very resistant to change", value: 0 },
          { label: "Skeptical but manageable", value: 1 },
          { label: "Generally open to new approaches", value: 2 },
          { label: "Enthusiastic about improvement", value: 3 },
        ],
      },
      {
        text: "Do you have dedicated staff for operations or process improvement?",
        options: [
          { label: "No — everyone is stretched thin", value: 0 },
          { label: "Informally — someone wears multiple hats", value: 1 },
          { label: "Yes — one dedicated person", value: 2 },
          { label: "Yes — a full operations or IT team", value: 3 },
        ],
      },
      {
        text: "How much capacity does your team have for learning new tools?",
        options: [
          { label: "None — we're overwhelmed", value: 0 },
          { label: "Very limited", value: 1 },
          { label: "Moderate — we can set aside some time", value: 2 },
          { label: "High — we invest in ongoing training", value: 3 },
        ],
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    icon: "🎯",
    description: "Is your leadership aligned and committed to an AI transformation?",
    questions: [
      {
        text: "How would you describe executive support for AI initiatives?",
        options: [
          { label: "Not on leadership's radar", value: 0 },
          { label: "Curious but not yet committed", value: 1 },
          { label: "Supportive and willing to invest", value: 2 },
          { label: "Actively championing AI adoption", value: 3 },
        ],
      },
      {
        text: "Do you have budget allocated for technology or AI?",
        options: [
          { label: "No budget available right now", value: 0 },
          { label: "Under $10,000", value: 1 },
          { label: "$10,000 – $50,000", value: 2 },
          { label: "$50,000+", value: 3 },
        ],
      },
      {
        text: "What is your target timeline for implementing AI?",
        options: [
          { label: "No concrete plans yet", value: 0 },
          { label: "12+ months from now", value: 1 },
          { label: "6–12 months", value: 2 },
          { label: "Within the next 6 months", value: 3 },
        ],
      },
      {
        text: "Has your company attempted automation or AI before?",
        options: [
          { label: "No plans to try", value: 0 },
          { label: "Never tried but open to it", value: 1 },
          { label: "Some small successes", value: 2 },
          { label: "Yes — we want to scale what's working", value: 3 },
        ],
      },
    ],
  },
  {
    id: "tools",
    title: "Current Tools",
    icon: "🛠️",
    description: "How mature and AI-compatible is your current software stack?",
    questions: [
      {
        text: "How would you describe the maturity of your current tech stack?",
        options: [
          { label: "Basic — email and spreadsheets only", value: 0 },
          { label: "Standard — common SaaS tools", value: 1 },
          { label: "Advanced — multiple integrated platforms", value: 2 },
          { label: "Enterprise — custom or enterprise-grade systems", value: 3 },
        ],
      },
      {
        text: "Do your key business tools support integrations or APIs?",
        options: [
          { label: "I'm not sure", value: 0 },
          { label: "Most don't support integrations", value: 1 },
          { label: "Some do", value: 2 },
          { label: "Yes — most have good API access", value: 3 },
        ],
      },
      {
        text: "Are you currently using any AI or automation tools?",
        options: [
          { label: "None at all", value: 0 },
          { label: "We've experimented with a few", value: 1 },
          { label: "We use some AI tools regularly", value: 2 },
          { label: "AI is already part of our core workflow", value: 3 },
        ],
      },
      {
        text: "How reliable are your current systems day-to-day?",
        options: [
          { label: "Frequent issues and downtime", value: 0 },
          { label: "Occasional problems", value: 1 },
          { label: "Mostly reliable", value: 2 },
          { label: "Highly reliable with good support", value: 3 },
        ],
      },
    ],
  },
];

const SCORE_BANDS = [
  {
    min: 0,
    max: 39,
    label: "AI Starter",
    description:
      "Your business has foundational work to do before a full AI rollout, but there are targeted quick wins we can capture right now.",
    tier: "SPARK",
    tierDesc: "AI Discovery",
    color: "#6B7280",
  },
  {
    min: 40,
    max: 59,
    label: "AI Explorer",
    description:
      "You have good bones. Targeted automations could deliver quick, measurable ROI while we build toward a broader implementation.",
    tier: "IGNITE",
    tierDesc: "Premium Audit",
    color: "#1A3CC8",
  },
  {
    min: 60,
    max: 79,
    label: "AI Ready",
    description:
      "Strong foundation. You're well-positioned for meaningful AI implementation across multiple areas of your business.",
    tier: "ACCELERATE",
    tierDesc: "Full Implementation",
    color: "#3DCFED",
  },
  {
    min: 80,
    max: 100,
    label: "AI-First",
    description:
      "You're ahead of the curve. The opportunity now is to scale, govern, and optimize AI across the entire organization.",
    tier: "TRANSFORM",
    tierDesc: "Enterprise Partnership",
    color: "#A855F7",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

type Answers = Record<string, number[]>;

export default function AIAuditPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState<"intro" | number | "email" | "results">("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const bg = isDark ? "#0B0F1A" : "#FFFFFF";
  const cardBg = isDark ? "#0F1623" : "#FFFFFF";
  const border = isDark ? "#1E2D45" : "#E5E7EB";
  const textPrimary = isDark ? "#EAF4FF" : "#111827";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";

  // ── Scoring ──────────────────────────────────────────────────────────────

  const categoryScore = (catId: string) => {
    const catAnswers = answers[catId] ?? [];
    const raw = catAnswers.reduce((sum, v) => sum + v, 0);
    return Math.round((raw / 12) * 20);
  };

  const totalScore = () =>
    CATEGORIES.reduce((sum, cat) => sum + categoryScore(cat.id), 0);

  const scoreBand = () =>
    SCORE_BANDS.find((b) => totalScore() >= b.min && totalScore() <= b.max) ??
    SCORE_BANDS[0];

  // ── Navigation ───────────────────────────────────────────────────────────

  const goTo = (next: typeof step, dir = 1) => {
    setDirection(dir);
    setStep(next);
  };

  const currentCategoryIndex = typeof step === "number" ? step : -1;
  const currentCategory =
    currentCategoryIndex >= 0 ? CATEGORIES[currentCategoryIndex] : null;

  const canAdvance = () => {
    if (!currentCategory) return false;
    const ans = answers[currentCategory.id] ?? [];
    return ans.filter((v) => v !== undefined).length === currentCategory.questions.length;
  };

  const setAnswer = (catId: string, qIndex: number, value: number) => {
    setAnswers((prev) => {
      const catAnswers = [...(prev[catId] ?? Array(4).fill(undefined))];
      catAnswers[qIndex] = value;
      return { ...prev, [catId]: catAnswers };
    });
  };

  // ── Email submit ─────────────────────────────────────────────────────────

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Build category scores object
    const categoryScores = Object.fromEntries(
      CATEGORIES.map((cat) => [cat.id, categoryScore(cat.id)])
    );

    try {
      await fetch("/api/audit-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          score: totalScore(),
          band: scoreBand().label,
          categoryScores,
        }),
      });
    } catch {
      // Non-blocking — show results regardless
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      goTo("results", 1);
    }
  };

  // ── Progress bar ─────────────────────────────────────────────────────────

  const progressPercent = () => {
    if (step === "intro") return 0;
    if (typeof step === "number") return ((step + 1) / (CATEGORIES.length + 2)) * 100;
    if (step === "email") return ((CATEGORIES.length + 1) / (CATEGORIES.length + 2)) * 100;
    return 100;
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen pt-28 pb-12 px-4" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-2xl">

        {/* Progress bar */}
        {step !== "intro" && step !== "results" && (
          <div className="mb-8">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: isDark ? "#1E2D45" : "#E5E7EB" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                animate={{ width: `${progressPercent()}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {typeof step === "number" && (
              <p className="text-xs mt-2" style={{ color: textMuted }}>
                Category {step + 1} of {CATEGORIES.length}
              </p>
            )}
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {/* ── Intro ─────────────────────────────────────────────────── */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-10">
                <div
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
                  style={{
                    backgroundColor: isDark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)",
                    color: "#3DCFED",
                    border: "1px solid rgba(61,207,237,0.2)",
                  }}
                >
                  Free Assessment · 5 minutes
                </div>
                <h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
                  style={{ color: textPrimary }}
                >
                  AI Readiness Scorecard
                </h1>
                <p className="text-lg" style={{ color: textMuted }}>
                  Answer 20 questions across 5 categories to discover your business&apos;s AI maturity score and get a personalized recommendation.
                </p>
              </div>

              <div
                className="rounded-2xl p-6 mb-8 grid grid-cols-2 gap-4"
                style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
              >
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: textPrimary }}>
                        {cat.title}
                      </p>
                      <p className="text-xs" style={{ color: textMuted }}>
                        4 questions
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => goTo(0)}
                className="w-full rounded-full py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
              >
                Start the Assessment →
              </button>
            </motion.div>
          )}

          {/* ── Category Questions ────────────────────────────────────── */}
          {typeof step === "number" && currentCategory && (
            <motion.div
              key={`cat-${step}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{currentCategory.icon}</span>
                  <h2 className="text-2xl font-bold" style={{ color: textPrimary }}>
                    {currentCategory.title}
                  </h2>
                </div>
                <p style={{ color: textMuted }}>{currentCategory.description}</p>
              </div>

              <div className="space-y-8">
                {currentCategory.questions.map((q, qIndex) => {
                  const selected = (answers[currentCategory.id] ?? [])[qIndex];
                  return (
                    <div key={qIndex}>
                      <p className="text-sm font-semibold mb-3" style={{ color: textPrimary }}>
                        {qIndex + 1}. {q.text}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt) => {
                          const isSelected = selected === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => setAnswer(currentCategory.id, qIndex, opt.value)}
                              className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all"
                              style={{
                                backgroundColor: isSelected
                                  ? isDark ? "rgba(61,207,237,0.12)" : "rgba(26,60,200,0.08)"
                                  : cardBg,
                                border: `1.5px solid ${isSelected ? "#3DCFED" : border}`,
                                color: isSelected ? (isDark ? "#3DCFED" : "#0D1F6E") : textPrimary,
                                fontWeight: isSelected ? 500 : 400,
                              }}
                            >
                              <span
                                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-3 flex-shrink-0"
                                style={{
                                  backgroundColor: isSelected ? "#3DCFED" : (isDark ? "#1E2D45" : "#F3F4F6"),
                                  color: isSelected ? "#000" : textMuted,
                                }}
                              >
                                {["A", "B", "C", "D"][opt.value]}
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

              <div className="flex gap-3 mt-10">
                <button
                  onClick={() => goTo(step === 0 ? "intro" : step - 1, -1)}
                  className="flex-1 rounded-full py-3.5 text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: cardBg,
                    border: `1.5px solid ${border}`,
                    color: textMuted,
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() =>
                    goTo(step === CATEGORIES.length - 1 ? "email" : step + 1, 1)
                  }
                  disabled={!canAdvance()}
                  className="flex-[2] rounded-full py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                >
                  {step === CATEGORIES.length - 1 ? "See My Results →" : "Next →"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Email Capture ─────────────────────────────────────────── */}
          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold mb-3" style={{ color: textPrimary }}>
                  Almost there!
                </h2>
                <p style={{ color: textMuted }}>
                  Enter your details below to unlock your personalized AI Readiness Score and recommended action plan.
                </p>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
              >
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: textPrimary }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400/40"
                      style={{
                        backgroundColor: isDark ? "#1A2235" : "#EAF4FF",
                        border: `1.5px solid ${border}`,
                        color: textPrimary,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: textPrimary }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400/40"
                      style={{
                        backgroundColor: isDark ? "#1A2235" : "#EAF4FF",
                        border: `1.5px solid ${border}`,
                        color: textPrimary,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: textPrimary }}>
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@acmecorp.com"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400/40"
                      style={{
                        backgroundColor: isDark ? "#1A2235" : "#EAF4FF",
                        border: `1.5px solid ${border}`,
                        color: textPrimary,
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
                    style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                  >
                    {submitting ? "Loading..." : "View My Score →"}
                  </button>
                </form>
                <p className="text-xs text-center mt-4" style={{ color: textMuted }}>
                  No spam. We&apos;ll only use this to send your results and follow up if you&apos;d like.
                </p>
              </div>

              <button
                onClick={() => goTo(CATEGORIES.length - 1, -1)}
                className="w-full mt-4 text-sm py-2 transition-colors"
                style={{ color: textMuted }}
              >
                ← Back
              </button>
            </motion.div>
          )}

          {/* ── Results ───────────────────────────────────────────────── */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score hero */}
              <div className="text-center mb-8">
                <p className="text-sm font-medium mb-2" style={{ color: textMuted }}>
                  {submitted ? `${name}'s` : "Your"} AI Readiness Score
                </p>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-8xl font-bold mb-2"
                  style={{ color: scoreBand().color }}
                >
                  {totalScore()}
                </motion.div>
                <p className="text-sm mb-1" style={{ color: textMuted }}>out of 100</p>
                <div
                  className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold mt-2"
                  style={{
                    backgroundColor: `${scoreBand().color}18`,
                    color: scoreBand().color,
                    border: `1px solid ${scoreBand().color}40`,
                  }}
                >
                  {scoreBand().label}
                </div>
                <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: textMuted }}>
                  {scoreBand().description}
                </p>
              </div>

              {/* Category bars */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
              >
                <h3 className="text-sm font-semibold mb-5" style={{ color: textPrimary }}>
                  Score Breakdown
                </h3>
                <div className="space-y-4">
                  {CATEGORIES.map((cat, i) => {
                    const score = categoryScore(cat.id);
                    return (
                      <div key={cat.id}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm flex items-center gap-2" style={{ color: textPrimary }}>
                            {cat.icon} {cat.title}
                          </span>
                          <span className="text-sm font-semibold" style={{ color: "#3DCFED" }}>
                            {score}/20
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: isDark ? "#1E2D45" : "#E5E7EB" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / 20) * 100}%` }}
                            transition={{ delay: 0.1 * i + 0.3, duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended tier */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  backgroundColor: cardBg,
                  border: `1.5px solid ${scoreBand().color}40`,
                }}
              >
                <p className="text-xs font-medium mb-1" style={{ color: textMuted }}>
                  Recommended Starting Point
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: scoreBand().color }}>
                      {scoreBand().tier}
                    </h3>
                    <p className="text-sm" style={{ color: textMuted }}>
                      {scoreBand().tierDesc}
                    </p>
                  </div>
                  <a
                    href="/services"
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: `${scoreBand().color}18`,
                      color: scoreBand().color,
                    }}
                  >
                    View Details →
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <a
                  href="/contact"
                  className="flex items-center justify-center w-full rounded-full py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
                >
                  Book a Free Consultation →
                </a>
                <a
                  href="/roi"
                  className="flex items-center justify-center w-full rounded-full py-3.5 text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: cardBg,
                    border: `1.5px solid ${border}`,
                    color: textPrimary,
                  }}
                >
                  Calculate Your ROI →
                </a>
              </div>

              <p className="text-center text-xs mt-6" style={{ color: textMuted }}>
                Questions? Email us at{" "}
                <a href="mailto:info@cadexhq.com" style={{ color: "#3DCFED" }}>
                  info@cadexhq.com
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
