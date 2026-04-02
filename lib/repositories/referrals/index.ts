import { count } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { referrals } from "@/lib/db/schema/tables";

export async function countTotalReferrals(): Promise<number> {
  const result = await getDb()
    .select({ count: count() })
    .from(referrals);
  return result[0]?.count ?? 0;
}
