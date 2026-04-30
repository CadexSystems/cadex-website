"use client";

import { motion } from "framer-motion";
import { Page1Data } from "../_lib/types";
import { INDUSTRIES, COMPANY_SIZES, REVENUE_RANGES, ROLES } from "../_lib/constants";
import ProgressBar from "./ProgressBar";
import StepBadge from "./StepBadge";

interface PreAuditPage1Props {
  direction: number;
  variants: {
    enter: (d: number) => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (d: number) => { x: number; opacity: number };
  };
  page1: Page1Data;
  setPage1: React.Dispatch<React.SetStateAction<Page1Data>>;
  errors: Record<string, string>;
  text: string;
  muted: string;
  border: string;
  inputBg: string;
  radioCardBase: React.CSSProperties;
  radioCardActive: React.CSSProperties;
  gradientBtn: React.CSSProperties;
  onContinue: () => void;
}

export default function PreAuditPage1({
  direction,
  variants,
  page1,
  setPage1,
  errors,
  text,
  muted,
  border,
  inputBg,
  radioCardBase,
  radioCardActive,
  gradientBtn,
  onContinue,
}: PreAuditPage1Props) {
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

  return (
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
      <ProgressBar current={1} border={border} />
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
            onClick={onContinue}
          >
            Continue &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
