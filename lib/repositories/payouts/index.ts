import { eq, or, sum } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { payouts } from "@/lib/db/schema/tables";

export async function sumPendingPayouts(): Promise<number> {
  const result = await getDb()
    .select({ total: sum(payouts.amountCents) })
    .from(payouts)
    .where(
      or(
        eq(payouts.status, "pending_submission"),
        eq(payouts.status, "pending_approval")
      )
    );
  return Number(result[0]?.total ?? 0);
}
