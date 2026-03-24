"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "./ThemeProvider";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isPasswordPage = pathname === "/password";
  const isROIPage = pathname === "/roi";

  if (isPasswordPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Floating ROI Calculator CTA */}
      {!isROIPage && (
        <Link
          href="/roi"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 hover:scale-105 transition-all"
          style={{
            boxShadow: theme === "dark"
              ? "0 4px 24px rgba(79,224,255,0.25)"
              : "0 4px 24px rgba(30,143,225,0.3)",
          }}
        >
          <span>📊</span>
          Calculate Your ROI
        </Link>
      )}
    </>
  );
}
