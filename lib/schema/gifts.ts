/**
 * Gift orders and gift codes.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { UUID } from "./profiles";
import type { GiftCodeStatus } from "./enums";

export interface GiftOrder {
  id: UUID;
  purchaser_profile_id: UUID | null;
  purchaser_email: string;
  purchaser_first_name: string | null;
  purchaser_last_name: string | null;
  billing_transaction_id: string | null;
  total_cents: number;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface GiftCode {
  id: UUID;
  gift_order_id: UUID;
  code: string;
  duration_months: number;
  redeemed_profile_id: UUID | null;
  redeemed_membership_id: UUID | null;
  status: GiftCodeStatus;
  expires_at: string | null;
  pdf_filename: string | null;
  created_at: string;
  updated_at: string;
}
