import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n}`;
}

export async function POST(req: Request) {
  try {
    const { companyName, email, employees, hoursWasted, hourlyCost, departments, results } =
      await req.json();

    // ── 1. Save to Supabase ────────────────────────────────────────────────
    const { error: dbError } = await supabase.from("roi_submissions").insert({
      company_name: companyName,
      email,
      employees,
      hours_wasted_per_week: hoursWasted,
      hourly_cost: hourlyCost,
      departments,
      annual_hours_wasted: results.annualHoursWasted,
      annual_cost_wasted: results.annualCostWasted,
      hours_saved: results.hoursSaved,
      cost_saved: results.costSaved,
      fte_equivalent: results.fteEquivalent,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // ── 2. Send email via Resend ───────────────────────────────────────────
    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="margin:0; padding:0; background:#EAF4FF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0B0F1A, #0D1F6E); padding: 32px 40px;">
          <p style="margin: 0 0 4px; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Cadex Systems</p>
          <h1 style="margin: 0; color: #3DCFED; font-size: 22px; font-weight: 700;">New ROI Calculator Submission</h1>
        </div>

        <!-- Lead info -->
        <div style="padding: 32px 40px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 140px;">Company</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${companyName || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #1A3CC8;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Team Size</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${employees} employees</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Hrs Wasted/Week</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${hoursWasted} hrs per employee</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Avg Hourly Cost</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">$${hourlyCost}/hr</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Departments</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${departments.join(", ")}</td>
            </tr>
          </table>
        </div>

        <!-- ROI Results -->
        <div style="padding: 32px 40px;">
          <h2 style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Calculated ROI</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="background: #EAF4FF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; text-align: center;">
              <p style="margin: 0 0 4px; color: #6B7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Hours Saved/Year</p>
              <p style="margin: 0; font-size: 28px; font-weight: 800; color: #3DCFED;">${results.hoursSaved.toLocaleString()}</p>
            </div>
            <div style="background: #EAF4FF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; text-align: center;">
              <p style="margin: 0 0 4px; color: #6B7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Cost Saved/Year</p>
              <p style="margin: 0; font-size: 28px; font-weight: 800; color: #3DCFED;">${formatCurrency(results.costSaved)}</p>
            </div>
            <div style="background: #EAF4FF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; text-align: center;">
              <p style="margin: 0 0 4px; color: #6B7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">FTE Equivalent</p>
              <p style="margin: 0; font-size: 28px; font-weight: 800; color: #3DCFED;">${results.fteEquivalent}</p>
            </div>
            <div style="background: #EAF4FF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; text-align: center;">
              <p style="margin: 0 0 4px; color: #6B7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Annual Cost at Risk</p>
              <p style="margin: 0; font-size: 28px; font-weight: 800; color: #EF4444;">${formatCurrency(results.annualCostWasted)}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div style="padding: 0 40px 40px;">
          <a href="mailto:${email}?subject=Your ROI Results — Let's Talk Next Steps&body=Hi there,%0D%0A%0D%0AThanks for using the Cadex ROI Calculator. Based on your inputs, your team could recover ${results.hoursSaved.toLocaleString()} hours and ${formatCurrency(results.costSaved)} per year through automation.%0D%0A%0D%0AI'd love to walk you through exactly how we'd get there for ${companyName || "your business"}.%0D%0A%0D%0AWhen are you available for a quick discovery call?%0D%0A%0D%0ABest,%0D%0ABrian"
            style="display: block; background: linear-gradient(135deg, #3DCFED, #1A3CC8); color: #FFFFFF; text-align: center; padding: 14px 24px; border-radius: 999px; font-size: 14px; font-weight: 600; text-decoration: none;">
            Reply to This Lead →
          </a>
        </div>

        <!-- Footer -->
        <div style="background: #EAF4FF; padding: 16px 40px; border-top: 1px solid #E5E7EB;">
          <p style="margin: 0; color: #9CA3AF; font-size: 12px; text-align: center;">Cadex Systems · discovery@cadexhq.com · cadexhq.com</p>
        </div>
      </div>
    </body>
    </html>`;

    await resend.emails.send({
      from: "Cadex Systems <onboarding@resend.dev>",
      to: ["brian@cadexhq.com", "discovery@cadexhq.com"],
      subject: `📊 New ROI Submission: ${companyName || email} — ${formatCurrency(results.costSaved)}/yr opportunity`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ROI submit error:", error);
    return new Response(JSON.stringify({ error: "Submission failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
