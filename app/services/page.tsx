"use client";

import Link from "next/link";
import CTASection from "@/components/CTASection";
import { useTheme } from "@/components/ThemeProvider";

export default function ServicesPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const bg = dark ? "#0B0F1A" : "#FFFFFF";
  const surface = dark ? "#1A2235" : "#FFFFFF";
  const border = dark ? "#243049" : "#E5E7EB";
  const text = dark ? "#F1F5F9" : "#141210";
  const muted = dark ? "#9CA3AF" : "#7A7468";
  const accent = dark ? "#3DCFED" : "#0D1F6E";
  const accentBg = dark ? "rgba(61,207,237,0.08)" : "#EDF7F2";

  return (
    <div style={{ backgroundColor: bg, color: text, minHeight: "100vh" }}>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 56px 72px" }}
        className="px-6 sm:px-14 pt-32 pb-20">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accent,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          <span style={{ width: 24, height: 2, background: accent, display: "inline-block" }} />
          How We Work
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          style={{ color: text, letterSpacing: "-0.02em", marginBottom: 28, maxWidth: 820 }}
        >
          Something in your business<br />
          is costing you more than<br />
          <em style={{ fontStyle: "normal", color: accent }}>it has to.</em>
        </h1>

        <p style={{ fontSize: 18, color: muted, lineHeight: 1.65, maxWidth: 600, marginBottom: 16, fontWeight: 300 }}>
          We find it. We automate it. We build systems that let your team focus on the work that actually moves the needle, not the work that just fills the day.
        </p>

        <div
          style={{
            display: "inline-block",
            fontSize: 13,
            color: text,
            fontWeight: 500,
            background: accentBg,
            border: `1px solid ${dark ? "rgba(61,207,237,0.2)" : "rgba(26,92,58,0.2)"}`,
            borderRadius: 6,
            padding: "8px 16px",
            marginBottom: 40,
          }}
        >
          We work with{" "}
          <span style={{ color: accent, fontWeight: 600 }}>owner-operated businesses</span>,{" "}
          <span style={{ color: accent, fontWeight: 600 }}>growing mid-market companies</span>, and{" "}
          <span style={{ color: accent, fontWeight: 600 }}>enterprise organizations</span>{" "}
          from 10 employees to 10,000.
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-bold rounded-lg transition-all hover:opacity-85 hover:-translate-y-px"
            style={{ background: dark ? "#3DCFED" : "#141210", color: dark ? "#0B0F1A" : "#FFFFFF", padding: "14px 28px", fontSize: 14, letterSpacing: "0.04em", textDecoration: "none" }}
          >
            Book a Discovery Call →
          </Link>
          <Link
            href="/ai-audit"
            className="inline-flex items-center gap-2 font-bold rounded-lg border-2 transition-all hover:-translate-y-px"
            style={{ background: "transparent", color: accent, borderColor: accent, padding: "14px 28px", fontSize: 14, letterSpacing: "0.04em", textDecoration: "none" }}
          >
            Take the AI Intake Assessment
          </Link>
        </div>
      </section>

      <div style={{ height: 1, background: border, maxWidth: 1100, margin: "0 auto" }} />

      {/* ── PROBLEM SECTION ───────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 56px" }} className="px-6 sm:px-14">
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
          Where We Start
          <span style={{ flex: 1, height: 1, background: border, maxWidth: 60, display: "block" }} />
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: text, letterSpacing: "-0.02em", marginBottom: 48, maxWidth: 640, lineHeight: 1.15 }}
        >
          Every engagement starts with a problem worth solving.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              num: "01",
              color: dark ? "#3DCFED" : "#1A5C3A",
              title: "Your team is doing manually what should happen automatically.",
              desc: "Hours lost every week to tasks that follow the same pattern every time. Reporting, data entry, follow-ups, routing, notifications — work that people are too good for.",
              items: [
                "Sales reps spending hours on audit prep instead of selling",
                "Operations manually copying data between systems",
                "Accounting compiling reports that could generate themselves",
                "Leadership waiting on updates that should arrive automatically",
              ],
              cta: "Let's fix this →",
            },
            {
              num: "02",
              color: dark ? "#FB923C" : "#C8420A",
              title: "You're losing leads, clients, or revenue to slow processes.",
              desc: "Speed wins deals. Consistency retains clients. When your follow-up is slow, your onboarding is inconsistent, or your proposals take too long, you're leaving money on the table.",
              items: [
                "Inbound leads going cold before anyone responds",
                "Client onboarding that varies by who does it that day",
                "Proposals and audits taking days instead of minutes",
                "Missed follow-ups nobody knew were supposed to happen",
              ],
              cta: "Let's fix this →",
            },
            {
              num: "03",
              color: dark ? "#818CF8" : "#1A3F6F",
              title: "You need AI working across your organization, not just one tool.",
              desc: "The goal isn't to add an AI tool. It's to build an organization where AI handles the operational layer so your people can operate at a completely different level.",
              items: [
                "Multiple departments with no shared intelligence layer",
                "AI used individually but not systematically",
                "No governance or standards for how AI is used internally",
                "Leadership ready to commit to enterprise-wide transformation",
              ],
              cta: "Let's talk →",
            },
          ].map((card) => (
            <div
              key={card.num}
              className="rounded-2xl transition-all hover:-translate-y-px"
              style={{
                background: surface,
                border: `1px solid ${border}`,
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 800, color: border, lineHeight: 1, marginBottom: 20, letterSpacing: "-0.02em" }}>
                {card.num}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: text, marginBottom: 14, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                {card.title}
              </div>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, marginBottom: 24 }}>{card.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 28 }}>
                {card.items.map((item) => (
                  <li key={item} style={{ fontSize: 13, color: text, padding: "6px 0", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ color: card.color, flexShrink: 0, marginTop: 2 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" style={{ fontSize: 13, fontWeight: 600, color: card.color, textDecoration: "none" }}>
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: border, maxWidth: 1100, margin: "0 auto" }} />

      {/* ── INDUSTRIES ────────────────────────────────── */}
      <section style={{ background: dark ? "#111827" : "#141210", padding: "56px" }} className="px-6 sm:px-14">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: 14 }}>
                Industries We&apos;ve Worked In
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "white", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                We speak your industry&apos;s language<br />before we speak yours.
              </h2>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 320, lineHeight: 1.6 }}>
              We&apos;ve built AI systems inside these industries. Not general knowledge — actual delivery experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📦", name: "E-Commerce & Agencies", desc: "Brand management, seller operations, agency workflows" },
              { icon: "⚖️", name: "Legal", desc: "Personal injury, intake automation, case management" },
              { icon: "🏥", name: "Healthcare", desc: "Dental, medical practices, patient workflows" },
              { icon: "🎓", name: "Education", desc: "Universities, EdTech, program engagement" },
              { icon: "💼", name: "Financial Services", desc: "M&A, wealth management, compliance workflows" },
              { icon: "🏗️", name: "Trades & Services", desc: "HVAC, restoration, specialty contractors" },
              { icon: "🏢", name: "Professional Services", desc: "Agencies, consultancies, staffing firms" },
              { icon: "🔀", name: "Don't See Yours?", desc: "If you have a process problem, we have a solution" },
            ].map((ind) => (
              <div
                key={ind.name}
                className="rounded-xl transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px 18px" }}
              >
                <div style={{ fontSize: 22, marginBottom: 10 }}>{ind.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 4, letterSpacing: "-0.01em" }}>{ind.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY DEPARTMENT ─────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 56px" }} className="px-6 sm:px-14">
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, fontWeight: 600, marginBottom: 14 }}>
          By Department
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: text, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.15 }}>
          Know exactly where<br />the problem lives?
        </h2>
        <p style={{ fontSize: 16, color: muted, marginBottom: 48, maxWidth: 560, lineHeight: 1.65, fontWeight: 300 }}>
          Some clients come to us knowing which department is costing them the most. We start there and build outward from that first win.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Sales", name: "Close More.\nWork Less.", size: "For sales teams and revenue operations", items: ["Automated prospect research and audit generation", "Lead routing and follow-up sequences", "CRM data enrichment and pipeline reporting", "Proposal and outreach automation"] },
            { label: "Marketing", name: "More Output.\nSame Team.", size: "For marketing teams and brand operations", items: ["Content workflows and publishing automation", "Campaign performance reporting", "Lead capture and nurture sequencing", "Brand monitoring and competitive alerts"] },
            { label: "Operations", name: "Run Tighter.\nScale Faster.", size: "For ops, fulfillment, and delivery teams", items: ["Workflow automation across departments", "Exception alerts and escalation routing", "Vendor and supply chain notifications", "Automated operational reporting"] },
            { label: "Finance & Accounting", name: "Less Manual.\nMore Accurate.", size: "For finance, accounting, and admin teams", items: ["Automated report generation and distribution", "Invoice processing and reconciliation workflows", "Expense categorization and approval routing", "Real-time financial dashboards"] },
            { label: "Client Success", name: "Retain More.\nSurprise Them.", size: "For account management and CS teams", items: ["Automated onboarding workflows", "Health score monitoring and early alerts", "Renewal and upsell trigger sequences", "Client reporting and QBR automation"] },
            { label: "HR & People Ops", name: "Hire Smarter.\nOnboard Faster.", size: "For HR, recruiting, and people operations", items: ["Applicant tracking and screening automation", "Onboarding workflow orchestration", "Performance review scheduling and reminders", "Policy and compliance document workflows"] },
            { label: "IT & Systems", name: "Connect Everything.\nMonitor Nothing Manually.", size: "For IT, systems, and infrastructure teams", items: ["System integration and API connections", "Automated alerts and incident routing", "Software provisioning workflows", "Security and compliance monitoring"] },
            { label: "Not Sure?", name: "Tell Us\nWhat's Broken.", size: "We'll find where to start", items: ["Take the AI Intake Assessment", "We diagnose the highest-impact opportunity", "You decide where to begin", "No commitment required"], featured: true, href: "/ai-audit", cta: "Take the assessment →" },
          ].map((dept) => (
            <div
              key={dept.label}
              className="rounded-2xl"
              style={{
                background: dept.featured ? accentBg : surface,
                border: `1px solid ${dept.featured ? (dark ? "rgba(61,207,237,0.25)" : "rgba(26,92,58,0.2)") : border}`,
                padding: "32px 28px",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: dept.featured ? accent : muted, fontWeight: 600, marginBottom: 8 }}>{dept.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: text, marginBottom: 6, letterSpacing: "-0.01em", lineHeight: 1.2, whiteSpace: "pre-line" }}>{dept.name}</div>
              <div style={{ fontSize: 13, color: muted, marginBottom: 20 }}>{dept.size}</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {dept.items.map((item) => (
                  <li key={item} style={{ fontSize: 13, color: text, padding: "6px 0", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ color: accent, flexShrink: 0, fontWeight: 700, fontSize: 11, marginTop: 2 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={dept.href ?? "/contact"} style={{ fontSize: 13, fontWeight: 600, color: accent, textDecoration: "none" }}>
                {dept.cta ?? "Start here →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: border, maxWidth: 1100, margin: "0 auto" }} />

      {/* ── SCALE ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 56px" }} className="px-6 sm:px-14">
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, fontWeight: 600, marginBottom: 14 }}>
          Right-Sized for Where You Are
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: text, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.15 }}>
          Built for your scale.<br />Designed to grow with you.
        </h2>
        <p style={{ fontSize: 16, color: muted, marginBottom: 48, maxWidth: 560, lineHeight: 1.65, fontWeight: 300 }}>
          Whether you&apos;re an owner-operator or running a 500-person organization, we scope every engagement to where you are today and build toward where you&apos;re going.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              label: "Small Business",
              name: "Owner-Operated",
              size: "From solo operators to growing teams",
              items: ["Fix the highest-friction process first", "Fast deployment — weeks, not months", "No enterprise overhead or complexity", "Direct access to your Cadex team", "Grows with you as you scale"],
              note: "Scoped to your specific needs — we'll find the right starting point together",
              featured: false,
            },
            {
              label: "Mid-Market",
              name: "Growing Company",
              size: "$10M–$200M revenue",
              items: ["Multi-department automation rollout", "Custom AI integrations across your stack", "Team training and adoption support", "Monthly iteration and optimization", "Dedicated delivery team"],
              note: "Scoped after discovery — we map the full opportunity before committing to scope",
              featured: true,
            },
            {
              label: "Enterprise",
              name: "Multi-Entity / Enterprise",
              size: "$200M+ revenue · Multi-department or multi-location",
              items: ["Enterprise-wide AI transformation", "Multi-entity and multi-department rollout", "Executive coaching and governance framework", "M&A integration and AI due diligence", "Board-level reporting and oversight"],
              note: "Custom scoped — every enterprise engagement is designed from scratch",
              featured: false,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl"
              style={{
                background: card.featured ? accentBg : surface,
                border: `1px solid ${card.featured ? (dark ? "rgba(61,207,237,0.25)" : "rgba(26,92,58,0.2)") : border}`,
                padding: "32px 28px",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: card.featured ? accent : muted, fontWeight: 600, marginBottom: 8 }}>{card.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: text, marginBottom: 6, letterSpacing: "-0.01em" }}>{card.name}</div>
              <div style={{ fontSize: 13, color: card.featured ? accent : muted, marginBottom: 20, fontWeight: card.featured ? 500 : 400 }}>{card.size}</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {card.items.map((item) => (
                  <li key={item} style={{ fontSize: 13, color: text, padding: "6px 0", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ color: accent, flexShrink: 0, fontWeight: 700, fontSize: 11, marginTop: 2 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: 11, color: card.featured ? accent : muted, padding: "10px 12px", background: dark ? "rgba(255,255,255,0.04)" : "#EAF4FF", borderRadius: 6, border: `1px solid ${border}`, lineHeight: 1.5 }}>
                {card.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: border, maxWidth: 1100, margin: "0 auto" }} />

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ background: dark ? "#111827" : surface, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "72px 56px" }} className="px-6 sm:px-14">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, fontWeight: 600, marginBottom: 14 }}>
            The Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: text, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.15 }}>
            How an engagement works.
          </h2>
          <p style={{ fontSize: 16, color: muted, marginBottom: 48, maxWidth: 560, fontWeight: 300, lineHeight: 1.65 }}>
            Every Cadex engagement follows the same four-phase structure, designed so you always know where you are, what&apos;s next, and what you&apos;re getting.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { num: "01", title: "Intake & Diagnosis", desc: "You complete our AI Readiness Intake. We review it and arrive at the discovery call already knowing where the opportunities are." },
              { num: "02", title: "Discovery & Blueprint", desc: "We map your workflows, identify your highest-friction areas, and build an automation architecture blueprint tailored to your business." },
              { num: "03", title: "Build & Deploy", desc: "We build, test, and deploy your automations. You see results before the engagement is complete, not after." },
              { num: "04", title: "Optimize & Expand", desc: "Monthly retainer engagements continue building on your foundation, adding automations, refining what's live, and expanding across departments." },
            ].map((step, i, arr) => (
              <div
                key={step.num}
                style={{
                  padding: "28px 24px 28px 0",
                  borderRight: i < arr.length - 1 ? `1px solid ${border}` : "none",
                  marginRight: i < arr.length - 1 ? 24 : 0,
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 800, color: border, lineHeight: 1, marginBottom: 14 }}>{step.num}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: text, marginBottom: 8, letterSpacing: "-0.01em" }}>{step.title}</div>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <CTASection
        headline="Ready to find out what's possible for your business?"
        subtext="Book a discovery call or take the AI Intake Assessment first. Either way, we'll come prepared. No commitment required, no generic sales pitch."
        buttonText="Book a Discovery Call"
      />
    </div>
  );
}
