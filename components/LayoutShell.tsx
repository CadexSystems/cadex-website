"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import { useTheme } from "./ThemeProvider";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isPasswordPage = pathname === "/password";
  const isLaunchingPage = pathname === "/launching-soon";
  const isStudioPage = pathname.startsWith("/studio");
  const isROIPage = pathname === "/roi";

  if (isPasswordPage || isLaunchingPage || isStudioPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Floating ROI Calculator CTA — sits to the left of the chat button */}
      {!isROIPage && (
        <Link
          href="/roi"
          className="fixed bottom-6 right-24 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 hover:scale-105 transition-all"
          style={{ background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)" }}
          style={{
            boxShadow: theme === "dark"
              ? "0 4px 24px rgba(61,207,237,0.25)"
              : "0 4px 24px rgba(26,60,200,0.3)",
          }}
        >
          <span>📊</span>
          Calculate Your ROI
        </Link>
      )}

      {/* AI Chat Widget */}
      <ChatWidget />
    </>
  );
}
