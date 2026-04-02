/**
 * GET /api/plans — list membership plans (read from DB).
 * Demonstrates repository + DB layer for API routes.
 */

import { NextResponse } from "next/server";
import { listPlans } from "@/lib/repositories/memberships";

export async function GET() {
  try {
    const plans = await listPlans();
    return NextResponse.json(plans);
  } catch (e) {
    console.error("GET /api/plans error:", e);
    return NextResponse.json(
      { error: "Failed to list plans" },
      { status: 500 }
    );
  }
}
