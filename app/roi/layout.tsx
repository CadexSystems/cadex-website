import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI ROI Calculator | How Much Is Manual Work Costing You? | Cadex Systems",
  description:
    "Calculate how much time and money your business could recover with AI automation. Free ROI calculator from Cadex Systems — takes under 60 seconds.",
  alternates: { canonical: "https://www.cadexhq.com/roi" },
};

export default function ROILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
