/**
 * Drizzle relations for platform-v2 schema.
 * Enables typed joins and nested queries.
 */

import { relations } from "drizzle-orm";
import {
  profiles,
  membershipPlans,
  memberships,
  restaurants,
  restaurantAdmins,
  referralCodes,
  referrals,
  promoCodes,
  giftOrders,
  giftCodes,
  redemptions,
  payouts,
  payoutItems,
  tremendousRecords,
  auditLogs,
  emailEvents,
} from "./tables";

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  restaurant: one(restaurants),
  referralCode: one(referralCodes, {
    fields: [profiles.referralCodeId],
    references: [referralCodes.id],
  }),
  parentRestaurantAdmin: one(restaurantAdmins, {
    fields: [profiles.parentRestaurantAdminId],
    references: [restaurantAdmins.id],
  }),
  memberships: many(memberships),
  referredReferrals: many(referrals),
  auditLogs: many(auditLogs),
}));

export const membershipPlansRelations = relations(
  membershipPlans,
  ({ many }) => ({
    memberships: many(memberships),
  })
);

export const membershipsRelations = relations(memberships, ({ one }) => ({
  profile: one(profiles),
  plan: one(membershipPlans),
  referralCode: one(referralCodes),
  promoCode: one(promoCodes),
  giftCode: one(giftCodes),
}));

export const restaurantsRelations = relations(restaurants, ({ many }) => ({
  admins: many(restaurantAdmins),
}));

export const restaurantAdminsRelations = relations(
  restaurantAdmins,
  ({ one, many }) => ({
    restaurant: one(restaurants),
    profile: one(profiles),
    parentAdmin: one(restaurantAdmins),
    referralCodes: many(referralCodes),
    promoCodes: many(promoCodes),
  })
);

export const referralCodesRelations = relations(referralCodes, ({ one, many }) => ({
  profile: one(profiles),
  restaurantAdmin: one(restaurantAdmins),
  referrals: many(referrals),
}));

export const referralsRelations = relations(referrals, ({ one }) => ({
  referredProfile: one(profiles),
  referralCode: one(referralCodes),
  referredMembership: one(memberships),
}));

export const promoCodesRelations = relations(promoCodes, ({ one }) => ({
  restaurantAdmin: one(restaurantAdmins),
  plusReferrer: one(profiles),
}));

export const giftOrdersRelations = relations(giftOrders, ({ one, many }) => ({
  purchaserProfile: one(profiles),
  giftCodes: many(giftCodes),
}));

export const giftCodesRelations = relations(giftCodes, ({ one }) => ({
  giftOrder: one(giftOrders),
  redeemedProfile: one(profiles),
}));

export const redemptionsRelations = relations(redemptions, ({ one }) => ({
  profile: one(profiles),
  restaurantAdmin: one(restaurantAdmins),
  restaurant: one(restaurants),
  membership: one(memberships),
}));

export const payoutsRelations = relations(payouts, ({ one, many }) => ({
  recipientProfile: one(profiles),
  recipientRestaurant: one(restaurants),
  createdByAdmin: one(profiles),
  items: many(payoutItems),
  tremendousRecords: many(tremendousRecords),
}));

export const payoutItemsRelations = relations(payoutItems, ({ one }) => ({
  payout: one(payouts),
  referredProfile: one(profiles),
}));

export const tremendousRecordsRelations = relations(
  tremendousRecords,
  ({ one }) => ({
    payout: one(payouts),
  })
);

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  actorProfile: one(profiles),
}));

export const emailEventsRelations = relations(emailEvents, () => ({}));
