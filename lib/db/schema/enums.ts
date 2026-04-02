/**
 * Postgres ENUMs for platform-v2.
 * Align with docs/FUTURE_STATE_SCHEMA.md
 */

import { pgEnum } from "drizzle-orm/pg-core";

export const appRoleEnum = pgEnum("app_role", [
  "member",
  "restaurant_admin",
  "admin",
]);

export const membershipStatusEnum = pgEnum("membership_status", [
  "active",
  "canceled",
  "past_due",
  "trialing",
  "gifted",
  "expired",
  "inactive",
]);

export const membershipSourceEnum = pgEnum("membership_source", [
  "direct",
  "promo",
  "gift",
  "complimentary",
  "itb",
  "first_responder",
]);

export const payoutStatusEnum = pgEnum("payout_status", [
  "draft",
  "pending_submission",
  "pending_approval",
  "approved",
  "paid",
  "rejected",
  "canceled",
]);

export const tremendousOrderStatusEnum = pgEnum("tremendous_order_status", [
  "pending",
  "paid",
  "rejected",
  "canceled",
]);

export const redemptionMethodEnum = pgEnum("redemption_method", [
  "member_scan",
  "restaurant_scan",
]);

export const giftCodeStatusEnum = pgEnum("gift_code_status", [
  "available",
  "redeemed",
  "expired",
  "revoked",
]);

export const itbApplicationStatusEnum = pgEnum("itb_application_status", [
  "pending",
  "approved",
  "rejected",
]);

export const emailEventTypeEnum = pgEnum("email_event_type", [
  "welcome",
  "cancel",
  "renewal",
  "gift_delivery",
  "password_reset",
  "referral",
  "other",
]);
