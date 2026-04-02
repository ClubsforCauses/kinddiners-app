/**
 * Referral codes, referrals, and promo codes.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { UUID } from "./profiles";

export interface ReferralCode {
  id: UUID;
  r_code: string;
  profile_id: UUID | null;
  restaurant_admin_id: UUID | null;
  active: boolean;
  created_at: string;
}

export interface Referral {
  id: UUID;
  referred_profile_id: UUID;
  referral_code_id: UUID;
  referred_membership_id: UUID | null;
  attributed_at: string;
  status: string | null;
  note: string | null;
  created_at: string;
}

export interface PromoCode {
  id: UUID;
  promo_code: string;
  promo_desc: string | null;
  active: boolean;
  promo_start_date: string | null;
  promo_end_date: string | null;
  restaurant_admin_id: UUID | null;
  plus_referrer_id: UUID | null;
  qt_referrer: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlanPayoutRate {
  id: UUID;
  plan_code: string;
  recipient_type: "member" | "restaurant";
  amount_cents: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}
