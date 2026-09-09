import { NextResponse } from "next/server";

import { deliverQuote } from "@/lib/quote-delivery";
import {
  contactMethods,
  emptyQuoteRequest,
  validateQuoteRequest,
  type QuoteRequest,
} from "@/lib/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function coerce(input: unknown): QuoteRequest {
  const body = (input ?? {}) as Record<string, unknown>;
  const text = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).slice(0, 4000) : "";

  const preferred = text("preferredContact");

  return {
    ...emptyQuoteRequest,
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    service: text("service"),
    location: text("location"),
    details: text("details"),
    preferredContact: (contactMethods as readonly string[]).includes(preferred)
      ? (preferred as QuoteRequest["preferredContact"])
      : "",
    company: text("company"),
  };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { status: "invalid", errors: { details: "Malformed request." } },
      { status: 400 },
    );
  }

  const values = coerce(payload);

  // Honeypot: bots fill every field, people never see this one.
  if (values.company) {
    return NextResponse.json({ status: "sent" });
  }

  const errors = validateQuoteRequest(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "invalid", errors }, { status: 422 });
  }

  const result = await deliverQuote(values);

  if (result.status === "failed") {
    return NextResponse.json(
      { status: "failed", reason: result.reason },
      { status: 502 },
    );
  }

  // "unconfigured" is a 200: the request was valid and the browser falls back
  // to WhatsApp or email. See src/lib/quote-delivery.ts to switch delivery on.
  return NextResponse.json({ status: result.status });
}
