import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation & Integration Services | Cadex Systems",
  description:
    "Explore Cadex Systems AI integration and automation services for small business, mid-market, and enterprise. Designed by industry and department.",
  alternates: { canonical: "https://www.cadexhq.com/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
