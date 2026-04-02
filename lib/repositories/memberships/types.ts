/**
 * Membership and membership plan repository types.
 */

import type { membershipPlans, memberships } from "@/lib/db/schema/tables";

export type MembershipPlan = typeof membershipPlans.$inferSelect;
export type MembershipPlanInsert = typeof membershipPlans.$inferInsert;

export type Membership = typeof memberships.$inferSelect;
export type MembershipInsert = typeof memberships.$inferInsert;
