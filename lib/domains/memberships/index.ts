/**
 * Memberships domain
 * Registration, subscription lifecycle, plan change, cancel, restore.
 * Models: profiles (User), billing provider.
 * Source: REVERSE_ENGINEERED_SPEC_AND_REBUILD_PLAN.md
 */

export const MEMBERSHIPS_DOMAIN = "memberships";

// Placeholder — implement with single billing provider (Stripe/Recurly)
export function getMembershipsDomain() {
  return MEMBERSHIPS_DOMAIN;
}
