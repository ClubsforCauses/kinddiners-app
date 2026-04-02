import { NextResponse } from "next/server";

/**
 * POST /api/webhooks/tremendous
 * Tremendous payout events. Legacy: POST /webhooks/tremendous
 * Domain: lib/domains/payouts
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — verify signature, update payout" }, { status: 501 });
}
