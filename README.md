# Cadex Systems — Website

The official website for **Cadex Systems**, an AI onboarding and automation consultancy owned by Koach Operating Partners, LLC, based in South Florida.

**Live URL:** https://cadex-website.vercel.app
**GitHub:** https://github.com/CadexSystems/cadex-website
**Sanity Studio:** https://cadex-studio.sanity.studio

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| CMS | Sanity (Project ID: `kyfypmfi`) |
| Database | Supabase (email subscribers) |
| AI Chat | Anthropic Claude (`claude-opus-4-5`) |
| Deployment | Vercel (auto-deploy from `main` branch) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
cd cadex-website
npm install
```

### Environment variables
Create a `.env.local` file in the project root with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rxdxhprfktyqkezywaaj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Anthropic (for Caden AI chat widget)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Site password (optional — defaults to Cadex2026$)
SITE_PASSWORD=Cadex2026$
```

### Run locally
```bash
cd cadex-website
npm run dev
```

Site runs at **http://localhost:3000**

> **Important:** Always `cd` into the `cadex-website` directory before running `npm run dev` so environment variables load correctly.

---

## Project Structure

```
cadex-website/
├── app/
│   ├── page.tsx              # Homepage
│   ├── services/page.tsx     # Service tiers (fetches from Sanity, falls back to constants)
│   ├── about/page.tsx        # Team page (fetches from Sanity)
│   ├── blog/page.tsx         # Blog listing (fetches from Sanity)
│   ├── roi/page.tsx          # Interactive ROI calculator
│   ├── ai-audit/page.tsx     # AI Readiness Scorecard (20 questions, scored results)
│   ├── contact/page.tsx      # Contact page
│   ├── launching-soon/page.tsx  # Public landing page with email capture
│   ├── password/page.tsx     # Password gate for team access
│   └── api/
│       └── chat/route.ts     # Caden AI chat API (streaming, Claude-powered)
├── components/
│   ├── Header.tsx            # Navigation with theme toggle
│   ├── Footer.tsx            # Footer with links and email
│   ├── Hero.tsx              # Homepage hero section
│   ├── ServiceCard.tsx       # Pricing tier card
│   ├── ChatWidget.tsx        # Floating AI chat widget (Caden)
│   ├── LayoutShell.tsx       # Wraps pages with Header/Footer/floating CTAs
│   └── ThemeProvider.tsx     # Dark/light theme context (default: light)
├── lib/
│   ├── constants.ts          # Service tiers, nav links, company info
│   ├── sanity.ts             # Sanity client + GROQ queries
│   └── supabase.ts           # Supabase client
├── public/
│   ├── cadex-logo-dark.png   # Logo for light mode
│   ├── cadex-logo-light.png  # Logo for dark mode
│   ├── hero-1.png            # Hero section background
│   ├── hero-3.jpg            # "How We Help" section background
│   └── favicon files         # favicon.ico, apple-touch-icon, etc.
├── middleware.ts             # Password protection + launching-soon redirect
└── next.config.ts            # Remote image domains (Sanity CDN)
```

---

## Pages & Features

### Public (no password required)
| Page | URL | Description |
|---|---|---|
| Launching Soon | `/launching-soon` | Public-facing landing page. Email capture saves to Supabase. |

### Password Protected (password: `Cadex2026$`)
| Page | URL | Description |
|---|---|---|
| Homepage | `/` | Hero, services overview, how we help section |
| Services | `/services` | Full service tier pricing (pulls from Sanity CMS) |
| AI Audit | `/ai-audit` | AI Readiness Scorecard — 20 questions, scored results, recommended tier |
| ROI Calculator | `/roi` | Interactive calculator — employees, hourly rate, hours saved |
| About | `/about` | Team members (pulls from Sanity CMS) |
| Blog | `/blog` | Blog posts (pulls from Sanity CMS) |
| Contact | `/contact` | Contact form |

---

## Caden — AI Chat Widget

Caden is a floating AI assistant powered by Claude. It appears on every page (bottom-right corner) and is trained on Cadex's services, pricing, and FAQs.

**To update what Caden knows**, edit the `SYSTEM_PROMPT` constant in:
```
app/api/chat/route.ts
```

After editing, commit and push — changes go live automatically on Vercel.

**Things you can add to the system prompt:**
- FAQs and scripted answers
- Team member names and bios
- Case studies and client results
- New pages or booking links
- Tone and personality adjustments

---

## Content Management (Sanity CMS)

Content editors can update the following through the Sanity Studio at **https://cadex-studio.sanity.studio**:

- **Service Tiers** — names, pricing, features, descriptions
- **Team Members** — photos, bios, roles
- **Blog Posts** — title, body, cover image, publish date

The website fetches from Sanity at request time. If Sanity is unavailable, the services page falls back to the hardcoded `SERVICE_TIERS` in `lib/constants.ts`.

---

## Email Subscribers (Supabase)

Emails collected from the Launching Soon page and AI Audit are stored in the `email_subscribers` table in Supabase.

**To view subscribers:**
1. Go to [supabase.com](https://supabase.com)
2. Open the `cadex-website` project
3. Navigate to **Table Editor → email_subscribers**

**Table schema:**
```sql
id          uuid (primary key)
email       text (unique)
source      text  -- "launching-soon" or "ai-audit"
created_at  timestamp
```

---

## Deployment

The site auto-deploys to Vercel whenever code is pushed to the `main` branch on GitHub.

**To deploy manually:**
```bash
git add .
git commit -m "your message"
git push origin main
```

### Vercel Environment Variables
The following must be set in the Vercel project dashboard under **Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `ANTHROPIC_API_KEY` | Anthropic API key for Caden chat |
| `SITE_PASSWORD` | Password for team access (optional) |

---

## Third-Party Accounts

| Service | Purpose | Login |
|---|---|---|
| Vercel | Hosting & deployment | vercel.com — brian-9813s-projects |
| GitHub | Source control | github.com/CadexSystems |
| Sanity | Headless CMS | sanity.io — Google account |
| Supabase | Email subscriber database | supabase.com |
| Anthropic | Claude API for Caden | console.anthropic.com |

---

## Roadmap / Planned Features

- [ ] Live AI Demo — paste a workflow, Caden maps the automation
- [ ] Downloadable PDF report from AI Audit results
- [ ] Industry benchmarking on Scorecard results
- [ ] Admin dashboard — subscriber counts, recent signups
- [ ] Calendly / Cal.com booking integration
- [ ] Case studies page

---

*Built with Next.js · Deployed on Vercel · Powered by Claude*
