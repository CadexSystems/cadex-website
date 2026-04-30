import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Blog | Insights & Strategies | Cadex Systems",
  description:
    "Expert insights on AI integration, workflow automation, and operational efficiency from the Cadex Systems team. Based in Coral Springs, FL.",
  alternates: { canonical: "https://www.cadexhq.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
