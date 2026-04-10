"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "intro" | "page1" | "page2" | "page3" | "results";

interface Page1Data {
  name: string;
  company: string;
  email: string;
  industry: string;
  companySize: string;
  revenueRange: string;
  role: string;
}

interface Page2Data {
  painPoints: string[];
  tools: string[];
  manualHours: number;
  timeline: string;
  budget: string;
}

interface Page3Data {
  hasCRM: string;
  hasSOPs: string;
  leadershipSupport: string;
  triedAutomation: string;
  automationWorked: string;
  hasInternalOwner: string;
  growthPressure: string;
  hasData: string;
  isDecisionMaker: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Healthcare",
  "Real Estate",
  "Legal Services",
  "Financial Services",
  "Logistics & Supply Chain",
  "Manufacturing",
  "Retail & E-Commerce",
  "Professional Services",
  "Construction",
  "Technology",
  "Other",
];

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];

const REVENUE_RANGES = [
  "Under $1M",
  "$1M–$5M",
  "$5M–$25M",
  "$25M–$100M",
  "$100M+",
];

const ROLES = [
  "Owner/CEO",
  "Operations",
  "Finance",
  "IT/Technology",
  "Marketing/Sales",
  "HR",
  "Other",
];

const PAIN_POINTS = [
  "Slow lead follow-up",
  "Manual data entry",
  "Reporting takes too long",
  "Employee onboarding is painful",
  "Customer support is reactive",
  "Invoice and billing delays",
  "Too many tools that don't connect",
  "Compliance and documentation burden",
  "Scheduling and coordination overhead",
  "Lack of visibility into operations",
];

const TOOL_OPTIONS: Record<string, string[]> = {
  CRM: ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "No CRM"],
  Accounting: ["QuickBooks", "Xero", "NetSuite", "Spreadsheets"],
  Communication: [
    "Slack",
    "Microsoft Teams",
    "Google Workspace",
    "Email only",
  ],
  "Project Mgmt": [
    "Asana",
    "ClickUp",
    "Jira",
    "Trello",
    "Notion",
    "Spreadsheets",
  ],
};

const TIMELINES = [
  "We're exploring",
  "6–12 months",
  "3–6 months",
  "ASAP",
];

const BUDGETS = [
  "Under $10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k+",
  "Not sure yet",
];

const PAIN_POINT_MAP: Record<
  string,
  { title: string; description: string; hours: string }
> = {
  "Slow lead follow-up": {
    title: "Lead Response Automation",
    description:
      "Instant AI-powered follow-up sequences triggered by any new lead source.",
    hours: "8–12 hrs/week recovered",
  },
  "Manual data entry": {
    title: "Data Entry Elimination",
    description:
      "AI extracts, formats, and routes data across your systems without human intervention.",
    hours: "10–15 hrs/week recovered",
  },
  "Reporting takes too long": {
    title: "Automated Reporting Pipeline",
    description:
      "Reports generated and delivered on schedule, pulling live data from all your sources.",
    hours: "5–8 hrs/week recovered",
  },
  "Employee onboarding is painful": {
    title: "Employee Onboarding Automation",
    description:
      "Every hire triggers a full automated onboarding workflow: accounts, welcome, training schedule.",
    hours: "6–10 hrs/week recovered",
  },
  "Customer support is reactive": {
    title: "AI Support Triage",
    description:
      "AI handles Tier-1 tickets automatically, routes complex issues with full context.",
    hours: "8–15 hrs/week recovered",
  },
  "Invoice and billing delays": {
    title: "Invoice Processing Automation",
    description:
      "AI extracts invoice data, routes approvals, and syncs to accounting.",
    hours: "8–12 hrs/week recovered",
  },
  "Too many tools that don't connect": {
    title: "Integration Architecture",
    description:
      "A unified automation layer connects your tools so data flows without manual transfers.",
    hours: "10–20 hrs/week recovered",
  },
  "Compliance and documentation burden": {
    title: "Compliance Document Automation",
    description:
      "AI drafts, versions, and routes compliance documentation automatically.",
    hours: "6–10 hrs/week recovered",
  },
  "Scheduling and coordination overhead": {
    title: "Scheduling Automation",
    description:
      "AI handles internal and external scheduling, reminders, and coordination.",
    hours: "4–8 hrs/week recovered",
  },
  "Lack of visibility into operations": {
    title: "Operations Dashboard",
    description:
      "Real-time visibility into KPIs across all departments, updated automatically.",
    hours: "3–6 hrs/week recovered",
  },
};

