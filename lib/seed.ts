import { db } from "./client";

async function seed() {
  console.log("🌱 Seeding database...");

  await db.execute(`
    INSERT INTO membership_plans (id, code, name, billing_interval_months, price_cents)
    VALUES
      (gen_random_uuid(), 'CORE', 'Core Membership', 1, 4900),
      (gen_random_uuid(), 'AMBASSADOR', 'Ambassador Membership', 1, 9900)
    ON CONFLICT DO NOTHING;
  `);

  await db.execute(`
    INSERT INTO restaurants (id, slug, name, active)
    VALUES
      (gen_random_uuid(), 'demo-bistro', 'Demo Bistro', true),
      (gen_random_uuid(), 'kind-diners-cafe', 'Kind Diners Cafe', true)
    ON CONFLICT DO NOTHING;
  `);

  console.log("✅ Seed complete");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });