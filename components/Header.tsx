"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "rgba(11,15,26,0.85)" : "rgba(255,255,255,0.85)",
        borderColor: theme === "dark" ? "#243049" : "#E5E7EB",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={theme === "dark" ? "/cadex-logo-light.png" : "/cadex-logo-dark.png"}
              alt="Cadex Systems"
              width={160}
              height={44}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  pathname === link.href
                    ? "text-cyan-400"
                    : theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`rounded-full p-2 transition-colors ${
                theme === "dark"
                  ? "bg-surface-800 hover:bg-surface-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Book a Call
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: theme === "dark" ? "#EAF4FF" : "#111827" }}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            className="md:hidden pb-4 border-t pt-4"
            style={{ borderColor: theme === "dark" ? "#243049" : "#E5E7EB" }}
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-cyan-400"
                      : theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className={`text-sm font-medium text-left ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white text-center hover:opacity-90 transition-opacity"
              >
                Book a Call
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
