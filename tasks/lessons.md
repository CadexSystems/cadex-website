# Lessons

Format: [date] | what went wrong | rule to prevent it

---

[2026-04-30] | Converted blog/page.tsx to server component but BlogClient.tsx still imported from @/lib/sanity (which uses next-sanity — server-only code). This caused "Application error: a client-side exception" on /blog in production. | When splitting server/client components, client components must NEVER import from modules that use next-sanity or any server-only package. Pass resolved plain data (strings, numbers, POJOs) as props from the server component; client components receive only serialisable props.

[2026-04-30] | blog/[slug]/page.tsx used useEffect + useState to fetch post data. Crawlers received "Loading..." HTML instead of the full article body. | Any data that must be visible to search engines or LLMs must be fetched in a server component (async function, no "use client"). Move all fetch calls server-side and pass results as props to client components for theme/interactivity.

[2026-04-30] | Root layout.tsx had `alternates: { canonical: "https://www.cadexhq.com" }` — caused every page to report the homepage as its canonical URL, severely hurting SEO. | Never set a global canonical in the root layout. Each page sets its own via its own layout.tsx or generateMetadata. The root layout should NOT include alternates.canonical.

[2026-04-30] | Resend emails were failing because the from address used onboarding@resend.dev while trying to send to non-owner emails. | Verify the sending domain in Resend before using a custom from address. Until domain is verified, Resend only allows sending to the account-owner email. After domain verification, use noreply@<verified-domain>.

[2026-04-30] | Company location was updated twice — first to Clearwater, then Parkland, then Coral Springs. Had to find and update every hardcoded address occurrence. | Store the canonical company address in one place (lib/constants.ts COMPANY object) and reference it everywhere. Never hardcode address strings directly in components, schema, or llms.txt.
