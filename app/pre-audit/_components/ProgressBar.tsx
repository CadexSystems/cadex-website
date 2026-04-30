"use client";

export default function ProgressBar({
  current,
  border,
}: {
  current: 1 | 2 | 3;
  border: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 28,
        alignItems: "center",
      }}
    >
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 99,
            background:
              n <= current
                ? "linear-gradient(90deg, #3DCFED, #1A3CC8)"
                : border,
            transition: "background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
