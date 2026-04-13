"use client";

import Link from "next/link";
import CTASection from "@/components/CTASection";
import SectionBadge from "@/components/SectionBadge";
import AnimateIn from "@/components/AnimateIn";
import { useTheme } from "@/components/ThemeProvider";

export default function ServicesPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const bg       = dark ? "#0B0F1A" : "#FFFFFF";
  const bgAlt    = dark ? "#111827" : "#EAF4FF";
  const surface  = dark ? "#1A2235" : "#FFFFFF";
  const border   = dark ? "#243049" : "#E5E7EB";
  const heading  = dark ? "#3DCFED" : "#0D1F6E";
  const body     = dark ? "#D1D5DB" : "#4B5563";
  const muted    = dark ? "#9CA3AF" : "#6B7280";
  const accent   = dark ? "#3DCFED" : "#1A3CC8";
  const accentBg = dark ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)";

  return (
    <div style={{ backgroundColor: bg }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-20 transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionBadge text="How We Work" />
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl"
              style={{ color: heading }}
            >
              Something in your business<br />
              is costing you more than{" "}
              <span style={{ color: accent }}>it has to.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: muted }}>
              We find it. We automate it. We build systems that let your team focus on the work that actually moves the needle, not the work that just fills the day.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div
              className="mt-6 inline-block text-sm font-medium rounded-lg px-4 py-2"
              style={{ background: accentBg, color: body, border: `1px solid ${border}` }}
            >
              We work with{" "}
              <span style={{ color: accent, fontWeight: 600 }}>owner-operated businesses</span>,{" "}
              <span style={{ color: accent, fontWeight: 600 }}>growing mid-market companies</span>, and{" "}
              <span style={{ color: accent, fontWeight: 600 }}>enterprise organizations</span>{" "}
              from 10 employees to 10,000.
            </div>
          </AnimateIn>

          <AnimateIn delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full px-8 py-3.5 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
              >
                Book a Discovery Call →
              </Link>
              <Link
                href="/ai-audit"
                className="rounded-full px-8 py-3.5 text-base font-semibold transition-colors hover:opacity-80"
                style={{ color: accent, border: `2px solid ${accent}`, background: "transparent" }}
              >
                Take the AI Intake Assessment
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PROBLEM SECTION ──────────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 transition-colors duration-300"
        style={{ backgroundColor: bgAlt }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionBadge text="Where We Start" />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl"
              style={{ color: heading }}
            >
              Every engagement starts with a problem worth solving.
            </h2>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "Wasted Time",
                color: accent,
                title: "Your team is doing manually what should happen automatically.",
                desc: "Hours lost every week to tasks that follow the same pattern every time. Reporting, data entry, follow-ups, routing, notifications — work that people are too good for.",
                items: [
                  "Sales reps spending hours on audit prep instead of selling",
                  "Operations manually copying data between systems",
                  "Accounting compiling reports that could generate themselves",
                  "Leadership waiting on updates that should arrive automatically",
                ],
              },
              {
                num: "Lost Revenue",
                color: dark ? "#FB923C" : "#C8420A",
                title: "You're losing leads, clients, or revenue to slow processes.",
                desc: "Speed wins deals. Consistency retains clients. When your follow-up is slow, your onboarding is inconsistent, or your proposals take too long, you're leaving money on the table.",
                items: [
                  "Inbound leads going cold before anyone responds",
                  "Client onboarding that varies by who does it that day",
                  "Proposals and audits taking days instead of minutes",
                  "Missed follow-ups nobody knew were supposed to happen",
                ],
              },
              {
                num: "Missing Intelligence Layer",
                color: dark ? "#818CF8" : "#1A3F6F",
                title: "You need AI working across your organization, not just one tool.",
                desc: "The goal isn't to add an AI tool. It's to build an organization where AI handles the operational layer so your people can operate at a completely different level.",
                items: [
                  "Multiple departments with no shared intelligence layer",
                  "AI used individually but not systematically",
                  "No governance or standards for how AI is used internally",
                  "Leadership ready to commit to enterprise-wide transformation",
                ],
              },
            ].map((card, i) => (
              <AnimateIn key={card.num} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full transition-all hover:-translate-y-1 hover:shadow-lg duration-300"
                  style={{ backgroundColor: surface, border: `1px solid ${border}` }}
                >
                  <div
                    className="text-5xl font-bold mb-6 leading-none tracking-tight"
                    style={{ color: border }}
                  >
                    {card.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: heading }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: muted }}>
                    {card.desc}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: body }}>
                        <span style={{ color: card.color, flexShrink: 0, marginTop: 2 }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="text-sm font-semibold transition-colors hover:opacity-75" style={{ color: card.color }}>
                    Let&apos;s fix this →
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 transition-colors duration-300"
        style={{ backgroundColor: dark ? "#111827" : "#0D1F6E" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div
              className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide mb-6"
              style={{ backgroundColor: "rgba(61,207,237,0.12)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="mr-1.5" style={{ color: "#3DCFED" }}>&#10038;</span>
              Industries We&apos;ve Worked In
            </div>
          </AnimateIn>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            <AnimateIn delay={0.1}>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white max-w-lg"
              >
                We speak your industry&apos;s language before we speak yours.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                We&apos;ve built AI systems inside these industries. Not general knowledge — actual delivery experience.
              </p>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📦", name: "E-Commerce & Agencies",   desc: "Brand management, seller operations, agency workflows" },
              { icon: "⚖️", name: "Legal",                   desc: "Personal injury, intake automation, case management" },
              { icon: "🏥", name: "Healthcare",              desc: "Dental, medical practices, patient workflows" },
              { icon: "🎓", name: "Education",               desc: "Universities, EdTech, program engagement" },
              { icon: "💼", name: "Financial Services",      desc: "M&A, wealth management, compliance workflows" },
              { icon: "🏗️", name: "Trades & Services",      desc: "HVAC, restoration, specialty contractors" },
              { icon: "🏢", name: "Professional Services",   desc: "Agencies, consultancies, staffing firms" },
              { icon: "🔀", name: "Don't See Yours?",        desc: "If you have a process problem, we have a solution" },
            ].map((ind, i) => (
              <AnimateIn key={ind.name} delay={i * 0.05}>
                <div
                  className="rounded-xl p-5 transition-all hover:-translate-y-px duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="text-2xl mb-3">{ind.icon}</div>
                  <div className="text-sm font-bold text-white mb-1">{ind.name}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{ind.desc}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY DEPARTMENT ────────────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionBadge text="By Department" />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight max-w-xl"
              style={{ color: heading }}
            >
              Know exactly where the problem lives?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-4 text-lg max-w-xl leading-relaxed" style={{ color: muted }}>
              Some clients come to us knowing which department is costing them the most. We start there and build outward from that first win.
            </p>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Sales",               name: "Close More.\nWork Less.",              size: "For sales teams and revenue operations",    items: ["Automated prospect research and audit generation", "Lead routing and follow-up sequences", "CRM data enrichment and pipeline reporting", "Proposal and outreach automation"] },
              { label: "Marketing",           name: "More Output.\nSame Team.",             size: "For marketing teams and brand operations",   items: ["Content workflows and publishing automation", "Campaign performance reporting", "Lead capture and nurture sequencing", "Brand monitoring and competitive alerts"] },
              { label: "Operations",          name: "Run Tighter.\nScale Faster.",          size: "For ops, fulfillment, and delivery teams",   items: ["Workflow automation across departments", "Exception alerts and escalation routing", "Vendor and supply chain notifications", "Automated operational reporting"] },
              { label: "Finance & Accounting",name: "Less Manual.\nMore Accurate.",         size: "For finance, accounting, and admin teams",   items: ["Automated report generation and distribution", "Invoice processing and reconciliation workflows", "Expense categorization and approval routing", "Real-time financial dashboards"] },
              { label: "Client Success",      name: "Retain More.\nSurprise Them.",         size: "For account management and CS teams",        items: ["Automated onboarding workflows", "Health score monitoring and early alerts", "Renewal and upsell trigger sequences", "Client reporting and QBR automation"] },
              { label: "HR & People Ops",     name: "Hire Smarter.\nOnboard Faster.",       size: "For HR, recruiting, and people operations",  items: ["Applicant tracking and screening automation", "Onboarding workflow orchestration", "Performance review scheduling and reminders", "Policy and compliance document workflows"] },
              { label: "IT & Systems",        name: "Connect Everything.\nMonitor Less.",   size: "For IT, systems, and infrastructure teams",  items: ["System integration and API connections", "Automated alerts and incident routing", "Software provisioning workflows", "Security and compliance monitoring"] },
              { label: "Not Sure?",           name: "Tell Us\nWhat's Broken.",              size: "We'll find where to start",                  items: ["Take the AI Intake Assessment", "We diagnose the highest-impact opportunity", "You decide where to begin", "No commitment required"], featured: true, href: "/ai-audit", cta: "Take the assessment →" },
            ].map((dept, i) => (
              <AnimateIn key={dept.label} delay={(i % 4) * 0.08}>
                <div
                  className="rounded-2xl p-6 h-full transition-all hover:-translate-y-1 hover:shadow-lg duration-300"
                  style={{
                    backgroundColor: dept.featured ? accentBg : surface,
                    border: `1px solid ${dept.featured ? (dark ? "rgba(61,207,237,0.25)" : "rgba(26,60,200,0.2)") : border}`,
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: dept.featured ? accent : muted }}
                  >
                    {dept.label}
                  </div>
                  <div
                    className="text-xl font-bold mb-1 leading-tight whitespace-pre-line"
                    style={{ color: heading }}
                  >
                    {dept.name}
                  </div>
                  <div className="text-xs mb-5" style={{ color: muted }}>{dept.size}</div>
                  <ul className="space-y-2 mb-6">
                    {dept.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: body }}>
                        <span style={{ color: accent, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={dept.href ?? "/contact"}
                    className="text-xs font-semibold transition-colors hover:opacity-75"
                    style={{ color: accent }}
                  >
                    {dept.cta ?? "Start here →"}
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCALE ────────────────────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 transition-colors duration-300"
        style={{ backgroundColor: bgAlt }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionBadge text="Right-Sized for Where You Are" />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight max-w-xl"
              style={{ color: heading }}
            >
              Built for your scale. Designed to grow with you.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-4 text-lg max-w-xl leading-relaxed" style={{ color: muted }}>
              Whether you&apos;re an owner-operator or running a 500-person organization, we scope every engagement to where you are today and build toward where you&apos;re going.
            </p>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Small Business",
                name: "Owner-Operated",
                size: "From solo operators to growing teams",
                items: ["Fix the highest-friction process first", "Fast deployment, weeks not months", "No enterprise overhead or complexity", "Direct access to your Cadex team", "Grows with you as you scale"],
                note: "Scoped to your specific needs. We'll find the right starting point together.",
                featured: false,
              },
              {
                label: "Mid-Market",
                name: "Growing Company",
                size: "$10M–$200M revenue",
                items: ["Multi-department automation rollout", "Custom AI integrations across your stack", "Team training and adoption support", "Monthly iteration and optimization", "Dedicated delivery team"],
                note: "Scoped after discovery. We map the full opportunity before committing to scope.",
                featured: true,
              },
              {
                label: "Enterprise",
                name: "Multi-Entity / Enterprise",
                size: "$200M+ revenue · Multi-department or multi-location",
                items: ["Enterprise-wide AI transformation", "Multi-entity and multi-department rollout", "Executive coaching and governance framework", "M&A integration and AI due diligence", "Board-level reporting and oversight"],
                note: "Custom scoped. Every enterprise engagement is designed from scratch.",
                featured: false,
              },
            ].map((card, i) => (
              <AnimateIn key={card.label} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full transition-all hover:-translate-y-1 hover:shadow-lg duration-300"
                  style={{
                    backgroundColor: card.featured ? accentBg : surface,
                    border: `1px solid ${card.featured ? (dark ? "rgba(61,207,237,0.25)" : "rgba(26,60,200,0.2)") : border}`,
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: card.featured ? accent : muted }}
                  >
                    {card.label}
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: heading }}>{card.name}</div>
                  <div className="text-sm mb-6" style={{ color: card.featured ? accent : muted, fontWeight: card.featured ? 500 : 400 }}>{card.size}</div>
                  <ul className="space-y-2 mb-6">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: body }}>
                        <span style={{ color: accent, flexShrink: 0, fontWeight: 700, fontSize: 11, marginTop: 2 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="text-xs leading-relaxed rounded-lg px-3 py-2"
                    style={{ color: card.featured ? accent : muted, backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${border}` }}
                  >
                    {card.note}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionBadge text="The Process" />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2
              className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
              style={{ color: heading }}
            >
              How an engagement works.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-4 text-lg max-w-xl leading-relaxed" style={{ color: muted }}>
              Every Cadex engagement follows the same four-phase structure, designed so you always know where you are, what&apos;s next, and what you&apos;re getting.
            </p>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Intake & Diagnosis",    desc: "You complete our AI Readiness Intake. We review it and arrive at the discovery call already knowing where the opportunities are." },
              { num: "02", title: "Discovery & Blueprint", desc: "We map your workflows, identify your highest-friction areas, and build an automation architecture blueprint tailored to your business." },
              { num: "03", title: "Build & Deploy",        desc: "We build, test, and deploy your automations. You see results before the engagement is complete, not after." },
              { num: "04", title: "Optimize & Expand",     desc: "Monthly retainer engagements continue building on your foundation, adding automations, refining what's live, and expanding across departments." },
            ].map((step, i) => (
              <AnimateIn key={step.num} delay={i * 0.1}>
                <div className="relative">
                  <div
                    className="text-5xl font-bold leading-none mb-6 tracking-tight"
                    style={{ color: border }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: heading }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to find out what's possible for your business?"
        subtext="Book a discovery call or take the AI Intake Assessment first. Either way, we'll come prepared. No commitment required, no generic sales pitch."
        buttonText="Book a Discovery Call"
      />
    </div>
  );
}
