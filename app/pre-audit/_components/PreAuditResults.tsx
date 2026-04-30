"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Page1Data, Page2Data } from "../_lib/types";
import { PAIN_POINT_MAP } from "../_lib/constants";
import { formatCurrency, formatDate, roundToNearest5 } from "../_lib/helpers";

// ─── ReportSection (local helper component) ───────────────────────────────────

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

// ─── PreAuditResults ──────────────────────────────────────────────────────────

interface PreAuditResultsProps {
  page1: Page1Data;
  page2: Page2Data;
  annualCost: number;
  readinessScore: number;
  readinessLabel: string;
  readinessColor: string;
  engagement: { tier: string; description: string };
  topOpportunities: string[];
  hoursRecoverable: number;
  roiRange: string;
  dark: boolean;
  text: string;
  muted: string;
  cardBg: string;
  border: string;
  gradientBtn: React.CSSProperties;
  outlinedBtn: React.CSSProperties;
}

export default function PreAuditResults({
  page1,
  page2,
  annualCost,
  readinessScore,
  readinessLabel,
  readinessColor,
  engagement,
  topOpportunities,
  hoursRecoverable,
  roiRange,
  dark,
  text,
  muted,
  cardBg,
  border,
  gradientBtn,
  outlinedBtn,
}: PreAuditResultsProps) {
  const cardStyle: React.CSSProperties = {
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: 12,
    padding: "28px 32px",
  };

  return (
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
          discovery@cadexhq.com
        </p>
      </div>
    </motion.div>
  );
}
