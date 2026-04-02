import { eq, desc, and, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { profiles, memberships, membershipPlans } from "@/lib/db/schema/tables";
import { countRestaurantsWithPortal } from "@/lib/repositories/restaurants";
import { countTotalGifts } from "@/lib/repositories/gifts";
import { countTotalReferrals } from "@/lib/repositories/referrals";
import { sumPendingPayouts } from "@/lib/repositories/payouts";

export type DashboardStats = {
  activeMembers: number;
  activeRestaurants: number;
  pendingPayoutsCents: number;
  totalGifts: number;
  totalReferrals: number;
};

export type RecentSignup = {
  id: string;
  name: string;
  email: string;
  planName: string;
  status: string;
  createdAt: Date;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const activeMembersResult = await getDb()
    .select({ count: sql<number>`count(*)` })
    .from(memberships)
    .where(eq(memberships.status, "active"));

  const activeMembers = Number(activeMembersResult[0]?.count ?? 0);
  const activeRestaurants = await countRestaurantsWithPortal();
  const pendingPayoutsCents = await sumPendingPayouts();
  const totalGifts = await countTotalGifts();
  const totalReferrals = await countTotalReferrals();

  return {
    activeMembers,
    activeRestaurants,
    pendingPayoutsCents,
    totalGifts,
    totalReferrals,
  };
}

export async function getRecentSignups(limit = 5): Promise<RecentSignup[]> {
  const results = await getDb()
    .select({
      id: profiles.id,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      email: profiles.email,
      planName: membershipPlans.name,
      status: memberships.status,
      createdAt: profiles.createdAt,
    })
    .from(profiles)
    .leftJoin(memberships, eq(memberships.profileId, profiles.id))
    .leftJoin(membershipPlans, eq(membershipPlans.id, memberships.planId))
    .where(eq(profiles.role, "member"))
    .orderBy(desc(profiles.createdAt))
    .limit(limit);

  return results.map((row) => ({
    id: row.id,
    name: `${row.firstName || ""} ${row.lastName || ""}`.trim() || "Unknown",
    email: row.email,
    planName: row.planName || "No plan",
    status: row.status || "inactive",
    createdAt: row.createdAt || new Date(),
  }));
}
