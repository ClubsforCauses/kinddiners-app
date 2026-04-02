/**
 * Enums and status values for the future-state schema.
 * Align with docs/FUTURE_STATE_SCHEMA.md (Postgres ENUMs).
 */

export type AppRole = "member" | "restaurant_admin" | "admin";

export type MembershipStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "gifted"
  | "expired"
  | "inactive";

export type MembershipSource =
  | "direct"
  | "promo"
  | "gift"
  | "complimentary"
  | "itb"
  | "first_responder";

export type PayoutStatus =
  | "draft"
  | "pending_submission"
  | "pending_approval"
  | "approved"
  | "paid"
  | "rejected"
  | "canceled";

export type TremendousOrderStatus = "pending" | "paid" | "rejected" | "canceled";

export type RedemptionMethod = "member_scan" | "restaurant_scan";

export type GiftCodeStatus = "available" | "redeemed" | "expired" | "revoked";

export type ItbApplicationStatus = "pending" | "approved" | "rejected";

export type EmailEventType =
  | "welcome"
  | "cancel"
  | "renewal"
  | "gift_delivery"
  | "password_reset"
  | "referral"
  | "other";
