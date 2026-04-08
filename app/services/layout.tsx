import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offerings | Cadex Systems",
  description:
    "From a one-time discovery session to enterprise-wide transformation, choose the engagement that fits your needs.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
