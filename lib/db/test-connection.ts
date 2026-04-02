/**
 * Test database connection and verify schema
 */

import { getDb } from "./client";
import { sql } from "drizzle-orm";

async function testConnection() {
  console.log("Testing database connection...\n");
  const db = getDb();

  try {
    const result = await db.execute(sql`SELECT version()`);
    console.log("✓ Database connected successfully");
    console.log("  PostgreSQL version:", result.rows[0].version);
    console.log();

    const tables = await db.execute(sql`
      SELECT tablename
      FROM pg_catalog.pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);

    console.log(`✓ Found ${tables.rows.length} tables in public schema:`);
    tables.rows.forEach((row: any) => {
      console.log(`  - ${row.tablename}`);
    });
    console.log();

    const enums = await db.execute(sql`
      SELECT typname
      FROM pg_type
      WHERE typtype = 'e'
      AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      ORDER BY typname
    `);

    console.log(`✓ Found ${enums.rows.length} ENUMs:`);
    enums.rows.forEach((row: any) => {
      console.log(`  - ${row.typname}`);
    });
    console.log();

    console.log("✓ Database setup verification complete!\n");

  } catch (error) {
    console.error("Error testing database connection:", error);
    process.exit(1);
  }
}

testConnection()
  .then(() => {
    console.log("All checks passed!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
