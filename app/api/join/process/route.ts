import { NextResponse } from "next/server";

/**
 * POST /api/join/process
 * Process registration. Legacy: POST /process_registration
 * Domain: lib/domains/memberships
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement join" }, { status: 501 });
}
