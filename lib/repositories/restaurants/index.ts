import { eq, count } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { restaurants } from "@/lib/db/schema/tables";

export async function countActiveRestaurants(): Promise<number> {
  const result = await getDb()
    .select({ count: count() })
    .from(restaurants)
    .where(eq(restaurants.active, true));
  return result[0]?.count ?? 0;
}

export async function countRestaurantsWithPortal(): Promise<number> {
  const result = await getDb()
    .select({ count: count() })
    .from(restaurants)
    .where(eq(restaurants.portalEnabled, true));
  return result[0]?.count ?? 0;
}
