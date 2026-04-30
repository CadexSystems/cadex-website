"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

import { Step, Page1Data, Page2Data, Page3Data } from "./_lib/types";
import { DEFAULT_OPPORTUNITIES } from "./_lib/constants";
import {
  getReadinessScore,
  getReadinessLabel,
  getReadinessColor,
  getEngagement,
  roundToNearest5,
} from "./_lib/helpers";

import PreAuditIntro from "./_components/PreAuditIntro";
import PreAuditPage1 from "./_components/PreAuditPage1";
import PreAuditPage2 from "./_components/PreAuditPage2";
import PreAuditPage3 from "./_components/PreAuditPage3";
import PreAuditResults from "./_components/PreAuditResults";

export default function PreAuditPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const bg = dark ? "#0B0F1A" : "#FFFFFF";
  const cardBg = dark ? "#0F1623" : "#FFFFFF";
  const border = dark ? "#1E2D45" : "#E5E7EB";
  const text = dark ? "#EAF4FF" : "#111827";
  const muted = dark ? "#9CA3AF" : "#6B7280";
  const inputBg = dark ? "#0B0F1A" : "#FFFFFF";

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
    background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)",
    borderRadius: 9999,
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
    borderRadius: 9999,
    color: "#3DCFED",
    fontWeight: 600,
    fontSize: 15,
    border: "1.5px solid #3DCFED",
    cursor: "pointer",
    letterSpacing: "0.02em",
  };

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
        {step === "intro" && (
          <PreAuditIntro
            direction={direction}
            variants={variants}
            text={text}
            muted={muted}
            cardBg={cardBg}
            border={border}
            gradientBtn={gradientBtn}
            onStart={() => goTo("page1", 1)}
          />
        )}

        {step === "page1" && (
          <PreAuditPage1
            direction={direction}
            variants={variants}
            page1={page1}
            setPage1={setPage1}
            errors={errors}
            text={text}
            muted={muted}
            border={border}
            inputBg={inputBg}
            radioCardBase={radioCardBase}
            radioCardActive={radioCardActive}
            gradientBtn={gradientBtn}
            onContinue={() => {
              if (validatePage1()) goTo("page2", 1);
            }}
          />
        )}

        {step === "page2" && (
          <PreAuditPage2
            direction={direction}
            variants={variants}
            page2={page2}
            setPage2={setPage2}
            errors={errors}
            dark={dark}
            text={text}
            muted={muted}
            border={border}
            radioCardBase={radioCardBase}
            radioCardActive={radioCardActive}
            gradientBtn={gradientBtn}
            outlinedBtn={outlinedBtn}
            onBack={() => goTo("page1", -1)}
            onContinue={() => {
              if (validatePage2()) goTo("page3", 1);
            }}
          />
        )}

        {step === "page3" && (
          <PreAuditPage3
            direction={direction}
            variants={variants}
            page1={page1}
            page3={page3}
            setPage3={setPage3}
            errors={errors}
            dark={dark}
            text={text}
            muted={muted}
            border={border}
            gradientBtn={gradientBtn}
            outlinedBtn={outlinedBtn}
            onBack={() => goTo("page2", -1)}
            onSubmit={() => {
              if (validatePage3()) {
                goTo("results", 1);
                return true;
              }
              return false;
            }}
          />
        )}

        {step === "results" && (
          <PreAuditResults
            page1={page1}
            page2={page2}
            annualCost={annualCost}
            readinessScore={readinessScore}
            readinessLabel={readinessLabel}
            readinessColor={readinessColor}
            engagement={engagement}
            topOpportunities={topOpportunities}
            hoursRecoverable={hoursRecoverable}
            roiRange={roiRange}
            dark={dark}
            text={text}
            muted={muted}
            cardBg={cardBg}
            border={border}
            gradientBtn={gradientBtn}
            outlinedBtn={outlinedBtn}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
