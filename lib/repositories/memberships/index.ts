/**
 * Membership plan and membership repositories.
 * Plans: catalog of plan codes (CLASSIC, AMBASSADOR, etc.).
 * Memberships: per-profile subscriptions (active, canceled, etc.).
 */

import { eq, and, desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import {
  membershipPlans,
  memberships,
} from "@/lib/db/schema/tables";
import type {
  MembershipPlan,
  MembershipPlanInsert,
  Membership,
  MembershipInsert,
} from "./types";

export type {
  MembershipPlan,
  MembershipPlanInsert,
  Membership,
  MembershipInsert,
} from "./types";

// ---- Membership plans ----

export async function getPlanById(id: string): Promise<MembershipPlan | null> {
  const [row] = await getDb()
    .select()
    .from(membershipPlans)
    .where(eq(membershipPlans.id, id))
    .limit(1);
  return row ?? null;
}

export async function getPlanByCode(code: string): Promise<MembershipPlan | null> {
  const [row] = await getDb()
    .select()
    .from(membershipPlans)
    .where(eq(membershipPlans.code, code))
    .limit(1);
  return row ?? null;
}

export async function listPlans(): Promise<MembershipPlan[]> {
  return getDb().select().from(membershipPlans).orderBy(membershipPlans.code);
}

export async function createPlan(
  data: Omit<MembershipPlanInsert, "createdAt" | "updatedAt">
): Promise<MembershipPlan> {
  const [row] = await getDb()
    .insert(membershipPlans)
    .values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  if (!row) throw new Error("Membership plan create failed");
  return row;
}

// ---- Memberships ----

export async function createMembership(
  data: Omit<MembershipInsert, "createdAt" | "updatedAt">
): Promise<Membership> {
  const [row] = await getDb()
    .insert(memberships)
    .values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  if (!row) throw new Error("Membership create failed");
  return row;
}

export async function getMembershipById(id: string): Promise<Membership | null> {
  const [row] = await getDb()
    .select()
    .from(memberships)
    .where(eq(memberships.id, id))
    .limit(1);
  return row ?? null;
}

export async function getMembershipsByProfileId(
  profileId: string
): Promise<Membership[]> {
  return getDb()
    .select()
    .from(memberships)
    .where(eq(memberships.profileId, profileId))
    .orderBy(desc(memberships.createdAt));
}

export async function getActiveMembershipByProfileId(
  profileId: string
): Promise<Membership | null> {
  const [row] = await getDb()
    .select()
    .from(memberships)
    .where(
      and(
        eq(memberships.profileId, profileId),
        eq(memberships.status, "active")
      )
    )
    .orderBy(desc(memberships.createdAt))
    .limit(1);
  return row ?? null;
}

export async function updateMembership(
  id: string,
  data: Partial<Omit<MembershipInsert, "id" | "createdAt">>
): Promise<Membership | null> {
  const [row] = await getDb()
    .update(memberships)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(memberships.id, id))
    .returning();
  return row ?? null;
}
