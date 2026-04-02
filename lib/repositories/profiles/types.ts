/**
 * Profile repository types.
 * Inferred from DB schema; use for API and service layer.
 */

import type { profiles } from "@/lib/db/schema/tables";

export type Profile = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;

export type AppRole = "member" | "restaurant_admin" | "admin";
