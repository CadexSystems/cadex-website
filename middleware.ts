import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "Cadex2026$";

export function middleware(request: NextRequest) {
  // Skip password check for these pages
  if (
    request.nextUrl.pathname === "/password" ||
    request.nextUrl.pathname === "/launching-soon" ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("site-auth");
  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  // Redirect to launching soon page
  const url = request.nextUrl.clone();
  url.pathname = "/launching-soon";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)"],
};
