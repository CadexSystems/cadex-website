"use client";

export default function StepBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 99,
        border: "1px solid #3DCFED",
        color: "#3DCFED",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginBottom: 12,
      }}
    >
      {label}
    </div>
  );
}
