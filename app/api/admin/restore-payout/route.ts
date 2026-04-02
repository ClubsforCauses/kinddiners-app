import { NextResponse } from "next/server";

/**
 * POST /api/admin/restore-payout
 * Restore rejected payout. Legacy: POST /api/v1/admin/restore_payout
 * Domain: lib/domains/admin
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement" }, { status: 501 });
}
