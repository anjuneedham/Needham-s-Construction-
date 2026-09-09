/**
 * Where quote requests go — server side.
 *
 * VERSION 1 ships with no delivery provider connected, and nothing is
 * invented to hide that: the API reports back honestly and the form falls
 * back to WhatsApp or email if those are configured.
 *
 * TO SWITCH DELIVERY ON, set one of these in your hosting environment
 * (Vercel → Settings → Environment Variables). No code change is needed.
 *
 *   QUOTE_WEBHOOK_URL   A URL that accepts a JSON POST — a Zapier/Make hook,
 *                       a Google Apps Script, a Supabase Edge Function, or
 *                       your own endpoint. The request body is the quote.
 *
 *   RESEND_API_KEY  +   Sends the request as an email through Resend.
 *   QUOTE_TO_EMAIL      QUOTE_FROM_EMAIL is optional and defaults to
 *   [QUOTE_FROM_EMAIL]  Resend's onboarding sender.
 *
 * To store requests in a database instead, add a branch to `deliverQuote`
 * below — the shape it receives is already validated.
 */

import { formatQuoteRequest, type QuoteRequest } from "./quote";
import { company } from "@/data/company";

export type DeliveryResult =
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "failed"; reason: string };

export function deliveryConfigured(): boolean {
  return Boolean(
    process.env.QUOTE_WEBHOOK_URL ||
      (process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL),
  );
}

export async function deliverQuote(
  request: QuoteRequest,
): Promise<DeliveryResult> {
  const webhook = process.env.QUOTE_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: `${company.name} website`,
          receivedAt: new Date().toISOString(),
          ...request,
        }),
      });
      if (!response.ok) {
        return { status: "failed", reason: `Webhook responded ${response.status}` };
      }
      return { status: "sent" };
    } catch {
      return { status: "failed", reason: "Could not reach the webhook." };
    }
  }

  if (resendKey && toEmail) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [toEmail],
          reply_to: request.email || undefined,
          subject: `Quote request — ${request.service} — ${request.name}`,
          text: formatQuoteRequest(request),
        }),
      });
      if (!response.ok) {
        return { status: "failed", reason: `Email service responded ${response.status}` };
      }
      return { status: "sent" };
    } catch {
      return { status: "failed", reason: "Could not reach the email service." };
    }
  }

  return { status: "unconfigured" };
}
