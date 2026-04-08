export const COMPANY = {
  name: "Cadex Systems",
  tagline: "AI Integration & Automation Services",
  description:
    "We help businesses unlock operational efficiency through strategic AI implementation, automation, and ongoing optimization.",
  email: "info@cadexhq.com",
  services: [
    "AI Integration & Automation",
    "Custom Consulting",
    "Venture / MVP Studio",
  ],
};

export type ServiceTier = {
  id: string;
  name: string;
  title: string;
  description: string;
  setupFee: string;
  monthlyRetainer: string | null;
  commitment: string;
  recommended?: boolean;
  setupIncludes: string[];
  monthlyIncludes: string[];
  color: string;
};

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "spark",
    name: "SPARK",
    title: "AI Discovery",
    description:
      "One-time engagement. Understand your AI opportunity before committing to a build.",
    setupFee: "$7,500",
    monthlyRetainer: null,
    commitment: "No retainer \u00b7 No minimum",
    setupIncludes: [
      "AI landscape overview",
      "Top 3\u20135 opportunities identified",
      "Tool & vendor recommendations",
      "Executive summary report",
      "Roadmap for next steps",
    ],
    monthlyIncludes: [],
    color: "gray",
  },
  {
    id: "ignite",
    name: "IGNITE",
    title: "Premium Audit",
    description:
      "Full AI readiness audit plus early automations to prove ROI quickly.",
    setupFee: "$16,500",
    monthlyRetainer: "$3,500 / mo",
    commitment: "6-month minimum",
    setupIncludes: [
      "Full AI readiness audit",
      "3\u20135 automations implemented",
      "Opportunity map with ROI estimates",
      "Board-ready presentation",
      "90-day roadmap + KPI baseline",
    ],
    monthlyIncludes: [
      "1\u20132 automation builds/optimizations",
      "Roadmap progress check-ins",
      "Quarterly roadmap refresh",
      "Monthly KPI tracking",
    ],
    color: "blue",
  },
  {
    id: "accelerate",
    name: "ACCELERATE",
    title: "Full Implementation",
    description:
      "Complete deployment with training, coaching, and priority support.",
    setupFee: "$22,500",
    monthlyRetainer: "$5,000 / mo",
    commitment: "6-month minimum",
    recommended: true,
    setupIncludes: [
      "Everything in Ignite",
      "Tool procurement & configuration",
      "6\u20138 automations built & deployed",
      "Full team training (3 sessions)",
      "Custom AI playbook",
      "30-day hypercare + KPI baseline",
    ],
    monthlyIncludes: [
      "2\u20133 automation builds/optimizations",
      "Staff adoption coaching",
      "Monthly strategy & performance review",
      "Priority SLA + monthly ROI reporting",
    ],
    color: "cyan",
  },
  {
    id: "transform",
    name: "TRANSFORM",
    title: "Enterprise Partnership",
    description:
      "Multi-department rollout with executive coaching and governance.",
    setupFee: "$35,000",
    monthlyRetainer: "$8,500 / mo",
    commitment: "12-month minimum",
    setupIncludes: [
      "Enterprise-scale rollout",
      "Multi-department implementation",
      "10\u201312 automations built",
      "Department-level training",
      "Executive AI coaching",
      "Governance & policy framework",
    ],
    monthlyIncludes: [
      "3\u20135 automation builds/optimizations",
      "Weekly check-ins + monthly exec review",
      "Quarterly roadmap planning",
      "Quarterly executive ROI reports",
    ],
    color: "purple",
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    title: "Custom Consulting",
    description:
      "Complex, non-standard engagements scoped individually per project.",
    setupFee: "Custom Scope",
    monthlyRetainer: null,
    commitment: "Individual SOW per engagement",
    setupIncludes: [
      "M&A AI integration & due diligence",
      "Custom AI integrations scoped per engagement",
      "Vibe coding & custom development",
      "Executive & board-level AI education",
      "Multi-entity enterprise rollouts",
      "AI governance at board level",
      "Complex multi-system architecture",
    ],
    monthlyIncludes: [],
    color: "amber",
  },
];

export const BILLING_OPTIONS = [
  {
    tier: "Spark",
    monthly: "\u2014",
    quarterly: "\u2014",
    annual: "\u2014",
    minCommitment: "None",
    yearOneTotal: "$7,500",
  },
  {
    tier: "Ignite",
    monthly: "$3,500 / mo",
    quarterly: "$9,660 / qtr",
    annual: "$35,700 / yr",
    minCommitment: "6 months",
    yearOneTotal: "$58,500",
  },
  {
    tier: "Accelerate",
    monthly: "$5,000 / mo",
    quarterly: "$13,800 / qtr",
    annual: "$51,000 / yr",
    minCommitment: "6 months",
    yearOneTotal: "$82,500",
  },
  {
    tier: "Transform",
    monthly: "$8,500 / mo",
    quarterly: "$23,460 / qtr",
    annual: "$86,700 / yr",
    minCommitment: "12 months",
    yearOneTotal: "$137,000",
  },
  {
    tier: "Enterprise",
    monthly: "Custom",
    quarterly: "\u2014",
    annual: "\u2014",
    minCommitment: "Per SOW",
    yearOneTotal: "Per SOW",
  },
];

export const ROI_FRAMEWORK = {
  revenueProtection: [
    "Reduction in missed leads or follow-up failures",
    "Decrease in manual errors causing client churn",
    "Improved response time to inbound inquiries",
  ],
  revenueRetention: [
    "Staff hours recaptured from manual tasks",
    "Reduction in overtime or contractor dependency",
    "Increased capacity without headcount growth",
  ],
  revenueGrowth: [
    "Faster sales cycle or proposal turnaround",
    "Increase in qualified leads processed per week",
    "New service lines enabled by automation",
  ],
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Offerings", href: "/services" },
  { label: "AI Audit", href: "/ai-audit" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
