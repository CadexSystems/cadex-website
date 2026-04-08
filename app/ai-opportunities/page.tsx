"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = "Easy" | "Medium" | "Complex";

interface UseCase {
  title: string;
  description: string;
  timeSaved: string;
  roi: string;
  difficulty: Difficulty;
}

interface IndustryData {
  useCases: UseCase[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INDUSTRIES: { id: string; label: string; emoji: string }[] = [
  { id: "healthcare", label: "Healthcare", emoji: "🏥" },
  { id: "real-estate", label: "Real Estate", emoji: "🏠" },
  { id: "legal", label: "Legal Services", emoji: "⚖️" },
  { id: "financial", label: "Financial Services", emoji: "💳" },
  { id: "logistics", label: "Logistics & Supply Chain", emoji: "🚚" },
  { id: "manufacturing", label: "Manufacturing", emoji: "🏭" },
  { id: "retail", label: "Retail & E-Commerce", emoji: "🛒" },
  { id: "professional", label: "Professional Services", emoji: "💼" },
  { id: "construction", label: "Construction", emoji: "🏗️" },
  { id: "technology", label: "Technology", emoji: "💻" },
];

const COMPANY_SIZES: { id: string; label: string; sublabel: string }[] = [
  { id: "1-10", label: "1–10 employees", sublabel: "Startup" },
  { id: "11-50", label: "11–50 employees", sublabel: "Small Business" },
  { id: "51-200", label: "51–200 employees", sublabel: "Mid-Market" },
  { id: "201-1000", label: "201–1000 employees", sublabel: "Growth" },
  { id: "1000+", label: "1000+ employees", sublabel: "Enterprise" },
];

const USE_CASES: Record<string, IndustryData> = {
  healthcare: {
    useCases: [
      {
        title: "Patient Scheduling Automation",
        description: "Auto-schedule, reschedule, and send reminders.",
        timeSaved: "8–12 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Medical Documentation",
        description: "AI drafts clinical notes from visit summaries.",
        timeSaved: "10–15 hrs/week",
        roi: "4–6x",
        difficulty: "Medium",
      },
      {
        title: "Insurance Pre-Authorization",
        description: "Automate prior auth submissions and follow-ups.",
        timeSaved: "6–10 hrs/week",
        roi: "3–4x",
        difficulty: "Medium",
      },
      {
        title: "Patient Follow-Up Sequences",
        description: "Automated post-visit check-ins and care plan reminders.",
        timeSaved: "5–8 hrs/week",
        roi: "2–4x",
        difficulty: "Easy",
      },
      {
        title: "Billing & Claims Processing",
        description: "AI reviews claims for errors before submission.",
        timeSaved: "8–12 hrs/week",
        roi: "5–8x",
        difficulty: "Complex",
      },
    ],
  },
  "real-estate": {
    useCases: [
      {
        title: "Lead Follow-Up Automation",
        description: "Instant response to new inquiries 24/7.",
        timeSaved: "10–15 hrs/week",
        roi: "5–10x",
        difficulty: "Easy",
      },
      {
        title: "Listing Description Generation",
        description: "AI writes MLS descriptions from property data.",
        timeSaved: "3–5 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Transaction Coordination",
        description: "Automate document requests, deadlines, and status updates.",
        timeSaved: "8–12 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
      {
        title: "Market Report Automation",
        description: "Auto-generate weekly market updates for clients.",
        timeSaved: "4–6 hrs/week",
        roi: "2–4x",
        difficulty: "Easy",
      },
      {
        title: "CRM Data Entry",
        description: "Auto-populate contact records from emails and calls.",
        timeSaved: "5–8 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
    ],
  },
  legal: {
    useCases: [
      {
        title: "Contract Review & Summarization",
        description: "AI reviews and flags key clauses.",
        timeSaved: "10–20 hrs/week",
        roi: "4–8x",
        difficulty: "Complex",
      },
      {
        title: "Client Intake Automation",
        description: "Automated intake forms, conflict checks, and onboarding.",
        timeSaved: "6–10 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
      {
        title: "Legal Research Assistance",
        description: "AI-assisted case law and precedent research.",
        timeSaved: "8–15 hrs/week",
        roi: "4–6x",
        difficulty: "Complex",
      },
      {
        title: "Document Drafting",
        description: "AI drafts standard agreements and correspondence.",
        timeSaved: "10–15 hrs/week",
        roi: "4–7x",
        difficulty: "Medium",
      },
      {
        title: "Billing & Time Tracking",
        description: "Auto-capture billable time from emails and documents.",
        timeSaved: "4–8 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
    ],
  },
  financial: {
    useCases: [
      {
        title: "Client Onboarding",
        description: "Automate KYC, document collection, and account setup.",
        timeSaved: "8–12 hrs/week",
        roi: "4–6x",
        difficulty: "Medium",
      },
      {
        title: "Report Generation",
        description: "Auto-generate portfolio and performance reports.",
        timeSaved: "6–10 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Compliance Monitoring",
        description: "AI flags transactions and activities for compliance review.",
        timeSaved: "10–15 hrs/week",
        roi: "5–10x",
        difficulty: "Complex",
      },
      {
        title: "Lead Nurture Sequences",
        description: "Personalized automated follow-up for prospects.",
        timeSaved: "5–8 hrs/week",
        roi: "4–8x",
        difficulty: "Easy",
      },
      {
        title: "Data Reconciliation",
        description: "Automate reconciliation between systems.",
        timeSaved: "8–12 hrs/week",
        roi: "4–7x",
        difficulty: "Complex",
      },
    ],
  },
  logistics: {
    useCases: [
      {
        title: "Order Processing Automation",
        description: "Auto-process orders, generate POs, and update inventory.",
        timeSaved: "15–25 hrs/week",
        roi: "5–8x",
        difficulty: "Medium",
      },
      {
        title: "Shipment Tracking & Notifications",
        description: "Proactive customer updates on delivery status.",
        timeSaved: "5–10 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Invoice & PO Matching",
        description: "AI matches purchase orders to invoices automatically.",
        timeSaved: "10–15 hrs/week",
        roi: "4–7x",
        difficulty: "Medium",
      },
      {
        title: "Demand Forecasting",
        description: "AI predicts inventory needs based on historical data.",
        timeSaved: "6–10 hrs/week",
        roi: "5–10x",
        difficulty: "Complex",
      },
      {
        title: "Carrier Communication",
        description: "Automate rate requests, booking, and documentation.",
        timeSaved: "8–12 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
    ],
  },
  manufacturing: {
    useCases: [
      {
        title: "Quality Control Reporting",
        description: "AI analyzes inspection data and flags anomalies.",
        timeSaved: "8–12 hrs/week",
        roi: "4–8x",
        difficulty: "Complex",
      },
      {
        title: "Maintenance Scheduling",
        description: "Predictive maintenance alerts based on equipment data.",
        timeSaved: "6–10 hrs/week",
        roi: "5–10x",
        difficulty: "Complex",
      },
      {
        title: "Production Reporting",
        description: "Auto-generate shift and production summary reports.",
        timeSaved: "5–8 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Supplier Communication",
        description: "Automate POs, confirmations, and follow-ups.",
        timeSaved: "6–10 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Inventory Management",
        description: "Auto-reorder triggers based on inventory thresholds.",
        timeSaved: "8–12 hrs/week",
        roi: "4–7x",
        difficulty: "Medium",
      },
    ],
  },
  retail: {
    useCases: [
      {
        title: "Customer Support Automation",
        description: "AI handles returns, order status, and FAQs.",
        timeSaved: "10–20 hrs/week",
        roi: "4–8x",
        difficulty: "Easy",
      },
      {
        title: "Product Description Generation",
        description: "AI writes and optimizes product listings.",
        timeSaved: "5–10 hrs/week",
        roi: "3–6x",
        difficulty: "Easy",
      },
      {
        title: "Inventory & Reorder Automation",
        description: "Auto-trigger reorders at threshold levels.",
        timeSaved: "6–10 hrs/week",
        roi: "4–7x",
        difficulty: "Medium",
      },
      {
        title: "Abandoned Cart Recovery",
        description: "Automated personalized recovery sequences.",
        timeSaved: "3–5 hrs/week",
        roi: "5–10x",
        difficulty: "Easy",
      },
      {
        title: "Review & Feedback Management",
        description: "Auto-respond to reviews and flag issues.",
        timeSaved: "4–6 hrs/week",
        roi: "2–4x",
        difficulty: "Easy",
      },
    ],
  },
  professional: {
    useCases: [
      {
        title: "Proposal Generation",
        description: "AI drafts customized proposals from templates and client data.",
        timeSaved: "8–12 hrs/week",
        roi: "4–7x",
        difficulty: "Medium",
      },
      {
        title: "Client Onboarding",
        description: "Automated welcome, document collection, and kickoff scheduling.",
        timeSaved: "5–8 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Project Status Reporting",
        description: "Auto-generate weekly status reports for clients.",
        timeSaved: "4–6 hrs/week",
        roi: "2–4x",
        difficulty: "Easy",
      },
      {
        title: "Lead Follow-Up",
        description: "Automated nurture sequences for prospects.",
        timeSaved: "6–10 hrs/week",
        roi: "4–8x",
        difficulty: "Easy",
      },
      {
        title: "Time & Billing Automation",
        description: "Auto-populate timesheets from calendar and email.",
        timeSaved: "4–8 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
    ],
  },
  construction: {
    useCases: [
      {
        title: "Bid & Estimate Generation",
        description: "AI assists in generating project estimates.",
        timeSaved: "8–15 hrs/week",
        roi: "4–7x",
        difficulty: "Medium",
      },
      {
        title: "Subcontractor Communication",
        description: "Automate RFIs, change orders, and schedule updates.",
        timeSaved: "8–12 hrs/week",
        roi: "3–5x",
        difficulty: "Medium",
      },
      {
        title: "Safety & Compliance Reporting",
        description: "AI compiles daily safety logs and incident reports.",
        timeSaved: "5–8 hrs/week",
        roi: "3–6x",
        difficulty: "Easy",
      },
      {
        title: "Document Management",
        description: "Auto-organize and version-control project documents.",
        timeSaved: "6–10 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
      {
        title: "Invoice & Payment Tracking",
        description: "Automate payment milestones and reminders.",
        timeSaved: "5–8 hrs/week",
        roi: "3–5x",
        difficulty: "Easy",
      },
    ],
  },
  technology: {
    useCases: [
      {
        title: "Customer Onboarding",
        description: "Automated sequences for trial-to-paid conversion.",
        timeSaved: "6–10 hrs/week",
        roi: "5–10x",
        difficulty: "Medium",
      },
      {
        title: "Support Ticket Triage",
        description: "AI categorizes and routes tickets automatically.",
        timeSaved: "8–12 hrs/week",
        roi: "4–7x",
        difficulty: "Easy",
      },
      {
        title: "Release Notes & Documentation",
        description: "AI drafts release notes and internal docs.",
        timeSaved: "4–8 hrs/week",
        roi: "2–4x",
        difficulty: "Easy",
      },
      {
        title: "Lead Scoring & Routing",
        description: "AI scores inbound leads and routes to the right rep.",
        timeSaved: "5–8 hrs/week",
        roi: "5–10x",
        difficulty: "Medium",
      },
      {
        title: "Churn Prediction",
        description: "AI flags at-risk accounts for proactive outreach.",
        timeSaved: "6–10 hrs/week",
        roi: "5–15x",
        difficulty: "Complex",
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseLow(range: string): number {
  const match = range.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseHigh(range: string): number {
  const matches = range.match(/(\d+)/g);
  return matches ? parseInt(matches[matches.length - 1], 10) : 0;
}

function totalHoursRange(useCases: UseCase[]): string {
  const low = useCases.reduce((sum, uc) => sum + parseLow(uc.timeSaved), 0);
  const high = useCases.reduce((sum, uc) => sum + parseHigh(uc.timeSaved), 0);
  return `${low}–${high}`;
}

function difficultyColor(difficulty: Difficulty): string {
  if (difficulty === "Easy") return "#22C55E";
  if (difficulty === "Medium") return "#F59E0B";
  return "#EF4444";
}

// ─── Component ────────────────────────────────────────────────────────────────

type Step = "industry" | "size" | "results";

export default function AIOpportunitiesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState<Step>("industry");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const bg = isDark ? "#0B0F1A" : "#F9FAFB";
  const cardBg = isDark ? "#0F1623" : "#FFFFFF";
  const border = isDark ? "#1E2D45" : "#E5E7EB";
  const textPrimary = isDark ? "#F9FAFB" : "#111827";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";

  const goTo = (next: Step, dir = 1) => {
    setDirection(dir);
    setStep(next);
  };

  const handleIndustrySelect = (id: string) => {
    setSelectedIndustry(id);
    goTo("size", 1);
  };

  const handleSizeSelect = (id: string) => {
    setSelectedSize(id);
    goTo("results", 1);
  };

  const industryData = selectedIndustry ? USE_CASES[selectedIndustry] : null;
  const industryInfo = INDUSTRIES.find((i) => i.id === selectedIndustry);
  const sizeInfo = COMPANY_SIZES.find((s) => s.id === selectedSize);
  const totalHrs = industryData ? totalHoursRange(industryData.useCases) : "";

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
      {/* Intro header — always visible */}
      <div style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center", marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "9999px",
            padding: "0.375rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            marginBottom: "1.25rem",
            backgroundColor: isDark ? "rgba(79,224,255,0.08)" : "rgba(30,143,225,0.06)",
            color: "#4FE0FF",
            border: "1px solid rgba(79,224,255,0.2)",
          }}
        >
          2-Minute Assessment
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: textPrimary,
            marginBottom: "0.75rem",
            lineHeight: 1.2,
          }}
        >
          Find Your Top AI Opportunities
        </h1>
        <p style={{ fontSize: "1.0625rem", color: textMuted, lineHeight: 1.65 }}>
          Select your industry and company size to instantly see the top 5 AI use cases with real ROI benchmarks, tailored to your business.
        </p>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* ── Step 1: Industry ───────────────────────────────────────────── */}
        {step === "industry" && (
          <motion.div
            key="industry"
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
            style={{ maxWidth: "42rem", margin: "0 auto" }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: textMuted,
                marginBottom: "1rem",
              }}
            >
              Step 1 of 2: Pick your industry
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem",
              }}
            >
              {INDUSTRIES.map((industry) => {
                const isSelected = selectedIndustry === industry.id;
                return (
                  <motion.button
                    key={industry.id}
                    onClick={() => handleIndustrySelect(industry.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "1rem 1.125rem",
                      borderRadius: "0.875rem",
                      border: `1.5px solid ${isSelected ? "#4FE0FF" : border}`,
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(79,224,255,0.08)"
                          : "rgba(30,143,225,0.06)"
                        : cardBg,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                  >
                    <span style={{ fontSize: "1.625rem", lineHeight: 1, flexShrink: 0 }}>
                      {industry.emoji}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? (isDark ? "#4FE0FF" : "#0A3D7C") : textPrimary,
                        lineHeight: 1.3,
                      }}
                    >
                      {industry.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Company Size ───────────────────────────────────────── */}
        {step === "size" && (
          <motion.div
            key="size"
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
            style={{ maxWidth: "32rem", margin: "0 auto" }}
          >
            {/* Back */}
            <button
              onClick={() => goTo("industry", -1)}
              style={{
                fontSize: "0.875rem",
                color: textMuted,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0 1.25rem 0",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              ← Back
            </button>

            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: textMuted,
                marginBottom: "0.5rem",
              }}
            >
              Step 2 of 2: Company size
            </p>

            {industryInfo && (
              <p style={{ fontSize: "0.9375rem", color: textMuted, marginBottom: "1.5rem" }}>
                Showing results for{" "}
                <span style={{ color: textPrimary, fontWeight: 600 }}>
                  {industryInfo.emoji} {industryInfo.label}
                </span>
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {COMPANY_SIZES.map((size) => {
                const isSelected = selectedSize === size.id;
                return (
                  <motion.button
                    key={size.id}
                    onClick={() => handleSizeSelect(size.id)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "0.875rem",
                      border: `1.5px solid ${isSelected ? "#4FE0FF" : border}`,
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(79,224,255,0.08)"
                          : "rgba(30,143,225,0.06)"
                        : cardBg,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        color: isSelected ? (isDark ? "#4FE0FF" : "#0A3D7C") : textPrimary,
                      }}
                    >
                      {size.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: isSelected ? (isDark ? "#4FE0FF" : "#1E8FE1") : textMuted,
                        backgroundColor: isSelected
                          ? isDark
                            ? "rgba(79,224,255,0.12)"
                            : "rgba(30,143,225,0.08)"
                          : isDark
                          ? "#1E2D45"
                          : "#F3F4F6",
                        padding: "0.25rem 0.625rem",
                        borderRadius: "9999px",
                      }}
                    >
                      {size.sublabel}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Results ────────────────────────────────────────────── */}
        {step === "results" && industryData && industryInfo && sizeInfo && (
          <motion.div
            key="results"
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
            style={{ maxWidth: "48rem", margin: "0 auto" }}
          >
            {/* Back */}
            <button
              onClick={() => goTo("size", -1)}
              style={{
                fontSize: "0.875rem",
                color: textMuted,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0 1.5rem 0",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              ← Back
            </button>

            {/* Results header */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h2
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  fontWeight: 700,
                  color: textPrimary,
                  marginBottom: "0.5rem",
                  lineHeight: 1.25,
                }}
              >
                Top 5 AI Opportunities for {industryInfo.emoji} {industryInfo.label}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: textMuted }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    backgroundColor: isDark ? "#1E2D45" : "#F3F4F6",
                    borderRadius: "9999px",
                    padding: "0.2rem 0.625rem",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: textMuted,
                    marginRight: "0.5rem",
                  }}
                >
                  {sizeInfo.label} · {sizeInfo.sublabel}
                </span>
                Estimated{" "}
                <span style={{ color: "#4FE0FF", fontWeight: 600 }}>{totalHrs} hrs/week</span>{" "}
                recoverable
              </p>
            </div>

            {/* Use case cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
              {industryData.useCases.map((uc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${border}`,
                    borderRadius: "1rem",
                    padding: "1.25rem 1.375rem",
                    display: "flex",
                    gap: "1.125rem",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Number */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "9999px",
                      background: "linear-gradient(135deg, #4FE0FF, #1E8FE1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: "#000",
                      marginTop: "0.125rem",
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: textPrimary,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {uc.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: textMuted,
                        lineHeight: 1.55,
                        marginBottom: "0.875rem",
                      }}
                    >
                      {uc.description}
                    </p>

                    {/* Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {/* Time saved */}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: isDark ? "#CBD5E1" : "#374151",
                          backgroundColor: isDark ? "#1E2D45" : "#F3F4F6",
                          borderRadius: "9999px",
                          padding: "0.25rem 0.625rem",
                        }}
                      >
                        ⏱ {uc.timeSaved}
                      </span>

                      {/* ROI */}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#4FE0FF",
                          backgroundColor: isDark
                            ? "rgba(79,224,255,0.1)"
                            : "rgba(30,143,225,0.07)",
                          border: "1px solid rgba(79,224,255,0.25)",
                          borderRadius: "9999px",
                          padding: "0.25rem 0.625rem",
                        }}
                      >
                        📈 ROI {uc.roi}
                      </span>

                      {/* Difficulty */}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: difficultyColor(uc.difficulty),
                          backgroundColor: `${difficultyColor(uc.difficulty)}18`,
                          border: `1px solid ${difficultyColor(uc.difficulty)}40`,
                          borderRadius: "9999px",
                          padding: "0.25rem 0.625rem",
                        }}
                      >
                        {uc.difficulty}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                backgroundColor: cardBg,
                border: `1.5px solid ${border}`,
                borderRadius: "1.25rem",
                padding: "1.75rem",
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "1.75rem",
                  }}
                >
                  🎯
                </span>
              </div>
              <h3
                style={{
                  fontSize: "1.1875rem",
                  fontWeight: 700,
                  color: textPrimary,
                  marginBottom: "0.5rem",
                }}
              >
                Want a custom analysis for your business?
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: textMuted,
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                  maxWidth: "28rem",
                  margin: "0 auto 1.5rem",
                }}
              >
                Our AI Audit goes deeper, mapping your specific workflows, tech stack, and team to surface the highest-impact opportunities with a clear implementation roadmap.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  maxWidth: "22rem",
                  margin: "0 auto",
                }}
              >
                <a
                  href="/ai-audit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.9rem 1.5rem",
                    borderRadius: "0.875rem",
                    background: "linear-gradient(135deg, #4FE0FF, #1E8FE1)",
                    color: "#000",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  Take the Full AI Audit →
                </a>
                <a
                  href="/contact"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.875rem 1.5rem",
                    borderRadius: "0.875rem",
                    backgroundColor: cardBg,
                    border: `1.5px solid ${border}`,
                    color: textPrimary,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#4FE0FF")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.borderColor = border)
                  }
                >
                  Talk to an Expert
                </a>
              </div>
            </motion.div>

            {/* Start over */}
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={() => {
                  setSelectedIndustry(null);
                  setSelectedSize(null);
                  goTo("industry", -1);
                }}
                style={{
                  fontSize: "0.875rem",
                  color: textMuted,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
