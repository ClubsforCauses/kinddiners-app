/**
 * Profile repository: CRUD and lookup for profiles (members, restaurant_admins, admins).
 * Roles: member | restaurant_admin | admin.
 */

import { eq, and, desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { profiles } from "@/lib/db/schema/tables";
import type { Profile, ProfileInsert, AppRole } from "./types";

export type { Profile, ProfileInsert, AppRole } from "./types";

export async function createProfile(
  data: Omit<ProfileInsert, "createdAt" | "updatedAt"> & { id: string }
): Promise<Profile> {
  const [row] = await db
    .insert(profiles)
    .values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  if (!row) throw new Error("Profile create failed");
  return row;
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const [row] = await db.select().from(profiles).where(eq(profiles.id, id)).limit(1);
  return row ?? null;
}

export async function getProfileByEmail(email: string): Promise<Profile | null> {
  const [row] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.email, email.toLowerCase()))
    .limit(1);
  return row ?? null;
}

export async function getProfilesByRole(role: AppRole): Promise<Profile[]> {
  return db
    .select()
    .from(profiles)
    .where(eq(profiles.role, role))
    .orderBy(desc(profiles.creationDate));
}

export async function getProfileByRestaurantId(
  restaurantId: string
): Promise<Profile | null> {
  const [row] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.restaurantId, restaurantId))
    .limit(1);
  return row ?? null;
}

export async function updateProfile(
  id: string,
  data: Partial<Omit<ProfileInsert, "id" | "createdAt">>
): Promise<Profile | null> {
  const [row] = await db
    .update(profiles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(profiles.id, id))
    .returning();
  return row ?? null;
}

export async function updateLastLogin(id: string): Promise<void> {
  await db
    .update(profiles)
    .set({ lastLogin: new Date(), updatedAt: new Date() })
    .where(eq(profiles.id, id));
}
