/**
 * Future-state schema types for Kind Diners platform-v2.
 * Use for API payloads, form validation, and DB layer when using Supabase/Postgres.
 *
 * Source: platform-v2/docs/FUTURE_STATE_SCHEMA.md
 * Migration: platform-v2/docs/LEGACY_TO_NEW_MIGRATION_MAP.md
 */

// Enums (align with Postgres ENUMs)
export type {
  AppRole,
  MembershipStatus,
  MembershipSource,
  PayoutStatus,
  TremendousOrderStatus,
  RedemptionMethod,
  GiftCodeStatus,
  ItbApplicationStatus,
  EmailEventType,
} from "./enums";

// Identity and memberships
export type { Profile, MembershipPlan, Membership } from "./profiles";
export type { UUID } from "./profiles";

// Restaurants and portal
export type {
  Restaurant,
  RestaurantAdmin,
  RestaurantStaff,
  RestaurantPhoto,
} from "./restaurants";

// Referrals and promo
export type {
  ReferralCode,
  Referral,
  PromoCode,
  PlanPayoutRate,
} from "./referrals";

// Gifts
export type { GiftOrder, GiftCode } from "./gifts";

// Redemptions
export type { MemberQrCode, Redemption } from "./redemptions";

// Payouts
export type { Payout, PayoutItem, TremendousRecord } from "./payouts";

// Audit and system
export type { AuditLog, SystemSetting, EmailEvent } from "./audit";
