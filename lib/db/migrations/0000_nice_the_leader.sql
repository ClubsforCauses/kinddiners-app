DO $$ BEGIN
  CREATE TYPE "app_role" AS ENUM (
    'member',
    'restaurant_admin',
    'restaurant_staff',
    'admin',
    'super_admin'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "membership_status" AS ENUM (
    'active',
    'inactive',
    'trial',
    'canceled',
    'expired',
    'paused'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "membership_source" AS ENUM (
    'direct',
    'referral',
    'promo',
    'gift',
    'admin'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "gift_code_status" AS ENUM (
    'available',
    'redeemed',
    'expired',
    'canceled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "payout_status" AS ENUM (
    'pending',
    'approved',
    'paid',
    'failed',
    'canceled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "redemption_method" AS ENUM (
    'qr',
    'manual',
    'staff',
    'admin'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "tremendous_order_status" AS ENUM (
    'pending',
    'approved',
    'processed',
    'paid',
    'failed',
    'canceled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
  CREATE TYPE "email_event_type" AS ENUM (
    'transactional',
    'marketing',
    'system',
    'notification'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint