"use client";

import { useTheme } from "./ThemeProvider";

export default function SectionBadge({ text }: { text: string }) {
  const { theme } = useTheme();

  return (
    <div
      className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
      style={{
        backgroundColor: theme === "dark" ? "rgba(61,207,237,0.08)" : "rgba(26,60,200,0.06)",
        color: theme === "dark" ? "#9CA3AF" : "#6B7280",
        border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
      }}
    >
      <span className="mr-1.5" style={{ color: "#3DCFED" }}>&#10038;</span>
      {text}
    </div>
  );
}
