import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const sitePassword = process.env.SITE_PASSWORD;

  // Fail explicitly rather than silently defaulting to a known password
  if (!sitePassword) {
    console.error("[auth] SITE_PASSWORD environment variable is not set");
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 });
  }

  const { password } = await request.json();

  if (password === sitePassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("site-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