const DEFAULT_OPPORTUNITIES = [
  "Slow lead follow-up",
  "Manual data entry",
  "Reporting takes too long",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

function roundToNearest5(n: number): number {
  return Math.round(n / 5) * 5;
}

function getReadinessScore(p3: Page3Data): number {
  let score = 0;
  if (p3.hasCRM === "Yes") score += 10;
  if (p3.hasSOPs === "Yes") score += 10;
  if (p3.leadershipSupport === "Yes") score += 10;
  if (p3.triedAutomation === "Yes") score += 10;
  if (p3.hasInternalOwner === "Yes") score += 10;
  if (p3.growthPressure === "Yes") score += 10;
  if (p3.hasData === "Yes") score += 10;
  if (p3.isDecisionMaker === "Yes") score += 10;
  // normalize to 100
  return Math.round((score / 80) * 100);
}

function getReadinessLabel(score: number): string {
  if (score <= 40) return "Getting Ready";
  if (score <= 70) return "Good Foundation";
  return "High Readiness";
}

function getReadinessColor(score: number): string {
  if (score <= 40) return "#F59E0B";
  if (score <= 70) return "#3DCFED";
  return "#22C55E";
}

function getEngagement(
  p1: Page1Data,
  p2: Page2Data,
  readinessScore: number
): { tier: string; description: string } {
  const isSmall = ["1–10", "11–50"].includes(p1.companySize);
  const isMid = ["51–200"].includes(p1.companySize);
  const isLarge = ["201–1000", "1000+"].includes(p1.companySize);
  const isLowBudget = ["Under $10k", "Not sure yet"].includes(p2.budget);
  const isMedBudget = ["$10k–$25k", "$25k–$50k"].includes(p2.budget);
  const isHighBudget = p2.budget === "$50k+";
  const isLowReadiness = readinessScore <= 40;
  const isHighReadiness = readinessScore >= 71;

  if (isLarge && isHighReadiness && isHighBudget) {
    return {
      tier: "TRANSFORM",
      description:
        "Enterprise-grade AI transformation program with full process redesign, custom automation infrastructure, and a dedicated implementation team.",
    };
  }
  if ((isMid || isLarge) && !isLowReadiness && (isMedBudget || isHighBudget)) {
    return {
      tier: "ACCELERATE",
      description:
        "A comprehensive automation build-out for growing mid-market companies ready to scale operations systematically.",
    };
  }
  if (!isSmall && isMedBudget) {
    return {
      tier: "IGNITE",
      description:
        "A full automation sprint that deploys your highest-ROI workflows and builds the foundation for continued expansion.",
    };
  }
  return {
    tier: "SPARK",
    description:
      "Our flagship discovery and quick-win engagement to identify your top automation opportunities and deploy your first workflows in 30 days.",
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PreAuditPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const bg = dark ? "#0B0F1A" : "#EAF4FF";
  const cardBg = dark ? "#0F1623" : "#FFFFFF";
  const border = dark ? "#1E2D45" : "#E5E7EB";
  const text = dark ? "#EAF4FF" : "#111827";
  const muted = dark ? "#9CA3AF" : "#6B7280";
  const inputBg = dark ? "#0B0F1A" : "#EAF4FF";

  const [step, setStep] = useState<Step>("intro");
  const [direction, setDirection] = useState(1);

  const [page1, setPage1] = useState<Page1Data>({
    name: "",
    company: "",
    email: "",
    industry: "",
    companySize: "",
    revenueRange: "",
    role: "",
  });

  const [page2, setPage2] = useState<Page2Data>({
    painPoints: [],
    tools: [],
    manualHours: 20,
    timeline: "",
    budget: "",
  });

  const [page3, setPage3] = useState<Page3Data>({
    hasCRM: "",
    hasSOPs: "",
    leadershipSupport: "",
    triedAutomation: "",
    automationWorked: "",
    hasInternalOwner: "",
    growthPressure: "",
    hasData: "",
    isDecisionMaker: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function goTo(next: Step, dir: number) {
    setDirection(dir);
    setErrors({});
    setStep(next);
  }

  // ─── Validation ───────────────────────────────────────────────────────────

  function validatePage1(): boolean {
    const e: Record<string, string> = {};
    if (!page1.name.trim()) e.name = "Required";
    if (!page1.company.trim()) e.company = "Required";
    if (!page1.email.trim() || !/\S+@\S+\.\S+/.test(page1.email))
      e.email = "Valid email required";
    if (!page1.industry) e.industry = "Required";
    if (!page1.companySize) e.companySize = "Required";
    if (!page1.revenueRange) e.revenueRange = "Required";
    if (!page1.role) e.role = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePage2(): boolean {
    const e: Record<string, string> = {};
    if (page2.painPoints.length === 0) e.painPoints = "Select at least one";
    if (!page2.timeline) e.timeline = "Required";
    if (!page2.budget) e.budget = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePage3(): boolean {
    const e: Record<string, string> = {};
    const fields: (keyof Page3Data)[] = [
      "hasCRM",
      "hasSOPs",
      "leadershipSupport",
      "triedAutomation",
      "hasInternalOwner",
      "growthPressure",
      "hasData",
      "isDecisionMaker",
    ];
    fields.forEach((f) => {
      if (!page3[f]) e[f] = "Required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ─── Computed results ─────────────────────────────────────────────────────

  const annualCost = page2.manualHours * 35 * 52;
  const readinessScore = getReadinessScore(page3);
  const readinessLabel = getReadinessLabel(readinessScore);
  const readinessColor = getReadinessColor(readinessScore);
  const engagement = getEngagement(page1, page2, readinessScore);

  const topOpportunities = (() => {
    const selected = page2.painPoints.slice(0, 3);
    if (selected.length < 3) {
      const defaults = DEFAULT_OPPORTUNITIES.filter(
        (d) => !selected.includes(d)
      );
      return [...selected, ...defaults].slice(0, 3);
    }
    return selected;
  })();

  const hoursRecoverable = roundToNearest5(page2.manualHours * 0.6);

  const roiRange = (() => {
    const size = page1.companySize;
    if (["1–10", "11–50"].includes(size)) return "5–8x";
    if (size === "51–200") return "4–6x";
    return "3–5x";
  })();

  // ─── Slide variants ───────────────────────────────────────────────────────

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  // ─── Shared styles ────────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: inputBg,
    border: `1px solid ${border}`,
    borderRadius: 8,
    color: text,
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: muted,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const cardStyle: React.CSSProperties = {
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: 12,
    padding: "28px 32px",
  };

  const radioCardBase: React.CSSProperties = {
    border: `1.5px solid ${border}`,
    borderRadius: 10,
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    color: text,
    background: "transparent",
    transition: "all 0.15s ease",
    textAlign: "center" as const,
  };

  const radioCardActive: React.CSSProperties = {
    ...radioCardBase,
    border: "1.5px solid #3DCFED",
    background: dark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.07)",
    color: "#3DCFED",
  };

  const gradientBtn: React.CSSProperties = {
    display: "inline-block",
    padding: "13px 28px",
    background: "linear-gradient(90deg, #3DCFED, #1A3CC8)",
    borderRadius: 10,
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.02em",
  };

  const outlinedBtn: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 26px",
    background: "transparent",
    borderRadius: 10,
    color: "#3DCFED",
    fontWeight: 600,
    fontSize: 15,
    border: "1.5px solid #3DCFED",
    cursor: "pointer",
    letterSpacing: "0.02em",
  };

  // ─── Progress bar ─────────────────────────────────────────────────────────

  function ProgressBar({ current }: { current: 1 | 2 | 3 }) {
    return (
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 28,
          alignItems: "center",
        }}
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 99,
              background:
                n <= current
                  ? "linear-gradient(90deg, #3DCFED, #1A3CC8)"
                  : border,
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
    );
  }

  // ─── Step Badge ───────────────────────────────────────────────────────────

  function StepBadge({ label }: { label: string }) {
    return (
      <div
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 99,
          border: "1px solid #3DCFED",
          color: "#3DCFED",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {label}
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        paddingTop: 112,
        paddingBottom: 64,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        {/* ── INTRO ── */}
        {step === "intro" && (
          <motion.div
            key="intro"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ maxWidth: 640, margin: "0 auto" }}
          >
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 99,
                  border: "1px solid #3DCFED",
                  color: "#3DCFED",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Free · 8 Minutes · No Sales Pitch
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 42px)",
                  fontWeight: 800,
                  color: text,
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                The Cadex{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #3DCFED, #1A3CC8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Pre-Audit
                </span>
              </h1>
              <p
                style={{
                  fontSize: 17,
                  color: muted,
                  lineHeight: 1.7,
                  maxWidth: 480,
                  margin: "0 auto 32px",
                }}
              >
                Answer 3 pages of questions and receive a personalized
                AI readiness report including your estimated ROI, top
                automation opportunities, and a recommended engagement.
              </p>

              <div
                style={{
                  ...cardStyle,
                  textAlign: "left",
                  marginBottom: 32,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {[
                    ["Company Profile", "Industry, size, revenue, role"],
                    ["Process Inventory", "Pain points, tools, hours lost"],
                    ["Readiness Check", "8 yes/no diagnostic questions"],
                    ["Your Report", "Personalized AI opportunity analysis"],
                  ].map(([title, desc]) => (
                    <div key={title} style={{ display: "flex", gap: 12 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "linear-gradient(#3DCFED, #1A3CC8)",
                          marginTop: 6,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: text,
                            marginBottom: 2,
                          }}
                        >
                          {title}
                        </div>
                        <div style={{ fontSize: 13, color: muted }}>
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                style={gradientBtn}
                onClick={() => goTo("page1", 1)}
              >
                Start My Pre-Audit &rarr;
              </button>
              <p
                style={{
                  fontSize: 12,
                  color: muted,
                  marginTop: 12,
                }}
              >
                No account required. Your data stays private.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── PAGE 1 ── */}
        {step === "page1" && (
          <motion.div
            key="page1"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ maxWidth: 640, margin: "0 auto" }}
          >
            <ProgressBar current={1} />
            <StepBadge label="Step 1 of 3: Company Profile" />
            <h2
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: text,
                marginBottom: 28,
              }}
            >
              Tell us about your business
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Name + Company */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    style={{
                      ...inputStyle,
                      borderColor: errors.name ? "#F87171" : border,
                    }}
                    placeholder="Jane Smith"
                    value={page1.name}
                    onChange={(e) =>
                      setPage1((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                  {errors.name && (
                    <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input
                    style={{
                      ...inputStyle,
                      borderColor: errors.company ? "#F87171" : border,
                    }}
                    placeholder="Acme Corp"
                    value={page1.company}
                    onChange={(e) =>
                      setPage1((p) => ({ ...p, company: e.target.value }))
                    }
                  />
                  {errors.company && (
                    <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Work Email</label>
                <input
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? "#F87171" : border,
                  }}
                  type="email"
                  placeholder="jane@acme.com"
                  value={page1.email}
                  onChange={(e) =>
                    setPage1((p) => ({ ...p, email: e.target.value }))
                  }
                />
                {errors.email && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label style={labelStyle}>Industry</label>
                <select
                  style={{
                    ...inputStyle,
                    borderColor: errors.industry ? "#F87171" : border,
                    appearance: "none",
                  }}
                  value={page1.industry}
                  onChange={(e) =>
                    setPage1((p) => ({ ...p, industry: e.target.value }))
                  }
                >
                  <option value="">Select your industry…</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.industry}
                  </p>
                )}
              </div>

              {/* Company Size */}
              <div>
                <label style={labelStyle}>Company Size</label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {COMPANY_SIZES.map((size) => (
                    <button
                      key={size}
                      style={
                        page1.companySize === size
                          ? radioCardActive
                          : radioCardBase
                      }
                      onClick={() =>
                        setPage1((p) => ({ ...p, companySize: size }))
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.companySize && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.companySize}
                  </p>
                )}
              </div>

              {/* Revenue Range */}
              <div>
                <label style={labelStyle}>Annual Revenue Range</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {REVENUE_RANGES.map((r) => (
                    <button
                      key={r}
                      style={
                        page1.revenueRange === r
                          ? radioCardActive
                          : radioCardBase
                      }
                      onClick={() =>
                        setPage1((p) => ({ ...p, revenueRange: r }))
                      }
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.revenueRange && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.revenueRange}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label style={labelStyle}>Your Role</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      style={
                        page1.role === r ? radioCardActive : radioCardBase
                      }
                      onClick={() => setPage1((p) => ({ ...p, role: r }))}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.role}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 8,
                }}
              >
                <button
                  style={gradientBtn}
                  onClick={() => {
                    if (validatePage1()) goTo("page2", 1);
                  }}
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── PAGE 2 ── */}
        {step === "page2" && (
          <motion.div
            key="page2"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ maxWidth: 640, margin: "0 auto" }}
          >
            <ProgressBar current={2} />
            <StepBadge label="Step 2 of 3: Process Inventory" />
            <h2
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: text,
                marginBottom: 28,
              }}
            >
              Where are you losing time?
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Section A: Pain Points */}
              <div>
                <label style={{ ...labelStyle, marginBottom: 4 }}>
                  Top Pain Points
                </label>
                <p style={{ fontSize: 13, color: muted, marginBottom: 12 }}>
                  Select all that apply
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {PAIN_POINTS.map((pp) => {
                    const active = page2.painPoints.includes(pp);
                    return (
                      <button
                        key={pp}
                        style={active ? radioCardActive : radioCardBase}
                        onClick={() =>
                          setPage2((p) => ({
                            ...p,
                            painPoints: active
                              ? p.painPoints.filter((x) => x !== pp)
                              : [...p.painPoints, pp],
                          }))
                        }
                      >
                        {pp}
                      </button>
                    );
                  })}
                </div>
                {errors.painPoints && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.painPoints}
                  </p>
                )}
              </div>

              {/* Section B: Tools */}
              <div>
                <label style={{ ...labelStyle, marginBottom: 4 }}>
                  Current Tools
                </label>
                <p style={{ fontSize: 13, color: muted, marginBottom: 12 }}>
                  Select all that apply
                </p>
                {Object.entries(TOOL_OPTIONS).map(([category, tools]) => (
                  <div key={category} style={{ marginBottom: 16 }}>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: muted,
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {category}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {tools.map((t) => {
                        const active = page2.tools.includes(t);
                        return (
                          <button
                            key={t}
                            style={{
                              ...(active ? radioCardActive : radioCardBase),
                              padding: "7px 14px",
                              fontSize: 13,
                            }}
                            onClick={() =>
                              setPage2((p) => ({
                                ...p,
                                tools: active
                                  ? p.tools.filter((x) => x !== t)
                                  : [...p.tools, t],
                              }))
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section C: Manual Hours */}
              <div>
                <label style={labelStyle}>
                  Weekly Manual Hours Estimate
                </label>
                <p style={{ fontSize: 13, color: muted, marginBottom: 16 }}>
                  How many hours per week does your team spend on manual,
                  repetitive tasks?
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 12,
                  }}
                >
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={page2.manualHours}
                    onChange={(e) =>
                      setPage2((p) => ({
                        ...p,
                        manualHours: Number(e.target.value),
                      }))
                    }
                    style={{ flex: 1, accentColor: "#3DCFED" }}
                  />
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#3DCFED",
                      minWidth: 48,
                      textAlign: "right",
                    }}
                  >
                    {page2.manualHours}h
                  </span>
                </div>
                <div
                  style={{
                    padding: "10px 16px",
                    background: dark
                      ? "rgba(61,207,237,0.06)"
                      : "rgba(26,60,200,0.06)",
                    borderRadius: 8,
                    border: "1px solid rgba(61,207,237,0.2)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#3DCFED",
                  }}
                >
                  ~{formatCurrency(page2.manualHours * 35 * 52)}/year in
                  manual labor
                </div>
              </div>

              {/* Section D: Timeline */}
              <div>
                <label style={labelStyle}>Implementation Timeline</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      style={
                        page2.timeline === t ? radioCardActive : radioCardBase
                      }
                      onClick={() =>
                        setPage2((p) => ({ ...p, timeline: t }))
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.timeline && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.timeline}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label style={labelStyle}>Budget Range</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      style={
                        page2.budget === b ? radioCardActive : radioCardBase
                      }
                      onClick={() =>
                        setPage2((p) => ({ ...p, budget: b }))
                      }
                    >
                      {b}
                    </button>
                  ))}
                </div>
                {errors.budget && (
                  <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
                    {errors.budget}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <button
                  style={{ ...outlinedBtn, fontSize: 14 }}
                  onClick={() => goTo("page1", -1)}
                >
                  &larr; Back
                </button>
                <button
                  style={gradientBtn}
                  onClick={() => {
                    if (validatePage2()) goTo("page3", 1);
                  }}
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── PAGE 3 ── */}
        {step === "page3" && (
          <motion.div
            key="page3"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ maxWidth: 640, margin: "0 auto" }}
          >
            <ProgressBar current={3} />
            <StepBadge label="Step 3 of 3: Readiness Check" />
            <h2
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: text,
                marginBottom: 8,
              }}
            >
              One last set of questions
            </h2>
            <p style={{ fontSize: 15, color: muted, marginBottom: 28 }}>
              These help us calibrate your readiness score and recommended
              engagement tier.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Q1 */}
              <ReadinessQuestion
                label="Do you have a CRM or central database for customer data?"
                field="hasCRM"
                options={["Yes", "No"]}
                value={page3.hasCRM}
                error={errors.hasCRM}
                onChange={(v) => setPage3((p) => ({ ...p, hasCRM: v }))}
                dark={dark}
                border={border}
                text={text}
              />

              {/* Q2 */}
              <ReadinessQuestion
                label="Are your key business processes documented in SOPs or written procedures?"
                field="hasSOPs"
                options={["Yes", "No"]}
                value={page3.hasSOPs}
                error={errors.hasSOPs}
                onChange={(v) => setPage3((p) => ({ ...p, hasSOPs: v }))}
                dark={dark}
                border={border}
                text={text}
              />

              {/* Q3 */}
              <ReadinessQuestion
                label="Does your leadership team actively support technology investment?"
                field="leadershipSupport"
                options={["Yes", "No"]}
                value={page3.leadershipSupport}
                error={errors.leadershipSupport}
                onChange={(v) =>
                  setPage3((p) => ({ ...p, leadershipSupport: v }))
                }
                dark={dark}
                border={border}
                text={text}
              />

              {/* Q4 */}
              <ReadinessQuestion
                label="Has your company tried automation or AI tools before?"
                field="triedAutomation"
                options={["Yes", "No"]}
                value={page3.triedAutomation}
                error={errors.triedAutomation}
                onChange={(v) =>
                  setPage3((p) => ({ ...p, triedAutomation: v }))
                }
                dark={dark}
                border={border}
                text={text}
              />

              {page3.triedAutomation === "Yes" && (
                <div
                  style={{
                    marginLeft: 20,
                    paddingLeft: 16,
                    borderLeft: "2px solid #3DCFED",
                  }}
                >
                  <ReadinessQuestion
                    label="Did it work?"
                    field="automationWorked"
                    options={["Somewhat", "Yes, successfully"]}
                    value={page3.automationWorked}
                    onChange={(v) =>
                      setPage3((p) => ({ ...p, automationWorked: v }))
                    }
                    dark={dark}
                    border={border}
                    text={text}
                  />
                </div>
              )}

              {/* Q5 */}
              <ReadinessQuestion
                label="Do you have someone internally who could own and manage AI tools?"
                field="hasInternalOwner"
                options={["Yes", "No"]}
                value={page3.hasInternalOwner}
                error={errors.hasInternalOwner}
                onChange={(v) =>
                  setPage3((p) => ({ ...p, hasInternalOwner: v }))
                }
                dark={dark}
                border={border}
                text={text}
              />

              {/* Q6 */}
              <ReadinessQuestion
                label="Are you currently experiencing growth pressure that your team can't keep up with?"
                field="growthPressure"
                options={["Yes", "No"]}
                value={page3.growthPressure}
                error={errors.growthPressure}
                onChange={(v) =>
                  setPage3((p) => ({ ...p, growthPressure: v }))
                }
                dark={dark}
                border={border}
                text={text}
              />

              {/* Q7 */}
              <ReadinessQuestion
                label="Do you have reliable data about your operations (metrics, dashboards)?"
                field="hasData"
                options={["Yes", "No"]}
                value={page3.hasData}
                error={errors.hasData}
                onChange={(v) => setPage3((p) => ({ ...p, hasData: v }))}
                dark={dark}
                border={border}
                text={text}
              />

              {/* Q8 */}
              <ReadinessQuestion
                label="Are you the decision maker for this investment?"
                field="isDecisionMaker"
                options={[
                  "Yes",
                  "No",
                  "I'm influencing the decision",
                ]}
                value={page3.isDecisionMaker}
                error={errors.isDecisionMaker}
                onChange={(v) =>
                  setPage3((p) => ({ ...p, isDecisionMaker: v }))
                }
                dark={dark}
                border={border}
                text={text}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <button
                  style={{ ...outlinedBtn, fontSize: 14 }}
                  onClick={() => goTo("page2", -1)}
                >
                  &larr; Back
                </button>
                <button
                  style={{
                    ...gradientBtn,
                    padding: "14px 32px",
                    fontSize: 16,
                  }}
                  onClick={() => {
                    if (validatePage3()) goTo("results", 1);
                  }}
                >
                  Generate My Pre-Audit Report &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── RESULTS ── */}
        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ maxWidth: 760, margin: "0 auto" }}
          >
            {/* Report Header */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#3DCFED",
                  }}
                >
                  Cadex Systems
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: muted,
                    letterSpacing: "0.04em",
                  }}
                >
                  Confidential &bull; {formatDate(new Date())}
                </div>
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 40px)",
                  fontWeight: 900,
                  color: text,
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                Cadex Pre-Audit Report
              </h1>
              <p style={{ fontSize: 15, color: muted, marginBottom: 16 }}>
                Prepared for{" "}
                <strong style={{ color: text }}>{page1.name}</strong> &middot;{" "}
                <strong style={{ color: text }}>{page1.company}</strong> &middot;{" "}
                {formatDate(new Date())}
              </p>
              <hr
                style={{
                  border: "none",
                  borderTop: `1px solid ${border}`,
                  marginBottom: 0,
                }}
              />
            </div>

            {/* Section 1: Executive Summary */}
            <ReportSection
              number="01"
              title="Executive Summary"
              cardBg={cardBg}
              border={border}
              text={text}
              muted={muted}
            >
              <p style={{ fontSize: 15, color: text, lineHeight: 1.8 }}>
                {page1.company} is a{" "}
                <strong>{page1.companySize}-person</strong>{" "}
                {page1.industry} organization with a clear opportunity to
                reduce operational friction through targeted AI automation.{" "}
                {page2.manualHours > 40
                  ? `Your team is carrying a significant manual workload. Our estimate puts this at ${formatCurrency(
                      annualCost
                    )}/year in recoverable labor costs. `
                  : `Based on your reported ${page2.manualHours} hours/week of manual work, there is an estimated ${formatCurrency(
                      annualCost
                    )}/year at risk in manual labor. `}
                {!page2.tools.some((t) =>
                  [
                    "HubSpot",
                    "Salesforce",
                    "Pipedrive",
                    "Zoho",
                  ].includes(t)
                )
                  ? "The absence of a centralized CRM creates blind spots in your pipeline and limits automation potential across sales and customer operations. "
                  : ""}
                {page2.painPoints.length >= 2
                  ? `Your top friction areas, ${page2.painPoints[0]} and ${page2.painPoints[1]}, represent your highest-ROI automation targets and are well-suited for a focused first engagement.`
                  : page2.painPoints.length === 1
                  ? `Your primary friction area, ${page2.painPoints[0]}, represents a clear automation target with strong ROI potential.`
                  : "Based on your profile, there are several process areas where targeted automation could drive significant efficiency gains."}
              </p>
            </ReportSection>

            {/* Section 2: Estimated Opportunity */}
            <ReportSection
              number="02"
              title="Estimated Opportunity"
              cardBg={cardBg}
              border={border}
              text={text}
              muted={muted}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                }}
              >
                {[
                  {
                    label: "Hours Recoverable / Week",
                    value: `${hoursRecoverable} hrs`,
                    sub: `of your ${page2.manualHours} hrs/week`,
                  },
                  {
                    label: "Annual Labor Cost at Risk",
                    value: formatCurrency(annualCost),
                    sub: "in manual labor annually",
                  },
                  {
                    label: "Estimated Year-1 ROI",
                    value: roiRange,
                    sub: "based on company profile",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    style={{
                      background: dark
                        ? "rgba(61,207,237,0.04)"
                        : "rgba(26,60,200,0.04)",
                      border: "1px solid rgba(61,207,237,0.2)",
                      borderRadius: 10,
                      padding: "20px 18px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: "#3DCFED",
                        marginBottom: 4,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {card.value}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: text,
                        marginBottom: 4,
                      }}
                    >
                      {card.label}
                    </div>
                    <div style={{ fontSize: 12, color: muted }}>
                      {card.sub}
                    </div>
                  </div>
                ))}
              </div>
            </ReportSection>

            {/* Section 3: Top 3 Automation Opportunities */}
            <ReportSection
              number="03"
              title="Top 3 Automation Opportunities"
              cardBg={cardBg}
              border={border}
              text={text}
              muted={muted}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {topOpportunities.map((pp, i) => {
                  const opp = PAIN_POINT_MAP[pp];
                  if (!opp) return null;
                  return (
                    <div
                      key={pp}
                      style={{
                        display: "flex",
                        gap: 16,
                        padding: "16px 20px",
                        background: dark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                        border: `1px solid ${border}`,
                        borderRadius: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #3DCFED, #1A3CC8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#fff",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: text,
                            marginBottom: 4,
                          }}
                        >
                          {opp.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: muted,
                            marginBottom: 6,
                            lineHeight: 1.6,
                          }}
                        >
                          {opp.description}
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: 99,
                            background: dark
                              ? "rgba(61,207,237,0.08)"
                              : "rgba(26,60,200,0.07)",
                            border: "1px solid rgba(61,207,237,0.25)",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#3DCFED",
                          }}
                        >
                          Est. {opp.hours}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ReportSection>

            {/* Section 4: Readiness Score */}
            <ReportSection
              number="04"
              title="AI Readiness Score"
              cardBg={cardBg}
              border={border}
              text={text}
              muted={muted}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 32,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 64,
                      fontWeight: 900,
                      lineHeight: 1,
                      color: readinessColor,
                      marginBottom: 6,
                    }}
                  >
                    {readinessScore}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: muted,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    out of 100
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "5px 14px",
                      borderRadius: 99,
                      background: `${readinessColor}18`,
                      border: `1px solid ${readinessColor}55`,
                      fontSize: 13,
                      fontWeight: 700,
                      color: readinessColor,
                      marginBottom: 10,
                    }}
                  >
                    {readinessLabel}
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: border,
                      borderRadius: 99,
                      overflow: "hidden",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: `${readinessScore}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, ${readinessColor}, ${readinessColor}cc)`,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>
                    {readinessScore <= 40
                      ? "There are foundational gaps to address before full automation deployment. A SPARK engagement will identify quick wins and build the groundwork."
                      : readinessScore <= 70
                      ? "You have a solid foundation for automation. With the right implementation partner, you can move quickly and see results within the first 30–60 days."
                      : "Your organization is well-positioned for advanced automation. You have the infrastructure, leadership buy-in, and data quality to execute at scale."}
                  </p>
                </div>
              </div>
            </ReportSection>

            {/* Section 5: Recommended Engagement */}
            <ReportSection
              number="05"
              title="Recommended Engagement"
              cardBg={cardBg}
              border={border}
              text={text}
              muted={muted}
            >
              <div
                style={{
                  padding: "24px 24px",
                  background: "linear-gradient(135deg, rgba(61,207,237,0.06), rgba(26,60,200,0.06))",
                  border: "1.5px solid rgba(61,207,237,0.3)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#3DCFED",
                        marginBottom: 4,
                      }}
                    >
                      Recommended Tier
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: text,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {engagement.tier}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, marginBottom: 16 }}>
                  {engagement.description}
                </p>
                <Link
                  href="/services"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#3DCFED",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(61,207,237,0.3)",
                    paddingBottom: 1,
                  }}
                >
                  View full engagement details &rarr;
                </Link>
              </div>
            </ReportSection>

            {/* Section 6: Suggested Next Steps */}
            <ReportSection
              number="06"
              title="Suggested Next Steps"
              cardBg={cardBg}
              border={border}
              text={text}
              muted={muted}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Book a free 30-minute discovery call with the Cadex team",
                  "We'll review this pre-audit report with you live",
                  "You'll receive a custom implementation roadmap within 48 hours",
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "2px solid #3DCFED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#3DCFED",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p
                      style={{
                        fontSize: 15,
                        color: text,
                        lineHeight: 1.6,
                        margin: 0,
                        paddingTop: 4,
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </ReportSection>

            {/* Report Footer / CTA */}
            <div
              style={{
                ...cardStyle,
                textAlign: "center",
                padding: "36px 32px",
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: text,
                  marginBottom: 8,
                }}
              >
                Ready to move forward?
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: muted,
                  marginBottom: 24,
                  maxWidth: 440,
                  margin: "0 auto 24px",
                }}
              >
                A 30-minute call is all it takes to turn this report into a
                concrete action plan.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 24,
                }}
              >
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <button style={{ ...gradientBtn, fontSize: 15 }}>
                    Book Your Free Discovery Call
                  </button>
                </Link>
                <Link href="/roi" style={{ textDecoration: "none" }}>
                  <button style={{ ...outlinedBtn, fontSize: 15 }}>
                    Calculate Your Full ROI
                  </button>
                </Link>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: muted,
                  lineHeight: 1.6,
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                This report was generated based on your self-reported inputs.
                Actual results may vary. Cadex Systems &middot;{" "}
                info@cadexhq.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ReadinessQuestion({
  label,
  options,
  value,
  error,
  onChange,
  dark,
  border,
  text,
}: {
  label: string;
  field: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
  dark: boolean;
  border: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: "16px 18px",
        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
        border: `1px solid ${error ? "#F87171" : border}`,
        borderRadius: 10,
      }}
    >
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: text,
          marginBottom: 10,
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                padding: "7px 18px",
                borderRadius: 8,
                border: `1.5px solid ${active ? "#3DCFED" : border}`,
                background: active
                  ? dark
                    ? "rgba(61,207,237,0.1)"
                    : "rgba(26,60,200,0.07)"
                  : "transparent",
                color: active ? "#3DCFED" : text,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function ReportSection({
  number,
  title,
  children,
  cardBg,
  border,
  text,
  muted,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  cardBg: string;
  border: string;
  text: string;
  muted: string;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#3DCFED",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {number}
        </span>
        <span
          style={{
            flex: 1,
            height: 1,
            background: border,
          }}
        />
        <h2
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: text,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <span
          style={{
            flex: 1,
            height: 1,
            background: border,
          }}
        />
      </div>
      <div
        style={{
          background: cardBg,
          border: `1px solid ${border}`,
          borderRadius: 12,
          padding: "24px 24px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
