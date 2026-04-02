import { NextResponse } from "next/server";

/**
 * POST /api/auth/login
 * Member login. Legacy: POST /login
 * Domain: lib/domains/auth
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement auth" }, { status: 501 });
}
