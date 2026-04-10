"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Grade = "A" | "B" | "C" | "D";

interface Tool {
  id: string;
  name: string;
  grade: Grade;
  summary: string;
  features: string[];
}

interface Category {
  id: string;
  title: string;
  icon: string;
  tools: Tool[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "crm",
    title: "CRM & Sales",
    icon: "💼",
    tools: [
      {
        id: "hubspot",
        name: "HubSpot",
        grade: "A",
        summary: "Native AI, excellent API, automation-ready.",
        features: ["AI email writer", "Predictive lead scoring", "Workflow automation"],
      },
      {
        id: "salesforce",
        name: "Salesforce",
        grade: "A",
        summary: "Enterprise AI (Einstein), best-in-class API.",
        features: ["Einstein AI", "Flow automation", "Extensive integrations"],
      },
      {
        id: "pipedrive",
        name: "Pipedrive",
        grade: "B",
        summary: "Good API, limited native AI.",
        features: ["Smart contact data", "Email sync", "Zapier-friendly"],
      },
      {
        id: "zoho-crm",
        name: "Zoho CRM",
        grade: "B",
        summary: "Native AI (Zia), solid API.",
        features: ["Zia AI assistant", "Workflow rules", "Good integration support"],
      },
      {
        id: "monday-crm",
        name: "Monday.com CRM",
        grade: "B",
        summary: "Good automation, improving AI.",
        features: ["Automations", "Integrations", "AI column coming"],
      },
      {
        id: "no-crm",
        name: "No CRM",
        grade: "D",
        summary: "Major gap. Manual contact management limits all automation potential.",
        features: [],
      },
    ],
  },
  {
    id: "accounting",
    title: "Accounting & Finance",
    icon: "💰",
    tools: [
      {
        id: "quickbooks",
        name: "QuickBooks Online",
        grade: "B",
        summary: "Limited AI, strong integrations.",
        features: ["Auto-categorization", "Bank sync", "API access"],
      },
      {
        id: "xero",
        name: "Xero",
        grade: "B",
        summary: "Good API, growing AI features.",
        features: ["Bank reconciliation automation", "Hubdoc integration", "API-friendly"],
      },
      {
        id: "netsuite",
        name: "NetSuite",
        grade: "A",
        summary: "Enterprise-grade, strong API.",
        features: ["Workflow automation", "Advanced reporting", "AI roadmap active"],
      },
      {
        id: "freshbooks",
        name: "FreshBooks",
        grade: "C",
        summary: "Limited API, basic automation.",
        features: ["Invoice automation", "Basic reporting", "Limited integrations"],
      },
      {
        id: "wave",
        name: "Wave",
        grade: "D",
        summary: "Very limited API and automation.",
        features: ["Basic bookkeeping only", "Minimal integration options"],
      },
      {
        id: "spreadsheets-finance",
        name: "Spreadsheets only",
        grade: "D",
        summary: "Critical gap. Zero automation potential for financial processes.",
        features: [],
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Collaboration",
    icon: "💬",
    tools: [
      {
        id: "slack",
        name: "Slack",
        grade: "A",
        summary: "Excellent API, AI features, automation hub.",
        features: ["Slack AI", "Workflow builder", "2,400+ integrations"],
      },
      {
        id: "ms-teams",
        name: "Microsoft Teams",
        grade: "A",
        summary: "Deep Microsoft 365 AI integration.",
        features: ["Copilot AI", "Power Automate native", "SharePoint integration"],
      },
      {
        id: "gmail",
        name: "Gmail / Google Workspace",
        grade: "A",
        summary: "Strong API, Gemini AI integration.",
        features: ["Gemini AI drafting", "Apps Script", "Extensive integrations"],
      },
      {
        id: "outlook",
        name: "Outlook / Microsoft 365",
        grade: "A",
        summary: "Copilot AI, Power Automate.",
        features: ["Copilot drafting", "Teams integration", "Power Automate"],
      },
      {
        id: "zoom",
        name: "Zoom",
        grade: "B",
        summary: "Good API, AI companion available.",
        features: ["Zoom AI Companion", "Meeting summaries", "Webhook support"],
      },
    ],
  },
  {
    id: "project",
    title: "Project Management",
    icon: "📋",
    tools: [
      {
        id: "asana",
        name: "Asana",
        grade: "B",
        summary: "Good API, AI features launching.",
        features: ["Asana Intelligence AI", "Automation rules", "API access"],
      },
      {
        id: "clickup",
        name: "ClickUp",
        grade: "A",
        summary: "Strong automation, AI built-in.",
        features: ["ClickUp AI", "Automation recipes", "Extensive API"],
      },
      {
        id: "jira",
        name: "Jira",
        grade: "B",
        summary: "Strong API, Atlassian Intelligence.",
        features: ["Atlassian Intelligence AI", "Automation rules", "Great for dev teams"],
      },
      {
        id: "trello",
        name: "Trello",
        grade: "C",
        summary: "Limited API, basic automation (Power-Ups).",
        features: ["Butler automation", "Power-Ups", "Limited native AI"],
      },
      {
        id: "notion",
        name: "Notion",
        grade: "B",
        summary: "AI built-in, improving API.",
        features: ["Notion AI", "Database automation", "API improving"],
      },
    ],
  },
  {
    id: "hr",
    title: "HR & People Ops",
    icon: "👥",
    tools: [
      {
        id: "bamboohr",
        name: "BambooHR",
        grade: "B",
        summary: "Good API, workflow automation.",
        features: ["Onboarding workflows", "E-signatures", "API access"],
      },
      {
        id: "workday",
        name: "Workday",
        grade: "A",
        summary: "Enterprise AI, full automation suite.",
        features: ["Workday AI", "Extensive workflows", "Enterprise integrations"],
      },
      {
        id: "gusto",
        name: "Gusto",
        grade: "B",
        summary: "Limited API, basic automations.",
        features: ["Payroll automation", "Onboarding flows", "Zapier support"],
      },
      {
        id: "adp",
        name: "ADP",
        grade: "B",
        summary: "Large ecosystem, improving AI.",
        features: ["ADP Assist AI", "Payroll automation", "API access"],
      },
      {
        id: "rippling",
        name: "Rippling",
        grade: "A",
        summary: "Strong API, automation-first design.",
        features: ["Workflow automation", "IT + HR combined", "Excellent API"],
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: "📣",
    tools: [
      {
        id: "mailchimp",
        name: "Mailchimp",
        grade: "B",
        summary: "AI features, good API.",
        features: ["AI content generator", "Journey automation", "API access"],
      },
      {
        id: "activecampaign",
        name: "ActiveCampaign",
        grade: "A",
        summary: "Automation-first, strong AI.",
        features: ["Predictive sending AI", "Visual automation builder", "CRM included"],
      },
      {
        id: "klaviyo",
        name: "Klaviyo",
        grade: "A",
        summary: "E-commerce AI, excellent automation.",
        features: ["Predictive analytics", "Flow automation", "Excellent API"],
      },
      {
        id: "hubspot-marketing",
        name: "HubSpot Marketing",
        grade: "A",
        summary: "Native AI, full suite.",
        features: ["AI content tools", "Campaign automation", "Full API"],
      },
      {
        id: "marketo",
        name: "Marketo",
        grade: "A",
        summary: "Enterprise automation, AI features.",
        features: ["Predictive content", "Engagement programs", "Salesforce native"],
      },
    ],
  },
  {
    id: "support",
    title: "Customer Support",
    icon: "🎧",
    tools: [
      {
        id: "zendesk",
        name: "Zendesk",
        grade: "A",
        summary: "AI agents, strong automation.",
        features: ["Zendesk AI agents", "Macro automation", "Ticket routing AI"],
      },
      {
        id: "freshdesk",
        name: "Freshdesk",
        grade: "B",
        summary: "Growing AI, good API.",
        features: ["Freddy AI", "Automation rules", "API access"],
      },
      {
        id: "intercom",
        name: "Intercom",
        grade: "A",
        summary: "AI-first support platform.",
        features: ["Fin AI agent", "Workflows", "Proactive messaging AI"],
      },
      {
        id: "hubspot-service",
        name: "HubSpot Service",
        grade: "B",
        summary: "Good automation, AI improving.",
        features: ["Ticket automation", "Knowledge base", "AI drafting"],
      },
      {
        id: "email-only",
        name: "Email only",
        grade: "D",
        summary: "Critical gap. No ticketing = dropped issues and no reporting.",
        features: [],
      },
    ],
  },
  {
    id: "data",
    title: "Data & Reporting",
    icon: "📊",
    tools: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        grade: "B",
        summary: "Good data, limited automation.",
        features: ["AI insights", "API access", "Looker integration"],
      },
      {
        id: "tableau",
        name: "Tableau",
        grade: "A",
        summary: "Strong AI, excellent API.",
        features: ["Tableau AI", "Data storytelling", "Salesforce Einstein integration"],
      },
      {
        id: "power-bi",
        name: "Power BI",
        grade: "A",
        summary: "Microsoft AI integration.",
        features: ["Copilot AI", "Automated refresh", "Azure integration"],
      },
      {
        id: "looker",
        name: "Looker",
        grade: "A",
        summary: "Strong API, enterprise AI.",
        features: ["Looker AI", "Embedded analytics", "BigQuery native"],
      },
      {
        id: "spreadsheets-reporting",
        name: "Spreadsheets for reporting",
        grade: "D",
        summary: "Major bottleneck. Manual reporting kills analyst time.",
        features: [],
      },
    ],
  },
  {
    id: "storage",
    title: "File Storage & Docs",
    icon: "📁",
    tools: [
      {
        id: "google-drive",
        name: "Google Drive / Docs",
        grade: "A",
        summary: "Gemini AI, excellent API.",
        features: ["Gemini AI drafting", "Apps Script automation", "Drive API"],
      },
      {
        id: "sharepoint",
        name: "SharePoint / OneDrive",
        grade: "A",
        summary: "Copilot AI, Power Automate.",
        features: ["Copilot in Office", "Power Automate triggers", "Deep MS integration"],
      },
      {
        id: "dropbox",
        name: "Dropbox",
        grade: "C",
        summary: "Limited AI, basic API.",
        features: ["Dropbox Dash AI search", "API access", "Limited workflow automation"],
      },
      {
        id: "box",
        name: "Box",
        grade: "B",
        summary: "Good API, AI features.",
        features: ["Box AI", "Workflow automation", "Strong compliance features"],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const GRADE_VALUES: Record<Grade, number> = { A: 100, B: 75, C: 40, D: 10 };

const GRADE_COLORS: Record<Grade, string> = {
  A: "#22C55E",
  B: "#3DCFED",
  C: "#F59E0B",
  D: "#EF4444",
};

const GRADE_LABELS: Record<Grade, string> = {
  A: "AI-Ready",
  B: "Integration-Ready",
  C: "Limited",
  D: "Bottleneck",
};

function calcScore(selectedIds: Set<string>): number {
  const selected: Tool[] = [];
  for (const cat of CATEGORIES) {
    for (const tool of cat.tools) {
      if (selectedIds.has(tool.id)) selected.push(tool);
    }
  }
  if (selected.length === 0) return 0;
  const total = selected.reduce((sum, t) => sum + GRADE_VALUES[t.grade], 0);
  return Math.round(total / selected.length);
}

function scoreBand(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "AI-Ready Stack", color: "#22C55E" };
  if (score >= 60) return { label: "Strong Foundation", color: "#3DCFED" };
  if (score >= 40) return { label: "Needs Optimization", color: "#F59E0B" };
  return { label: "Significant Gaps", color: "#EF4444" };
}

// ─── Animated Score Counter ───────────────────────────────────────────────────

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1200;
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target]);

  return <>{display}</>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TechStackPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Theme tokens
  const bg = isDark ? "#0B0F1A" : "#EAF4FF";
  const cardBg = isDark ? "#0F1623" : "#FFFFFF";
  const border = isDark ? "#1E2D45" : "#E5E7EB";
  const textPrimary = isDark ? "#EAF4FF" : "#111827";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";
  const trackBg = isDark ? "#1E2D45" : "#E5E7EB";

  const [step, setStep] = useState<"select" | "results">("select");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleTool = (toolId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(toolId)) {
        next.delete(toolId);
      } else {
        next.add(toolId);
      }
      return next;
    });
  };

  const toggleCollapse = (catId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) {
        next.delete(catId);
      } else {
        next.add(catId);
      }
      return next;
    });
  };

  const canAnalyze = selected.size >= 3;
  const score = calcScore(selected);
  const band = scoreBand(score);

  // Gather selected tools
  const selectedTools: (Tool & { categoryTitle: string })[] = [];
  for (const cat of CATEGORIES) {
    for (const tool of cat.tools) {
      if (selected.has(tool.id)) {
        selectedTools.push({ ...tool, categoryTitle: cat.title });
      }
    }
  }

  const strengthTools = selectedTools.filter((t) => t.grade === "A" || t.grade === "B");
  const quickWinTools = selectedTools.filter(
    (t) => t.grade === "B" && t.features.length > 0
  );
  const gapTools = selectedTools.filter((t) => t.grade === "C" || t.grade === "D");

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
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>

        <AnimatePresence mode="wait">

          {/* ── Step 1: Select ─────────────────────────────────────────── */}
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
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
                    marginBottom: "1.25rem",
                    backgroundColor: isDark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)",
                    color: "#3DCFED",
                    border: "1px solid rgba(61,207,237,0.2)",
                  }}
                >
                  Free Tool · No signup required
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
                  Tech Stack Analyzer
                </h1>
                <p
                  style={{
                    color: textMuted,
                    fontSize: "1.0625rem",
                    lineHeight: 1.65,
                    maxWidth: "38rem",
                    margin: "0 auto",
                  }}
                >
                  Select every tool your team currently uses. We&apos;ll grade your stack, reveal hidden AI features, and show you exactly where to automate first.
                </p>
              </div>

              {/* Counter + CTA strip */}
              <div
                style={{
                  position: "sticky",
                  top: "80px",
                  zIndex: 10,
                  backgroundColor: isDark ? "rgba(11,15,26,0.92)" : "rgba(249,250,251,0.92)",
                  backdropFilter: "blur(12px)",
                  borderBottom: `1px solid ${border}`,
                  padding: "0.875rem 0",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <p style={{ fontSize: "0.875rem", color: textMuted, margin: 0 }}>
                  <span style={{ fontWeight: 600, color: textPrimary }}>{selected.size}</span>{" "}
                  {selected.size === 1 ? "tool" : "tools"} selected
                  {selected.size < 3 && (
                    <span style={{ color: textMuted }}>
                      {" "}(select {3 - selected.size} more to analyze)
                    </span>
                  )}
                </p>
                <motion.button
                  onClick={() => setStep("results")}
                  disabled={!canAnalyze}
                  whileHover={canAnalyze ? { scale: 1.03 } : {}}
                  whileTap={canAnalyze ? { scale: 0.97 } : {}}
                  style={{
                    borderRadius: "0.75rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#fff",
                    background: canAnalyze
                      ? "linear-gradient(135deg, #3DCFED, #1A3CC8)"
                      : isDark ? "#1E2D45" : "#E5E7EB",
                    border: "none",
                    cursor: canAnalyze ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Analyze My Stack →
                </motion.button>
              </div>

              {/* Categories */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {CATEGORIES.map((cat) => {
                  const isCollapsed = collapsed.has(cat.id);
                  const selectedInCat = cat.tools.filter((t) => selected.has(t.id)).length;

                  return (
                    <div
                      key={cat.id}
                      style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${border}`,
                        borderRadius: "1rem",
                        overflow: "hidden",
                      }}
                    >
                      {/* Category header */}
                      <button
                        onClick={() => toggleCollapse(cat.id)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem 1.25rem",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          gap: "0.75rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <span style={{ fontSize: "1.25rem" }}>{cat.icon}</span>
                          <span
                            style={{
                              fontSize: "0.9375rem",
                              fontWeight: 600,
                              color: textPrimary,
                            }}
                          >
                            {cat.title}
                          </span>
                          {selectedInCat > 0 && (
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 600,
                                padding: "0.15rem 0.5rem",
                                borderRadius: "9999px",
                                backgroundColor: "rgba(61,207,237,0.12)",
                                color: "#3DCFED",
                              }}
                            >
                              {selectedInCat} selected
                            </span>
                          )}
                        </div>
                        <motion.span
                          animate={{ rotate: isCollapsed ? -90 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            fontSize: "0.75rem",
                            color: textMuted,
                            display: "inline-block",
                          }}
                        >
                          ▼
                        </motion.span>
                      </button>

                      {/* Tools grid */}
                      <AnimatePresence initial={false}>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                padding: "0 1.25rem 1.25rem",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                              }}
                            >
                              {cat.tools.map((tool) => {
                                const isSelected = selected.has(tool.id);
                                const gradeColor = GRADE_COLORS[tool.grade];
                                return (
                                  <motion.button
                                    key={tool.id}
                                    onClick={() => toggleTool(tool.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.5rem",
                                      padding: "0.5rem 0.875rem",
                                      borderRadius: "0.75rem",
                                      fontSize: "0.8125rem",
                                      fontWeight: isSelected ? 600 : 400,
                                      cursor: "pointer",
                                      transition: "all 0.15s",
                                      backgroundColor: isSelected
                                        ? isDark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)"
                                        : isDark ? "rgba(30,45,69,0.4)" : "#EAF4FF",
                                      border: isSelected
                                        ? "1.5px solid #3DCFED"
                                        : `1.5px solid ${border}`,
                                      color: isSelected ? (isDark ? "#EAF4FF" : "#111827") : textMuted,
                                    }}
                                  >
                                    {/* Grade dot */}
                                    <span
                                      style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        backgroundColor: isSelected ? gradeColor : (isDark ? "#374151" : "#D1D5DB"),
                                        flexShrink: 0,
                                        transition: "background-color 0.15s",
                                      }}
                                    />
                                    {tool.name}
                                    {/* Grade badge */}
                                    <span
                                      style={{
                                        fontSize: "0.625rem",
                                        fontWeight: 700,
                                        padding: "0.1rem 0.3rem",
                                        borderRadius: "4px",
                                        backgroundColor: isSelected ? `${gradeColor}22` : (isDark ? "#1E2D45" : "#F3F4F6"),
                                        color: isSelected ? gradeColor : textMuted,
                                        letterSpacing: "0.03em",
                                        transition: "all 0.15s",
                                      }}
                                    >
                                      {tool.grade}
                                    </span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <motion.button
                  onClick={() => setStep("results")}
                  disabled={!canAnalyze}
                  whileHover={canAnalyze ? { scale: 1.02 } : {}}
                  whileTap={canAnalyze ? { scale: 0.97 } : {}}
                  style={{
                    width: "100%",
                    borderRadius: "1rem",
                    padding: "1rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: canAnalyze ? "#fff" : textMuted,
                    background: canAnalyze
                      ? "linear-gradient(135deg, #3DCFED, #1A3CC8)"
                      : isDark ? "#0F1623" : "#F3F4F6",
                    border: canAnalyze ? "none" : `1.5px solid ${border}`,
                    cursor: canAnalyze ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                  }}
                >
                  {canAnalyze
                    ? `Analyze My Stack (${selected.size} tools) →`
                    : `Select at least 3 tools to continue`}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Results ────────────────────────────────────────── */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
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
                    marginBottom: "1.25rem",
                    backgroundColor: isDark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)",
                    color: "#3DCFED",
                    border: "1px solid rgba(61,207,237,0.2)",
                  }}
                >
                  Your Stack Analysis
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: textPrimary,
                    marginBottom: "0.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  Here&apos;s How Your Stack Scores
                </h2>
                <p style={{ color: textMuted, fontSize: "0.9375rem" }}>
                  Based on {selectedTools.length} tools across your stack
                </p>
              </div>

              {/* Score hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{
                  backgroundColor: cardBg,
                  border: `1.5px solid ${band.color}40`,
                  borderRadius: "1.5rem",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "-60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "240px",
                    height: "120px",
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse, ${band.color}18 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: textMuted,
                    marginBottom: "0.5rem",
                  }}
                >
                  AI Compatibility Score
                </p>

                <div
                  style={{
                    fontSize: "5rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: band.color,
                    marginBottom: "0.5rem",
                  }}
                >
                  <AnimatedScore target={score} />
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    borderRadius: "9999px",
                    padding: "0.375rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    backgroundColor: `${band.color}18`,
                    color: band.color,
                    marginBottom: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: band.color,
                    }}
                  />
                  {band.label}
                </div>

                {/* Score bar */}
                <div
                  style={{
                    maxWidth: "320px",
                    margin: "0 auto",
                    height: "8px",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    backgroundColor: trackBg,
                  }}
                >
                  <motion.div
                    style={{
                      height: "100%",
                      borderRadius: "9999px",
                      backgroundColor: band.color,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                  />
                </div>

                {/* Grade legend */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {(["A", "B", "C", "D"] as Grade[]).map((g) => {
                    const count = selectedTools.filter((t) => t.grade === g).length;
                    return (
                      <div
                        key={g}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          fontSize: "0.75rem",
                          color: count > 0 ? textPrimary : textMuted,
                          opacity: count > 0 ? 1 : 0.4,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "1.25rem",
                            height: "1.25rem",
                            borderRadius: "4px",
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            backgroundColor: `${GRADE_COLORS[g]}22`,
                            color: GRADE_COLORS[g],
                          }}
                        >
                          {g}
                        </span>
                        {count} {count === 1 ? "tool" : "tools"}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── Section 1: Strengths ──────────────────────────────── */}
              {strengthTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  style={{ marginBottom: "1.5rem" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "6px",
                        backgroundColor: "rgba(34,197,94,0.15)",
                        fontSize: "0.75rem",
                      }}
                    >
                      ✓
                    </span>
                    <h3
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "#22C55E",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: 0,
                      }}
                    >
                      Your Strengths
                    </h3>
                  </div>

                  <div
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${border}`,
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    {strengthTools.map((tool, i) => {
                      const gc = GRADE_COLORS[tool.grade];
                      return (
                        <div
                          key={tool.id}
                          style={{
                            padding: "1rem 1.25rem",
                            borderBottom:
                              i < strengthTools.length - 1 ? `1px solid ${border}` : "none",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.875rem",
                          }}
                        >
                          {/* Grade badge */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "8px",
                              fontSize: "0.8125rem",
                              fontWeight: 800,
                              backgroundColor: `${gc}18`,
                              color: gc,
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            {tool.grade}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.25rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: textPrimary,
                                }}
                              >
                                {tool.name}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.6875rem",
                                  padding: "0.1rem 0.4rem",
                                  borderRadius: "9999px",
                                  backgroundColor: `${gc}12`,
                                  color: gc,
                                  fontWeight: 500,
                                }}
                              >
                                {GRADE_LABELS[tool.grade]}
                              </span>
                            </div>
                            <p
                              style={{
                                fontSize: "0.8125rem",
                                color: textMuted,
                                margin: 0,
                                lineHeight: 1.5,
                              }}
                            >
                              {tool.summary}
                            </p>
                            {tool.features.length > 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "0.375rem",
                                  marginTop: "0.5rem",
                                }}
                              >
                                {tool.features.map((f) => (
                                  <span
                                    key={f}
                                    style={{
                                      fontSize: "0.6875rem",
                                      padding: "0.2rem 0.5rem",
                                      borderRadius: "9999px",
                                      backgroundColor: isDark ? "#1E2D45" : "#F3F4F6",
                                      color: textMuted,
                                    }}
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Section 2: Quick Wins ─────────────────────────────── */}
              {quickWinTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  style={{ marginBottom: "1.5rem" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "6px",
                        backgroundColor: "rgba(61,207,237,0.15)",
                        fontSize: "0.75rem",
                      }}
                    >
                      ⚡
                    </span>
                    <h3
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "#3DCFED",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: 0,
                      }}
                    >
                      Quick Wins: Unused AI Features
                    </h3>
                  </div>

                  <div
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${border}`,
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    {quickWinTools.map((tool, i) => (
                      <div
                        key={tool.id}
                        style={{
                          padding: "1rem 1.25rem",
                          borderBottom:
                            i < quickWinTools.length - 1 ? `1px solid ${border}` : "none",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.875rem",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "8px",
                            fontSize: "0.8125rem",
                            fontWeight: 800,
                            backgroundColor: "rgba(61,207,237,0.12)",
                            color: "#3DCFED",
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        >
                          B
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              color: textPrimary,
                              marginBottom: "0.25rem",
                            }}
                          >
                            {tool.name}
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                fontSize: "0.6875rem",
                                fontWeight: 500,
                                color: "#3DCFED",
                              }}
                            >
                              probably not using these yet
                            </span>
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.375rem",
                              marginTop: "0.375rem",
                            }}
                          >
                            {tool.features.map((f) => (
                              <span
                                key={f}
                                style={{
                                  fontSize: "0.6875rem",
                                  padding: "0.25rem 0.625rem",
                                  borderRadius: "9999px",
                                  backgroundColor: "rgba(61,207,237,0.08)",
                                  color: "#3DCFED",
                                  border: "1px solid rgba(61,207,237,0.2)",
                                  fontWeight: 500,
                                }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Section 3: Gaps ───────────────────────────────────── */}
              {gapTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  style={{ marginBottom: "1.5rem" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "6px",
                        backgroundColor: "rgba(239,68,68,0.12)",
                        fontSize: "0.75rem",
                      }}
                    >
                      ⚠
                    </span>
                    <h3
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "#EF4444",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: 0,
                      }}
                    >
                      Gaps to Address
                    </h3>
                  </div>

                  <div
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${border}`,
                      borderRadius: "1rem",
                      overflow: "hidden",
                    }}
                  >
                    {gapTools.map((tool, i) => {
                      const gc = GRADE_COLORS[tool.grade];
                      const rec =
                        tool.grade === "D"
                          ? "Replace or augment with an integration-ready alternative"
                          : "Add a middleware layer (Zapier, Make) to unlock integrations";
                      return (
                        <div
                          key={tool.id}
                          style={{
                            padding: "1rem 1.25rem",
                            borderBottom:
                              i < gapTools.length - 1 ? `1px solid ${border}` : "none",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.875rem",
                          }}
                        >
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "8px",
                              fontSize: "0.8125rem",
                              fontWeight: 800,
                              backgroundColor: `${gc}18`,
                              color: gc,
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            {tool.grade}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.25rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: textPrimary,
                                }}
                              >
                                {tool.name}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.6875rem",
                                  padding: "0.1rem 0.4rem",
                                  borderRadius: "9999px",
                                  backgroundColor: `${gc}12`,
                                  color: gc,
                                  fontWeight: 500,
                                }}
                              >
                                {GRADE_LABELS[tool.grade]}
                              </span>
                            </div>
                            <p
                              style={{
                                fontSize: "0.8125rem",
                                color: textMuted,
                                margin: "0 0 0.375rem",
                                lineHeight: 1.5,
                              }}
                            >
                              {tool.summary}
                            </p>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: gc,
                                margin: 0,
                                fontWeight: 500,
                              }}
                            >
                              → {rec}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Summary insight ───────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                style={{
                  backgroundColor: isDark ? "rgba(61,207,237,0.04)" : "rgba(26,60,200,0.03)",
                  border: "1px solid rgba(61,207,237,0.15)",
                  borderRadius: "1rem",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: textPrimary,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {score >= 80 && (
                    <>
                      Your stack is genuinely AI-ready. With {strengthTools.filter((t) => t.grade === "A").length} Grade-A tools, you have the infrastructure to automate significant workflows right now. The biggest opportunity isn&apos;t buying new software. It&apos;s connecting what you already own and actually using the AI features you&apos;re already paying for.
                    </>
                  )}
                  {score >= 60 && score < 80 && (
                    <>
                      You have a solid foundation with {strengthTools.length} integration-ready tools. The gap between where you are and a fully-automated stack is smaller than you think, mostly configuration, not new purchases. Focusing on your {quickWinTools.length > 0 ? `${quickWinTools.length} B-grade tool${quickWinTools.length > 1 ? "s" : ""} with unused AI features` : "underutilized tools"} is where we&apos;d start.
                    </>
                  )}
                  {score >= 40 && score < 60 && (
                    <>
                      Your stack has real potential but a few bottlenecks holding it back. The {gapTools.filter((t) => t.grade === "D").length > 0 ? `${gapTools.filter((t) => t.grade === "D").length} D-grade tool${gapTools.filter((t) => t.grade === "D").length > 1 ? "s" : ""} in your stack` : "limited-integration tools"} are likely creating manual handoffs that eat up hours every week. Fixing those first unlocks everything else.
                    </>
                  )}
                  {score < 40 && (
                    <>
                      There are some significant gaps in your current stack that are blocking automation. The good news: you don&apos;t need to replace everything at once. A focused upgrade of {gapTools.length > 0 ? `${Math.min(2, gapTools.length)} key tool${gapTools.length > 1 ? "s" : ""}` : "a few key tools"} combined with proper integration setup could dramatically change your automation potential within 60–90 days.
                    </>
                  )}
                </p>
              </motion.div>

              {/* ── CTA Cards ─────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                  {/* Primary CTA */}
                  <div
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${border}`,
                      borderRadius: "1.25rem",
                      padding: "1.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: textPrimary,
                        marginBottom: "0.375rem",
                      }}
                    >
                      Book a Free Stack Review
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: textMuted,
                        marginBottom: "1.25rem",
                        lineHeight: 1.55,
                      }}
                    >
                      We&apos;ll walk through your specific tools and show you exactly which automations to build first, with realistic time and cost estimates.
                    </p>
                    <Link
                      href="/contact"
                      style={{
                        display: "flex",
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
                      Book a Free Stack Review →
                    </Link>
                  </div>

                  {/* Secondary CTA */}
                  <div
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${border}`,
                      borderRadius: "1.25rem",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 600,
                          color: textPrimary,
                          marginBottom: "0.25rem",
                        }}
                      >
                        See how much time you could save
                      </p>
                      <p style={{ fontSize: "0.8125rem", color: textMuted, margin: 0 }}>
                        Run our ROI calculator with your numbers
                      </p>
                    </div>
                    <Link
                      href="/roi"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        borderRadius: "0.75rem",
                        padding: "0.625rem 1.125rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#3DCFED",
                        backgroundColor: "rgba(61,207,237,0.08)",
                        border: "1px solid rgba(61,207,237,0.2)",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      ROI Calculator →
                    </Link>
                  </div>
                </div>

                {/* Start over */}
                <button
                  onClick={() => {
                    setSelected(new Set());
                    setStep("select");
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
                  ← Adjust My Selection
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
