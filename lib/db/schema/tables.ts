/**
 * Table definitions for platform-v2.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 * Circular FKs (profiles <-> referral_codes, memberships <-> gift_codes) are omitted;
 * add via migration or enforce in app.
 */

import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  date,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  appRoleEnum,
  membershipStatusEnum,
  membershipSourceEnum,
  payoutStatusEnum,
  tremendousOrderStatusEnum,
  redemptionMethodEnum,
  giftCodeStatusEnum,
  emailEventTypeEnum,
} from "./enums";

// ---- Membership plans (no FKs) ----
export const membershipPlans = pgTable(
  "membership_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    name: text("name"),
    billingIntervalMonths: integer("billing_interval_months").notNull(),
    priceCents: integer("price_cents"),
    isGiftEligible: boolean("is_gift_eligible").default(false),
    isReferralEligible: boolean("is_referral_eligible").default(false),
    isTrial: boolean("is_trial").default(false),
    legacyPlanType: varchar("legacy_plan_type", { length: 20 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => []
);

// ---- Restaurants (no FKs) ----
export const restaurants = pgTable(
  "restaurants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    safeUrl: varchar("safe_url", { length: 100 }),
    code: varchar("code", { length: 10 }).unique(),
    name: varchar("name", { length: 100 }).notNull(),
    legalName: varchar("legal_name", { length: 255 }),
    adminEmail: varchar("admin_email", { length: 255 }),
    adminPhone: varchar("admin_phone", { length: 20 }),
    address1: varchar("address_1", { length: 100 }),
    address2: varchar("address_2", { length: 50 }),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 50 }),
    zipCode: varchar("zip_code", { length: 10 }),
    phone: varchar("phone", { length: 20 }),
    latitude: integer("latitude"), // TODO: use real/numeric in DB if needed
    longitude: integer("longitude"),
    whyShouldVisit: text("why_should_visit"),
    finePrint: text("fine_print"),
    website: varchar("website", { length: 255 }),
    menuLink: varchar("menu_link", { length: 255 }),
    priceRange: varchar("price_range", { length: 5 }),
    cuisine1: varchar("cuisine_1", { length: 255 }),
    cuisine2: varchar("cuisine_2", { length: 255 }),
    cuisine3: varchar("cuisine_3", { length: 255 }),
    diningStyle: varchar("dining_style", { length: 255 }),
    dietary: varchar("dietary", { length: 255 }),
    takesReservation: boolean("takes_reservation").default(false),
    goodForGroups: boolean("good_for_groups").default(false),
    kidFriendly: varchar("kid_friendly", { length: 20 }),
    dogFriendly: varchar("dog_friendly", { length: 20 }),
    parking: varchar("parking", { length: 255 }),
    wifi: boolean("wifi").default(false),
    featured: boolean("featured").default(false),
    active: boolean("active").default(false),
    portalEnabled: boolean("portal_enabled").default(false),
    logoPath: varchar("logo_path", { length: 255 }),
    documentPath: varchar("document_path", { length: 255 }),
    businessHours: text("business_hours"),
    attire: varchar("attire", { length: 50 }),
    facebookPage: varchar("facebook_page", { length: 255 }),
    instagramPage: varchar("instagram_page", { length: 255 }),
    kdsadminNotes: text("kdsadmin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("restaurants_active_idx").on(t.active),
    index("restaurants_featured_idx").on(t.featured),
  ]
);

// ---- Profiles (FK restaurant_id only; referral_code_id column without FK to avoid cycle) ----
export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey(),
    role: appRoleEnum("role").notNull(),
    email: text("email").notNull().unique(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    phone: text("phone"),
    avatarUrl: text("avatar_url"),
    active: boolean("active").default(true),
    status: text("status"),
    statusOverride: varchar("status_override", { length: 10 }),
    payoutIgnore: boolean("payout_ignore").default(false),
    isTestAccount: boolean("is_test_account").default(false),
    cancellationEmailSent: boolean("cancellation_email_sent").default(false),
    onEmailList: boolean("on_email_list").default(false),
    referralCodeId: uuid("referral_code_id"),
    promoCode: varchar("promo_code", { length: 20 }),
    parentRestaurantAdminId: uuid("parent_restaurant_admin_id"),
    restaurantId: uuid("restaurant_id").references(() => restaurants.id),
    billingCustomerId: varchar("billing_customer_id", { length: 255 }),
    billingSubscriptionId: varchar("billing_subscription_id", { length: 255 }),
    creationDate: timestamp("creation_date", { withTimezone: true }).defaultNow(),
    lastLogin: timestamp("last_login", { withTimezone: true }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("profiles_email_idx").on(t.email),
    index("profiles_role_idx").on(t.role),
    index("profiles_restaurant_id_idx").on(t.restaurantId),
    index("profiles_billing_customer_id_idx").on(t.billingCustomerId),
    index("profiles_billing_subscription_id_idx").on(t.billingSubscriptionId),
    index("profiles_referral_code_id_idx").on(t.referralCodeId),
  ]
);

