// ─── Constants ────────────────────────────────────────────────────────────────

export const INDUSTRIES = [
  "Healthcare",
  "Real Estate",
  "Legal Services",
  "Financial Services",
  "Logistics & Supply Chain",
  "Manufacturing",
  "Retail & E-Commerce",
  "Professional Services",
  "Construction",
  "Technology",
  "Other",
];

export const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];

export const REVENUE_RANGES = [
  "Under $1M",
  "$1M–$5M",
  "$5M–$25M",
  "$25M–$100M",
  "$100M+",
];

export const ROLES = [
  "Owner/CEO",
  "Operations",
  "Finance",
  "IT/Technology",
  "Marketing/Sales",
  "HR",
  "Other",
];

export const PAIN_POINTS = [
  "Slow lead follow-up",
  "Manual data entry",
  "Reporting takes too long",
  "Employee onboarding is painful",
  "Customer support is reactive",
  "Invoice and billing delays",
  "Too many tools that don't connect",
  "Compliance and documentation burden",
  "Scheduling and coordination overhead",
  "Lack of visibility into operations",
];

export const TOOL_OPTIONS: Record<string, string[]> = {
  CRM: ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "No CRM"],
  Accounting: ["QuickBooks", "Xero", "NetSuite", "Spreadsheets"],
  Communication: [
    "Slack",
    "Microsoft Teams",
    "Google Workspace",
    "Email only",
  ],
  "Project Mgmt": [
    "Asana",
    "ClickUp",
    "Jira",
    "Trello",
    "Notion",
    "Spreadsheets",
  ],
};

export const TIMELINES = [
  "We're exploring",
  "6–12 months",
  "3–6 months",
  "ASAP",
];

export const BUDGETS = [
  "Under $10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k+",
  "Not sure yet",
];

export const PAIN_POINT_MAP: Record<
  string,
  { title: string; description: string; hours: string }
> = {
  "Slow lead follow-up": {
    title: "Lead Response Automation",
    description:
      "Instant AI-powered follow-up sequences triggered by any new lead source.",
    hours: "8–12 hrs/week recovered",
  },
  "Manual data entry": {
    title: "Data Entry Elimination",
    description:
      "AI extracts, formats, and routes data across your systems without human intervention.",
    hours: "10–15 hrs/week recovered",
  },
  "Reporting takes too long": {
    title: "Automated Reporting Pipeline",
    description:
      "Reports generated and delivered on schedule, pulling live data from all your sources.",
    hours: "5–8 hrs/week recovered",
  },
  "Employee onboarding is painful": {
    title: "Employee Onboarding Automation",
    description:
      "Every hire triggers a full automated onboarding workflow: accounts, welcome, training schedule.",
    hours: "6–10 hrs/week recovered",
  },
  "Customer support is reactive": {
    title: "AI Support Triage",
    description:
      "AI handles Tier-1 tickets automatically, routes complex issues with full context.",
    hours: "8–15 hrs/week recovered",
  },
  "Invoice and billing delays": {
    title: "Invoice Processing Automation",
    description:
      "AI extracts invoice data, routes approvals, and syncs to accounting.",
    hours: "8–12 hrs/week recovered",
  },
  "Too many tools that don't connect": {
    title: "Integration Architecture",
    description:
      "A unified automation layer connects your tools so data flows without manual transfers.",
    hours: "10–20 hrs/week recovered",
  },
  "Compliance and documentation burden": {
    title: "Compliance Document Automation",
    description:
      "AI drafts, versions, and routes compliance documentation automatically.",
    hours: "6–10 hrs/week recovered",
  },
  "Scheduling and coordination overhead": {
    title: "Scheduling Automation",
    description:
      "AI handles internal and external scheduling, reminders, and coordination.",
    hours: "4–8 hrs/week recovered",
  },
  "Lack of visibility into operations": {
    title: "Operations Dashboard",
    description:
      "Real-time visibility into KPIs across all departments, updated automatically.",
    hours: "3–6 hrs/week recovered",
  },
};

export const DEFAULT_OPPORTUNITIES = [
  "Slow lead follow-up",
  "Manual data entry",
  "Reporting takes too long",
];
