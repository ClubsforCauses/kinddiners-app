import { getDb } from "./client";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");
  const db = getDb();

  await db.execute(sql`
    INSERT INTO membership_plans (
      id,
      code,
      name,
      billing_interval_months,
      price_cents,
      is_gift_eligible,
      is_referral_eligible,
      is_trial
    )
    VALUES
      (gen_random_uuid(), 'CORE', 'Core Membership', 1, 4900, true, false, false),
      (gen_random_uuid(), 'AMBASSADOR', 'Ambassador Membership', 1, 9900, true, true, false)
    ON CONFLICT (code) DO NOTHING;
  `);

  await db.execute(sql`
    INSERT INTO restaurants (
      id,
      slug,
      name,
      city,
      state,
      active,
      featured,
      portal_enabled
    )
    VALUES
      (gen_random_uuid(), 'demo-bistro', 'Demo Bistro', 'West Palm Beach', 'FL', true, true, false),
      (gen_random_uuid(), 'kind-diners-cafe', 'Kind Diners Cafe', 'Jupiter', 'FL', true, false, false)
    ON CONFLICT (slug) DO NOTHING;
  `);

  console.log("Seed complete.");
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });