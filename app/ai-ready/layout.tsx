import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Scorecard | Is Your Business Ready for AI? | Cadex Systems",
  description:
    "Answer 10 questions and get a scored assessment of your business's AI readiness across data, processes, team, leadership, and tools. Free from Cadex Systems.",
  alternates: { canonical: "https://www.cadexhq.com/ai-ready" },
};

export default function AIReadyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