// ---- Restaurant admins ----
export const restaurantAdmins = pgTable("restaurant_admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  profileId: uuid("profile_id").references(() => profiles.id),
  email: varchar("email", { length: 255 }).notNull(),
  emailKey: varchar("email_key", { length: 20 }).unique(),
  hasRestaurantPlus: boolean("has_restaurant_plus").default(false),
  restaurantPortalActive: boolean("restaurant_portal_active").default(false),
  parentAdminId: uuid("parent_admin_id"), // self-FK added in migration if needed
  billingCustomerId: varchar("billing_customer_id", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ---- Referral codes ----
export const referralCodes = pgTable(
  "referral_codes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    rCode: varchar("r_code", { length: 20 }).notNull().unique(),
    profileId: uuid("profile_id").references(() => profiles.id),
    restaurantAdminId: uuid("restaurant_admin_id").references(
      () => restaurantAdmins.id
    ),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => []
);

// ---- Promo codes ----
export const promoCodes = pgTable(
  "promo_codes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    promoCode: varchar("promo_code", { length: 20 }).notNull().unique(),
    promoDesc: varchar("promo_desc", { length: 256 }),
    active: boolean("active").default(false),
    promoStartDate: date("promo_start_date"),
    promoEndDate: date("promo_end_date"),
    restaurantAdminId: uuid("restaurant_admin_id").references(
      () => restaurantAdmins.id
    ),
    plusReferrerId: uuid("plus_referrer_id").references(() => profiles.id),
    qtReferrer: boolean("qt_referrer").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => []
);

// ---- Gift orders ----
export const giftOrders = pgTable("gift_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  purchaserProfileId: uuid("purchaser_profile_id").references(() => profiles.id),
  purchaserEmail: varchar("purchaser_email", { length: 255 }).notNull(),
  purchaserFirstName: varchar("purchaser_first_name", { length: 100 }),
  purchaserLastName: varchar("purchaser_last_name", { length: 100 }),
  billingTransactionId: varchar("billing_transaction_id", { length: 255 }),
  totalCents: integer("total_cents").notNull(),
  status: varchar("status", { length: 20 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ---- Gift codes (no FK to memberships to avoid cycle) ----
export const giftCodes = pgTable(
  "gift_codes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    giftOrderId: uuid("gift_order_id")
      .notNull()
      .references(() => giftOrders.id),
    code: varchar("code", { length: 32 }).notNull().unique(),
    durationMonths: integer("duration_months").notNull(),
    redeemedProfileId: uuid("redeemed_profile_id").references(() => profiles.id),
    redeemedMembershipId: uuid("redeemed_membership_id"),
    status: giftCodeStatusEnum("status").default("available"),
    expiresAt: date("expires_at"),
    pdfFilename: varchar("pdf_filename", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("gift_codes_gift_order_id_idx").on(t.giftOrderId),
    index("gift_codes_redeemed_profile_id_idx").on(t.redeemedProfileId),
  ]
);

// ---- Memberships ----
export const memberships = pgTable(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id),
    planId: uuid("plan_id")
      .notNull()
      .references(() => membershipPlans.id),
    status: membershipStatusEnum("status").notNull(),
    source: membershipSourceEnum("source").default("direct"),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    billingCustomerId: varchar("billing_customer_id", { length: 255 }),
    billingSubscriptionId: varchar("billing_subscription_id", {
      length: 255,
    }),
    referralCodeId: uuid("referral_code_id").references(() => referralCodes.id),
    promoCodeId: uuid("promo_code_id").references(() => promoCodes.id),
    giftCodeId: uuid("gift_code_id").references(() => giftCodes.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("memberships_profile_id_idx").on(t.profileId),
    index("memberships_plan_id_idx").on(t.planId),
    index("memberships_status_idx").on(t.status),
    index("memberships_billing_subscription_id_idx").on(t.billingSubscriptionId),
  ]
);

// ---- Member QR codes ----
export const memberQrCodes = pgTable("member_qr_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id),
  code: varchar("code", { length: 64 }).unique(),
  status: varchar("status", { length: 20 }).default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  deactivatedAt: timestamp("deactivated_at", { withTimezone: true }),
});

// ---- Referrals ----
export const referrals = pgTable(
  "referrals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referredProfileId: uuid("referred_profile_id")
      .notNull()
      .references(() => profiles.id),
    referralCodeId: uuid("referral_code_id")
      .notNull()
      .references(() => referralCodes.id),
    referredMembershipId: uuid("referred_membership_id").references(
      () => memberships.id
    ),
    attributedAt: timestamp("attributed_at", { withTimezone: true }).defaultNow(),
    status: varchar("status", { length: 20 }),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("referrals_referred_profile_id_idx").on(t.referredProfileId),
    index("referrals_referral_code_id_idx").on(t.referralCodeId),
  ]
);

// ---- Redemptions ----
export const redemptions = pgTable(
  "redemptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id").references(() => profiles.id),
    restaurantAdminId: uuid("restaurant_admin_id").references(
      () => restaurantAdmins.id
    ),
    restaurantId: uuid("restaurant_id")
      .notNull()
      .references(() => restaurants.id),
    membershipId: uuid("membership_id").references(() => memberships.id),
    redeemedAt: timestamp("redeemed_at", { withTimezone: true }).defaultNow(),
    method: redemptionMethodEnum("method").notNull(),
    qrCodeId: uuid("qr_code_id").references(() => memberQrCodes.id),
    notes: text("notes"),
    allowedAgainAt: timestamp("allowed_again_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("redemptions_profile_id_idx").on(t.profileId),
    index("redemptions_restaurant_id_idx").on(t.restaurantId),
    index("redemptions_restaurant_admin_id_idx").on(t.restaurantAdminId),
    index("redemptions_redeemed_at_idx").on(t.redeemedAt),
  ]
);

// ---- Payouts ----
export const payouts = pgTable(
  "payouts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    recipientProfileId: uuid("recipient_profile_id").references(
      () => profiles.id
    ),
    recipientRestaurantId: uuid("recipient_restaurant_id").references(
      () => restaurants.id
    ),
    status: payoutStatusEnum("status").notNull(),
    periodStart: date("period_start"),
    periodEnd: date("period_end"),
    amountCents: integer("amount_cents").default(0),
    payoutDate: date("payout_date"),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdByAdminId: uuid("created_by_admin_id").references(() => profiles.id),
    provider: varchar("provider", { length: 20 }).default("tremendous"),
    externalBatchId: varchar("external_batch_id", { length: 64 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => []
);

// ---- Payout items ----
export const payoutItems = pgTable("payout_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  payoutId: uuid("payout_id")
    .notNull()
    .references(() => payouts.id),
  referralId: uuid("referral_id"),
  referredProfileId: uuid("referred_profile_id").references(() => profiles.id),
  amountCents: integer("amount_cents").notNull(),
  reason: varchar("reason", { length: 50 }),
  status: varchar("status", { length: 20 }).default("included"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ---- Tremendous records ----
export const tremendousRecords = pgTable("tremendous_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  payoutId: uuid("payout_id")
    .notNull()
    .references(() => payouts.id),
  tremendousOrderId: varchar("tremendous_order_id", { length: 32 }).notNull(),
  tremendousRewardId: varchar("tremendous_reward_id", { length: 32 }),
  status: tremendousOrderStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ---- Plan payout rates ----
export const planPayoutRates = pgTable(
  "plan_payout_rates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    planCode: varchar("plan_code", { length: 50 }).notNull(),
    recipientType: varchar("recipient_type", { length: 20 }).notNull(),
    amountCents: integer("amount_cents").notNull(),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    uniqueIndex("plan_payout_rates_plan_code_recipient_type_idx").on(
      t.planCode,
      t.recipientType
    ),
  ]
);

// ---- Audit logs ----
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorProfileId: uuid("actor_profile_id").references(() => profiles.id),
    action: varchar("action", { length: 100 }).notNull(),
    entityType: varchar("entity_type", { length: 50 }),
    entityId: uuid("entity_id"),
    dataBefore: jsonb("data_before"),
    dataAfter: jsonb("data_after"),
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("audit_logs_actor_profile_id_idx").on(t.actorProfileId),
    index("audit_logs_entity_idx").on(t.entityType, t.entityId),
    index("audit_logs_created_at_idx").on(t.createdAt),
  ]
);

// ---- System settings ----
export const systemSettings = pgTable("system_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  updatedByProfileId: uuid("updated_by_profile_id").references(
    () => profiles.id
  ),
});

// ---- Email events ----
export const emailEvents = pgTable(
  "email_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventType: emailEventTypeEnum("event_type").notNull(),
    recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
    subject: text("subject"),
    templateId: varchar("template_id", { length: 100 }),
    entityType: varchar("entity_type", { length: 50 }),
    entityId: uuid("entity_id"),
    sentAt: timestamp("sent_at", { withTimezone: true }).defaultNow(),
    providerMessageId: varchar("provider_message_id", { length: 255 }),
    metadata: jsonb("metadata"),
  },
  (t) => [
    index("email_events_recipient_email_idx").on(t.recipientEmail),
    index("email_events_sent_at_idx").on(t.sentAt),
  ]
);
