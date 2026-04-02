import * as dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const globalForDb = globalThis as unknown as {
  pool?: Pool;
};

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!globalForDb.pool) {
    globalForDb.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  return globalForDb.pool;
}

export function getDb() {
  const pool = getPool();
  return drizzle(pool);
}