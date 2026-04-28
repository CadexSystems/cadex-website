import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Cadex Systems | Start Your AI Automation Journey",
  description:
    "Get in touch with Cadex Systems. Book a discovery call to discuss AI integration and automation for your business. Based in Clearwater, FL.",
  alternates: { canonical: "https://www.cadexhq.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
