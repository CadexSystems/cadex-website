"use client";

import { motion } from "framer-motion";
import { Page1Data, Page3Data } from "../_lib/types";
import { getReadinessScore, getReadinessLabel } from "../_lib/helpers";
import ProgressBar from "./ProgressBar";
import StepBadge from "./StepBadge";

// ─── ReadinessQuestion (local helper component) ───────────────────────────────

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

// ─── PreAuditPage3 ────────────────────────────────────────────────────────────

interface PreAuditPage3Props {
  direction: number;
  variants: {
    enter: (d: number) => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (d: number) => { x: number; opacity: number };
  };
  page1: Page1Data;
  page3: Page3Data;
  setPage3: React.Dispatch<React.SetStateAction<Page3Data>>;
  errors: Record<string, string>;
  dark: boolean;
  text: string;
  muted: string;
  border: string;
  gradientBtn: React.CSSProperties;
  outlinedBtn: React.CSSProperties;
  onBack: () => void;
  onSubmit: () => boolean;
}

export default function PreAuditPage3({
  direction,
  variants,
  page1,
  page3,
  setPage3,
  errors,
  dark,
  text,
  muted,
  border,
  gradientBtn,
  outlinedBtn,
  onBack,
  onSubmit,
}: PreAuditPage3Props) {
  return (
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
      <ProgressBar current={3} border={border} />
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
            onClick={onBack}
          >
            &larr; Back
          </button>
          <button
            style={{
              ...gradientBtn,
              padding: "14px 32px",
              fontSize: 16,
            }}
            onClick={async () => {
              if (!onSubmit()) return;
              const score = getReadinessScore(page3);
              try {
                await fetch("/api/audit-submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: page1.name,
                    company: page1.company,
                    email: page1.email,
                    score,
                    band: getReadinessLabel(score),
                    categoryScores: {
                      crm: page3.hasCRM === "Yes" ? 10 : 0,
                      sops: page3.hasSOPs === "Yes" ? 10 : 0,
                      leadership: page3.leadershipSupport === "Yes" ? 10 : 0,
                      automation: page3.triedAutomation === "Yes" ? 10 : 0,
                      owner: page3.hasInternalOwner === "Yes" ? 10 : 0,
                      growth: page3.growthPressure === "Yes" ? 10 : 0,
                      data: page3.hasData === "Yes" ? 10 : 0,
                      decisionMaker: page3.isDecisionMaker === "Yes" ? 10 : 0,
                    },
                  }),
                });
              } catch {
                // Non-blocking
              }
            }}
          >
            Generate My Pre-Audit Report &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
