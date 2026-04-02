/**
 * Identity, auth, and membership types.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { AppRole, MembershipStatus, MembershipSource } from "./enums";

export type UUID = string;

export interface Profile {
  id: UUID;
  role: AppRole;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  active: boolean;
  status: string | null;
  status_override: string | null;
  payout_ignore: boolean;
  is_test_account: boolean;
  cancellation_email_sent: boolean;
  on_email_list: boolean;
  referral_code_id: UUID | null;
  promo_code: string | null;
  parent_restaurant_admin_id: UUID | null;
  restaurant_id: UUID | null;
  billing_customer_id: string | null;
  billing_subscription_id: string | null;
  creation_date: string; // ISO
  last_login: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MembershipPlan {
  id: UUID;
  code: string;
  name: string | null;
  billing_interval_months: number;
  price_cents: number | null;
  is_gift_eligible: boolean;
  is_referral_eligible: boolean;
  is_trial: boolean;
  legacy_plan_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: UUID;
  profile_id: UUID;
  plan_id: UUID;
  status: MembershipStatus;
  source: MembershipSource;
  starts_at: string | null;
  ends_at: string | null;
  canceled_at: string | null;
  billing_customer_id: string | null;
  billing_subscription_id: string | null;
  referral_code_id: UUID | null;
  promo_code_id: UUID | null;
  gift_code_id: UUID | null;
  created_at: string;
  updated_at: string;
}
