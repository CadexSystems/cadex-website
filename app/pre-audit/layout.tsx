import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadex Pre-Audit | Find Your Highest-Value Automation Opportunities",
  description:
    "Complete the Cadex Pre-Audit to identify where AI automation can save your business the most time and money. Free, personalized results in minutes.",
  alternates: { canonical: "https://www.cadexhq.com/pre-audit" },
};

export default function PreAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
