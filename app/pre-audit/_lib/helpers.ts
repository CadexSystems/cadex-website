import { Page1Data, Page2Data, Page3Data } from "./types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

export function roundToNearest5(n: number): number {
  return Math.round(n / 5) * 5;
}

export function getReadinessScore(p3: Page3Data): number {
  let score = 0;
  if (p3.hasCRM === "Yes") score += 10;
  if (p3.hasSOPs === "Yes") score += 10;
  if (p3.leadershipSupport === "Yes") score += 10;
  if (p3.triedAutomation === "Yes") score += 10;
  if (p3.hasInternalOwner === "Yes") score += 10;
  if (p3.growthPressure === "Yes") score += 10;
  if (p3.hasData === "Yes") score += 10;
  if (p3.isDecisionMaker === "Yes") score += 10;
  // normalize to 100
  return Math.round((score / 80) * 100);
}

export function getReadinessLabel(score: number): string {
  if (score <= 40) return "Getting Ready";
  if (score <= 70) return "Good Foundation";
  return "High Readiness";
}

export function getReadinessColor(score: number): string {
  if (score <= 40) return "#F59E0B";
  if (score <= 70) return "#3DCFED";
  return "#22C55E";
}

export function getEngagement(
  p1: Page1Data,
  p2: Page2Data,
  readinessScore: number
): { tier: string; description: string } {
  const isSmall = ["1–10", "11–50"].includes(p1.companySize);
  const isMid = ["51–200"].includes(p1.companySize);
  const isLarge = ["201–1000", "1000+"].includes(p1.companySize);
  const isLowBudget = ["Under $10k", "Not sure yet"].includes(p2.budget);
  const isMedBudget = ["$10k–$25k", "$25k–$50k"].includes(p2.budget);
  const isHighBudget = p2.budget === "$50k+";
  const isLowReadiness = readinessScore <= 40;
  const isHighReadiness = readinessScore >= 71;

  if (isLarge && isHighReadiness && isHighBudget) {
    return {
      tier: "TRANSFORM",
      description:
        "Enterprise-grade AI transformation program with full process redesign, custom automation infrastructure, and a dedicated implementation team.",
    };
  }
  if ((isMid || isLarge) && !isLowReadiness && (isMedBudget || isHighBudget)) {
    return {
      tier: "ACCELERATE",
      description:
        "A comprehensive automation build-out for growing mid-market companies ready to scale operations systematically.",
    };
  }
  if (!isSmall && isMedBudget) {
    return {
      tier: "IGNITE",
      description:
        "A full automation sprint that deploys your highest-ROI workflows and builds the foundation for continued expansion.",
    };
  }
  return {
    tier: "SPARK",
    description:
      "Our flagship discovery and quick-win engagement to identify your top automation opportunities and deploy your first workflows in 30 days.",
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
