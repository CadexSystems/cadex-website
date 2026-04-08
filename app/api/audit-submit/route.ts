import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const CATEGORY_LABELS: Record<string, string> = {
  data: "Data & Systems",
  processes: "Processes",
  team: "Team",
  leadership: "Leadership",
  tools: "Current Tools",
};

export async function POST(req: Request) {
  try {
    const { name, company, email, score, band, categoryScores } = await req.json();

    // ── 1. Save to Supabase ────────────────────────────────────────────────
    const { error: dbError } = await supabase.from("ai_audit_results").insert({
      name,
      company,
      email,
      score,
      band,
      category_scores: categoryScores,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // ── 2. Send email via Resend ───────────────────────────────────────────
    const categoryRows = Object.entries(categoryScores as Record<string, number>)
      .map(
        ([key, val]) => `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #E5E7EB; color: #374151;">${CATEGORY_LABELS[key] ?? key}</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #E5E7EB; font-weight: 600; color: #4FE0FF; text-align: right;">${val}/20</td>
        </tr>`
      )
      .join("");

    const bandColors: Record<string, string> = {
      "AI Starter": "#6B7280",
      "AI Explorer": "#1E8FE1",
      "AI Ready": "#4FE0FF",
      "AI-First": "#A855F7",
    };
    const bandColor = bandColors[band] ?? "#4FE0FF";

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="margin:0; padding:0; background:#F9FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0B0F1A, #0A3D7C); padding: 32px 40px;">
          <p style="margin: 0 0 4px; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Cadex Systems</p>
          <h1 style="margin: 0; color: #4FE0FF; font-size: 22px; font-weight: 700;">New AI Audit Submission</h1>
        </div>

        <!-- Lead info -->
        <div style="padding: 32px 40px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Company</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #1E8FE1;">${email}</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Score -->
        <div style="padding: 32px 40px;">
          <div style="background: #F9FAFB; border-radius: 12px; padding: 24px; text-align: center; border: 1px solid #E5E7EB;">
            <p style="margin: 0 0 4px; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Overall Score</p>
            <p style="margin: 0; font-size: 64px; font-weight: 800; color: ${bandColor}; line-height: 1;">${score}</p>
            <p style="margin: 4px 0 0; color: #6B7280; font-size: 13px;">out of 100</p>
            <div style="display: inline-block; margin-top: 12px; background: ${bandColor}18; border: 1px solid ${bandColor}40; border-radius: 999px; padding: 4px 16px;">
              <span style="color: ${bandColor}; font-size: 13px; font-weight: 600;">${band}</span>
            </div>
          </div>
        </div>

        <!-- Category breakdown -->
        <div style="padding: 0 40px 32px;">
          <h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Score Breakdown</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
            ${categoryRows}
          </table>
        </div>

        <!-- CTA -->
        <div style="padding: 0 40px 40px;">
          <a href="mailto:${email}?subject=Your AI Readiness Score — Next Steps&body=Hi ${name},%0D%0A%0D%0AThanks for completing the Cadex AI Readiness Scorecard. Your score of ${score}/100 puts you in the ${band} category.%0D%0A%0D%0AI'd love to walk you through what this means for ${company} and where the biggest opportunities are.%0D%0A%0D%0AWhen are you available for a quick 20-minute call?%0D%0A%0D%0ABest,%0D%0ABrian"
            style="display: block; background: linear-gradient(135deg, #4FE0FF, #1E8FE1); color: #FFFFFF; text-align: center; padding: 14px 24px; border-radius: 999px; font-size: 14px; font-weight: 600; text-decoration: none;">
            Reply to ${name} →
          </a>
        </div>

        <!-- Footer -->
        <div style="background: #F9FAFB; padding: 16px 40px; border-top: 1px solid #E5E7EB;">
          <p style="margin: 0; color: #9CA3AF; font-size: 12px; text-align: center;">Cadex Systems · info@cadexhq.com · cadexhq.com</p>
        </div>
      </div>
    </body>
    </html>`;

    await resend.emails.send({
      from: "Cadex Systems <onboarding@resend.dev>",
      to: ["brian@cadexhq.com", "discovery@cadexhq.com"],
      subject: `🎯 New AI Audit: ${name} from ${company} scored ${score}/100`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Audit submit error:", error);
    return new Response(JSON.stringify({ error: "Submission failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
