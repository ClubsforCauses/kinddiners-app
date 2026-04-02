import { NextResponse } from "next/server";

/**
 * POST /api/restaurants/filter
 * Filter restaurants. Legacy: POST /api/restaurants/filter
 * Domain: lib/domains/restaurants
 */
export async function POST() {
  return NextResponse.json({ message: "Placeholder — implement filter" }, { status: 501 });
}
