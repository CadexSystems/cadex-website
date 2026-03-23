"use client";

import { BILLING_OPTIONS } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";

export default function PricingTable() {
  const { theme } = useTheme();

  const headerColor = theme === "dark" ? "#9CA3AF" : "#6B7280";
  const cellColor = theme === "dark" ? "#D1D5DB" : "#4B5563";
  const borderColor = theme === "dark" ? "#243049" : "#E5E7EB";
  const bgColor = theme === "dark" ? "#1A2235" : "#FFFFFF";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            {["Tier", "Monthly", "Quarterly (8% off)", "Annual (15% off)", "Min. Commitment", "Year 1 Total"].map(
              (h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3 border-b"
                  style={{ color: headerColor, borderColor }}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {BILLING_OPTIONS.map((row, i) => (
            <tr
              key={row.tier}
              style={{
                backgroundColor: i % 2 === 0 ? bgColor : "transparent",
              }}
            >
              <td
                className="px-4 py-3 font-medium border-b"
                style={{ color: theme === "dark" ? "#4FE0FF" : "#0A3D7C", borderColor }}
              >
                {row.tier}
              </td>
              <td className="px-4 py-3 border-b" style={{ color: cellColor, borderColor }}>
                {row.monthly}
              </td>
              <td className="px-4 py-3 border-b" style={{ color: cellColor, borderColor }}>
                {row.quarterly}
              </td>
              <td className="px-4 py-3 border-b" style={{ color: cellColor, borderColor }}>
                {row.annual}
              </td>
              <td className="px-4 py-3 border-b" style={{ color: cellColor, borderColor }}>
                {row.minCommitment}
              </td>
              <td
                className="px-4 py-3 font-semibold border-b"
                style={{ color: "#4FE0FF", borderColor }}
              >
                {row.yearOneTotal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        className="mt-3 text-xs"
        style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
      >
        Discounts apply to retainer only &mdash; setup fees are not discounted.
      </p>
    </div>
  );
}
