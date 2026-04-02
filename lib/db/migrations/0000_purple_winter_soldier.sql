CREATE TYPE "public"."app_role" AS ENUM('member', 'restaurant_admin', 'admin');--> statement-breakpoint
CREATE TYPE "public"."email_event_type" AS ENUM('welcome', 'cancel', 'renewal', 'gift_delivery', 'password_reset', 'referral', 'other');--> statement-breakpoint
CREATE TYPE "public"."gift_code_status" AS ENUM('available', 'redeemed', 'expired', 'revoked');--> statement-breakpoint
CREATE TYPE "public"."itb_application_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."membership_source" AS ENUM('direct', 'promo', 'gift', 'complimentary', 'itb', 'first_responder');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('active', 'canceled', 'past_due', 'trialing', 'gifted', 'expired', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."payout_status" AS ENUM('draft', 'pending_submission', 'pending_approval', 'approved', 'paid', 'rejected', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."redemption_method" AS ENUM('member_scan', 'restaurant_scan');--> statement-breakpoint
CREATE TYPE "public"."tremendous_order_status" AS ENUM('pending', 'paid', 'rejected', 'canceled');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_profile_id" uuid,
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50),
	"entity_id" uuid,
	"data_before" jsonb,
	"data_after" jsonb,
	"ip" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" "email_event_type" NOT NULL,
	"recipient_email" varchar(255) NOT NULL,
	"subject" text,
	"template_id" varchar(100),
	"entity_type" varchar(50),
	"entity_id" uuid,
	"sent_at" timestamp with time zone DEFAULT now(),
	"provider_message_id" varchar(255),
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gift_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gift_order_id" uuid NOT NULL,
	"code" varchar(32) NOT NULL,
	"duration_months" integer NOT NULL,
	"redeemed_profile_id" uuid,
	"redeemed_membership_id" uuid,
	"status" "gift_code_status" DEFAULT 'available',
	"expires_at" date,
	"pdf_filename" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "gift_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gift_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purchaser_profile_id" uuid,
	"purchaser_email" varchar(255) NOT NULL,
	"purchaser_first_name" varchar(100),
	"purchaser_last_name" varchar(100),
	"billing_transaction_id" varchar(255),
	"total_cents" integer NOT NULL,
	"status" varchar(20),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member_qr_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"code" varchar(64),
	"status" varchar(20) DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now(),
	"deactivated_at" timestamp with time zone,
	CONSTRAINT "member_qr_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "membership_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" text,
	"billing_interval_months" integer NOT NULL,
	"price_cents" integer,
	"is_gift_eligible" boolean DEFAULT false,
	"is_referral_eligible" boolean DEFAULT false,
	"is_trial" boolean DEFAULT false,
	"legacy_plan_type" varchar(20),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "membership_plans_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"status" "membership_status" NOT NULL,
	"source" "membership_source" DEFAULT 'direct',
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"canceled_at" timestamp with time zone,
	"billing_customer_id" varchar(255),
	"billing_subscription_id" varchar(255),
	"referral_code_id" uuid,
	"promo_code_id" uuid,
	"gift_code_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payout_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payout_id" uuid NOT NULL,
	"referral_id" uuid,
	"referred_profile_id" uuid,
	"amount_cents" integer NOT NULL,
	"reason" varchar(50),
	"status" varchar(20) DEFAULT 'included',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipient_profile_id" uuid,
	"recipient_restaurant_id" uuid,
	"status" "payout_status" NOT NULL,
	"period_start" date,
	"period_end" date,
	"amount_cents" integer DEFAULT 0,
	"payout_date" date,
	"approved_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"created_by_admin_id" uuid,
	"provider" varchar(20) DEFAULT 'tremendous',
	"external_batch_id" varchar(64),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan_payout_rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_code" varchar(50) NOT NULL,
	"recipient_type" varchar(20) NOT NULL,
	"amount_cents" integer NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role" "app_role" NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"avatar_url" text,
	"active" boolean DEFAULT true,
	"status" text,
	"status_override" varchar(10),
	"payout_ignore" boolean DEFAULT false,
	"is_test_account" boolean DEFAULT false,
	"cancellation_email_sent" boolean DEFAULT false,
	"on_email_list" boolean DEFAULT false,
	"referral_code_id" uuid,
	"promo_code" varchar(20),
	"parent_restaurant_admin_id" uuid,
	"restaurant_id" uuid,
	"billing_customer_id" varchar(255),
	"billing_subscription_id" varchar(255),
	"creation_date" timestamp with time zone DEFAULT now(),
	"last_login" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"promo_code" varchar(20) NOT NULL,
	"promo_desc" varchar(256),
	"active" boolean DEFAULT false,
	"promo_start_date" date,
	"promo_end_date" date,
	"restaurant_admin_id" uuid,
	"plus_referrer_id" uuid,
	"qt_referrer" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "promo_codes_promo_code_unique" UNIQUE("promo_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "redemptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid,
	"restaurant_admin_id" uuid,
	"restaurant_id" uuid NOT NULL,
	"membership_id" uuid,
	"redeemed_at" timestamp with time zone DEFAULT now(),
	"method" "redemption_method" NOT NULL,
	"qr_code_id" uuid,
	"notes" text,
	"allowed_again_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referral_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"r_code" varchar(20) NOT NULL,
	"profile_id" uuid,
	"restaurant_admin_id" uuid,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "referral_codes_r_code_unique" UNIQUE("r_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referred_profile_id" uuid NOT NULL,
	"referral_code_id" uuid NOT NULL,
	"referred_membership_id" uuid,
	"attributed_at" timestamp with time zone DEFAULT now(),
	"status" varchar(20),
	"note" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant_admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"restaurant_id" uuid NOT NULL,
	"profile_id" uuid,
	"email" varchar(255) NOT NULL,
	"email_key" varchar(20),
	"has_restaurant_plus" boolean DEFAULT false,
	"restaurant_portal_active" boolean DEFAULT false,
	"parent_admin_id" uuid,
	"billing_customer_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "restaurant_admins_email_key_unique" UNIQUE("email_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"safe_url" varchar(100),
	"code" varchar(10),
	"name" varchar(100) NOT NULL,
	"legal_name" varchar(255),
	"admin_email" varchar(255),
	"admin_phone" varchar(20),
	"address_1" varchar(100),
	"address_2" varchar(50),
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(10),
	"phone" varchar(20),
	"latitude" integer,
	"longitude" integer,
	"why_should_visit" text,
	"fine_print" text,
	"website" varchar(255),
	"menu_link" varchar(255),
	"price_range" varchar(5),
	"cuisine_1" varchar(255),
	"cuisine_2" varchar(255),
	"cuisine_3" varchar(255),
	"dining_style" varchar(255),
	"dietary" varchar(255),
	"takes_reservation" boolean DEFAULT false,
	"good_for_groups" boolean DEFAULT false,
	"kid_friendly" varchar(20),
	"dog_friendly" varchar(20),
	"parking" varchar(255),
	"wifi" boolean DEFAULT false,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT false,
	"portal_enabled" boolean DEFAULT false,
	"logo_path" varchar(255),
	"document_path" varchar(255),
	"business_hours" text,
	"attire" varchar(50),
	"facebook_page" varchar(255),
	"instagram_page" varchar(255),
	"kdsadmin_notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "restaurants_slug_unique" UNIQUE("slug"),
	CONSTRAINT "restaurants_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_settings" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"value" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	"updated_by_profile_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tremendous_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payout_id" uuid NOT NULL,
	"tremendous_order_id" varchar(32) NOT NULL,
	"tremendous_reward_id" varchar(32),
	"status" "tremendous_order_status" DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_profile_id_profiles_id_fk" FOREIGN KEY ("actor_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gift_codes" ADD CONSTRAINT "gift_codes_gift_order_id_gift_orders_id_fk" FOREIGN KEY ("gift_order_id") REFERENCES "public"."gift_orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gift_codes" ADD CONSTRAINT "gift_codes_redeemed_profile_id_profiles_id_fk" FOREIGN KEY ("redeemed_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gift_orders" ADD CONSTRAINT "gift_orders_purchaser_profile_id_profiles_id_fk" FOREIGN KEY ("purchaser_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member_qr_codes" ADD CONSTRAINT "member_qr_codes_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_plan_id_membership_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."membership_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_referral_code_id_referral_codes_id_fk" FOREIGN KEY ("referral_code_id") REFERENCES "public"."referral_codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_promo_code_id_promo_codes_id_fk" FOREIGN KEY ("promo_code_id") REFERENCES "public"."promo_codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_gift_code_id_gift_codes_id_fk" FOREIGN KEY ("gift_code_id") REFERENCES "public"."gift_codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payout_items" ADD CONSTRAINT "payout_items_payout_id_payouts_id_fk" FOREIGN KEY ("payout_id") REFERENCES "public"."payouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payout_items" ADD CONSTRAINT "payout_items_referred_profile_id_profiles_id_fk" FOREIGN KEY ("referred_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payouts" ADD CONSTRAINT "payouts_recipient_profile_id_profiles_id_fk" FOREIGN KEY ("recipient_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payouts" ADD CONSTRAINT "payouts_recipient_restaurant_id_restaurants_id_fk" FOREIGN KEY ("recipient_restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payouts" ADD CONSTRAINT "payouts_created_by_admin_id_profiles_id_fk" FOREIGN KEY ("created_by_admin_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_restaurant_admin_id_restaurant_admins_id_fk" FOREIGN KEY ("restaurant_admin_id") REFERENCES "public"."restaurant_admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_plus_referrer_id_profiles_id_fk" FOREIGN KEY ("plus_referrer_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_restaurant_admin_id_restaurant_admins_id_fk" FOREIGN KEY ("restaurant_admin_id") REFERENCES "public"."restaurant_admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_membership_id_memberships_id_fk" FOREIGN KEY ("membership_id") REFERENCES "public"."memberships"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_qr_code_id_member_qr_codes_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."member_qr_codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_restaurant_admin_id_restaurant_admins_id_fk" FOREIGN KEY ("restaurant_admin_id") REFERENCES "public"."restaurant_admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_profile_id_profiles_id_fk" FOREIGN KEY ("referred_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referral_code_id_referral_codes_id_fk" FOREIGN KEY ("referral_code_id") REFERENCES "public"."referral_codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_membership_id_memberships_id_fk" FOREIGN KEY ("referred_membership_id") REFERENCES "public"."memberships"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_admins" ADD CONSTRAINT "restaurant_admins_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_admins" ADD CONSTRAINT "restaurant_admins_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "system_settings" ADD CONSTRAINT "system_settings_updated_by_profile_id_profiles_id_fk" FOREIGN KEY ("updated_by_profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tremendous_records" ADD CONSTRAINT "tremendous_records_payout_id_payouts_id_fk" FOREIGN KEY ("payout_id") REFERENCES "public"."payouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_logs_actor_profile_id_idx" ON "audit_logs" USING btree ("actor_profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_events_recipient_email_idx" ON "email_events" USING btree ("recipient_email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_events_sent_at_idx" ON "email_events" USING btree ("sent_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gift_codes_gift_order_id_idx" ON "gift_codes" USING btree ("gift_order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gift_codes_redeemed_profile_id_idx" ON "gift_codes" USING btree ("redeemed_profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_profile_id_idx" ON "memberships" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_plan_id_idx" ON "memberships" USING btree ("plan_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_status_idx" ON "memberships" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_billing_subscription_id_idx" ON "memberships" USING btree ("billing_subscription_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "plan_payout_rates_plan_code_recipient_type_idx" ON "plan_payout_rates" USING btree ("plan_code","recipient_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "profiles_email_idx" ON "profiles" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "profiles_role_idx" ON "profiles" USING btree ("role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "profiles_restaurant_id_idx" ON "profiles" USING btree ("restaurant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "profiles_billing_customer_id_idx" ON "profiles" USING btree ("billing_customer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "profiles_billing_subscription_id_idx" ON "profiles" USING btree ("billing_subscription_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "profiles_referral_code_id_idx" ON "profiles" USING btree ("referral_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "redemptions_profile_id_idx" ON "redemptions" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "redemptions_restaurant_id_idx" ON "redemptions" USING btree ("restaurant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "redemptions_restaurant_admin_id_idx" ON "redemptions" USING btree ("restaurant_admin_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "redemptions_redeemed_at_idx" ON "redemptions" USING btree ("redeemed_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "referrals_referred_profile_id_idx" ON "referrals" USING btree ("referred_profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "referrals_referral_code_id_idx" ON "referrals" USING btree ("referral_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "restaurants_active_idx" ON "restaurants" USING btree ("active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "restaurants_featured_idx" ON "restaurants" USING btree ("featured");