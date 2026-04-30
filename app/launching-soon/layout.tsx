import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | Cadex Systems",
  robots: { index: false, follow: false },
};

export default function LaunchingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
