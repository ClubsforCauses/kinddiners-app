/**
 * Member QR codes and redemptions (visits).
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { UUID } from "./profiles";
import type { RedemptionMethod } from "./enums";

export interface MemberQrCode {
  id: UUID;
  profile_id: UUID;
  code: string | null;
  status: string;
  created_at: string;
  deactivated_at: string | null;
}

export interface Redemption {
  id: UUID;
  profile_id: UUID | null;
  restaurant_admin_id: UUID | null;
  restaurant_id: UUID;
  membership_id: UUID | null;
  redeemed_at: string;
  method: RedemptionMethod;
  qr_code_id: UUID | null;
  notes: string | null;
  allowed_again_at: string | null;
  created_at: string;
}
