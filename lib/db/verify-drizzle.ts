/**
 * Verify Drizzle ORM setup with repository layer
 */

import { listPlans } from "../repositories/memberships";

async function verifyDrizzle() {
  console.log("Testing Drizzle ORM repository layer...\n");

  try {
    const plans = await listPlans();

    console.log("✓ Successfully connected to database via Drizzle ORM");
    console.log(`✓ Retrieved ${plans.length} membership plans:\n`);

    plans.forEach((plan) => {
      console.log(`  - ${plan.code}: ${plan.name}`);
      console.log(`    Price: $${(plan.priceCents || 0) / 100}/month`);
      console.log(`    Billing: ${plan.billingIntervalMonths} months`);
      console.log(`    Referral eligible: ${plan.isReferralEligible ? 'Yes' : 'No'}`);
      console.log();
    });

    console.log("✓ Drizzle ORM repository layer working correctly!\n");

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

verifyDrizzle()
  .then(() => {
    console.log("All repository tests passed!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
