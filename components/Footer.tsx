"use client";

import Image from "next/image";
import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="border-t transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "#EAF4FF",
        borderColor: theme === "dark" ? "#243049" : "#E5E7EB",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src={theme === "dark" ? "/cadex-logo-light.png" : "/cadex-logo-dark.png"}
              alt={COMPANY.name}
              width={140}
              height={38}
              className="h-8 w-auto"
            />
            <p
              className="mt-2 text-sm"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              {COMPANY.tagline}
            </p>
            <p
              className="mt-4 text-sm max-w-xs"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              {COMPANY.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-cyan-400"
                    style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              Contact
            </h3>
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {COMPANY.email}
            </a>
            <div className="mt-4">
              <h4
                className="text-sm font-semibold mb-2"
                style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
              >
                Our Services
              </h4>
              <ul className="space-y-1">
                {COMPANY.services.map((service) => (
                  <li
                    key={service}
                    className="text-sm"
                    style={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-8 border-t text-center text-sm"
          style={{
            borderColor: theme === "dark" ? "#243049" : "#E5E7EB",
            color: theme === "dark" ? "#6B7280" : "#9CA3AF",
          }}
        >
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
