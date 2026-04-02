import { count } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { giftCodes } from "@/lib/db/schema/tables";

export async function countTotalGifts(): Promise<number> {
  const result = await getDb()
    .select({ count: count() })
    .from(giftCodes);
  return result[0]?.count ?? 0;
}
