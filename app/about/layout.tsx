import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Cadex Systems | AI Integration Consultancy | Parkland, FL",
  description:
    "Learn about Cadex Systems, an AI integration and automation consultancy based in Parkland, Florida helping businesses deploy AI with measurable ROI.",
  alternates: { canonical: "https://www.cadexhq.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
