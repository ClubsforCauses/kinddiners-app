import { NextResponse } from "next/server";

/**
 * POST /api/webhooks/billing
 * Billing provider webhook (Stripe/Recurly). Legacy: POST /recurly/data
 * Domain: lib/domains/memberships (or webhooks)
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — verify signature, process" }, { status: 501 });
}
