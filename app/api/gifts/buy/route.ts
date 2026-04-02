import { NextResponse } from "next/server";

/**
 * POST /api/gifts/buy
 * Purchase gift. Legacy: POST /buy-gift
 * Domain: lib/domains/gifts
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement" }, { status: 501 });
}
