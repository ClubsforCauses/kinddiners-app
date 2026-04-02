import { NextResponse } from "next/server";

/**
 * POST /api/payouts/approve
 * Approve payouts. Legacy: POST /api/v1/admin/payouts/approve
 * Domain: lib/domains/payouts
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement" }, { status: 501 });
}
