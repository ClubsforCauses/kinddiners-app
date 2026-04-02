import { NextResponse } from "next/server";

/**
 * POST /api/referrals/update-promo-code
 * Update user promo code. Legacy: POST /api/user/update-promo-code
 * Domain: lib/domains/referrals
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement" }, { status: 501 });
}
