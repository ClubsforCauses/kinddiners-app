/**
 * Payouts, payout items, and Tremendous records.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { UUID } from "./profiles";
import type { PayoutStatus, TremendousOrderStatus } from "./enums";

export interface Payout {
  id: UUID;
  recipient_profile_id: UUID | null;
  recipient_restaurant_id: UUID | null;
  status: PayoutStatus;
  period_start: string | null;
  period_end: string | null;
  amount_cents: number;
  payout_date: string | null;
  approved_at: string | null;
  paid_at: string | null;
  created_by_admin_id: UUID | null;
  provider: string;
  external_batch_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PayoutItem {
  id: UUID;
  payout_id: UUID;
  referral_id: UUID | null;
  referred_profile_id: UUID | null;
  amount_cents: number;
  reason: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TremendousRecord {
  id: UUID;
  payout_id: UUID;
  tremendous_order_id: string;
  tremendous_reward_id: string | null;
  status: TremendousOrderStatus;
  created_at: string;
  updated_at: string;
}
