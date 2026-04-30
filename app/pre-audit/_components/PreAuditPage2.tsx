"use client";

import { motion } from "framer-motion";
import { Page2Data } from "../_lib/types";
import { PAIN_POINTS, TOOL_OPTIONS, TIMELINES, BUDGETS } from "../_lib/constants";
import { formatCurrency } from "../_lib/helpers";
import ProgressBar from "./ProgressBar";
import StepBadge from "./StepBadge";

interface PreAuditPage2Props {
  direction: number;
  variants: {
    enter: (d: number) => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (d: number) => { x: number; opacity: number };
  };
  page2: Page2Data;
  setPage2: React.Dispatch<React.SetStateAction<Page2Data>>;
  errors: Record<string, string>;
  dark: boolean;
  text: string;
  muted: string;
  border: string;
  radioCardBase: React.CSSProperties;
  radioCardActive: React.CSSProperties;
  gradientBtn: React.CSSProperties;
  outlinedBtn: React.CSSProperties;
  onBack: () => void;
  onContinue: () => void;
}

export default function PreAuditPage2({
  direction,
  variants,
  page2,
  setPage2,
  errors,
  dark,
  text,
  muted,
  border,
  radioCardBase,
  radioCardActive,
  gradientBtn,
  outlinedBtn,
  onBack,
  onContinue,
}: PreAuditPage2Props) {
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: muted,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
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
      <ProgressBar current={2} border={border} />
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
            onClick={onBack}
          >
            &larr; Back
          </button>
          <button
            style={gradientBtn}
            onClick={onContinue}
          >
            Continue &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
