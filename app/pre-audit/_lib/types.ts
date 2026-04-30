// ─── Types ────────────────────────────────────────────────────────────────────

export type Step = "intro" | "page1" | "page2" | "page3" | "results";

export interface Page1Data {
  name: string;
  company: string;
  email: string;
  industry: string;
  companySize: string;
  revenueRange: string;
  role: string;
}

export interface Page2Data {
  painPoints: string[];
  tools: string[];
  manualHours: number;
  timeline: string;
  budget: string;
}

export interface Page3Data {
  hasCRM: string;
  hasSOPs: string;
  leadershipSupport: string;
  triedAutomation: string;
  automationWorked: string;
  hasInternalOwner: string;
  growthPressure: string;
  hasData: string;
  isDecisionMaker: string;
}
