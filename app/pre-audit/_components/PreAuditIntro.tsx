"use client";

import { motion } from "framer-motion";

interface PreAuditIntroProps {
  direction: number;
  variants: {
    enter: (d: number) => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (d: number) => { x: number; opacity: number };
  };
  text: string;
  muted: string;
  cardBg: string;
  border: string;
  gradientBtn: React.CSSProperties;
  onStart: () => void;
}

export default function PreAuditIntro({
  direction,
  variants,
  text,
  muted,
  cardBg,
  border,
  gradientBtn,
  onStart,
}: PreAuditIntroProps) {
  const cardStyle: React.CSSProperties = {
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: 12,
    padding: "28px 32px",
  };

  return (
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
          onClick={onStart}
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
  );
}
