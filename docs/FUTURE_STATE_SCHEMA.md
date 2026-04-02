# Kind Diners — Future-State Schema

This document defines the normalized Postgres schema for the platform-v2 rebuild. It preserves critical business behavior from the legacy system while retiring sentinel-value logic and dual billing. Target: **Supabase Postgres**; identity from **Supabase Auth** (`auth.users`).

**References:** `docs/SAAS_ARCHITECTURE_SPECIFICATION.md`, `docs/KIND_DINERS_MASTER_ARCHITECTURE_SPECIFICATION.md`, root `models.py`, `BUSINESS_RULES_AND_LEGACY_LOGIC.md`.

---

## 1. Principles

- **Single billing provider:** One `billing_customer_id` and `billing_subscription_id` per profile; no Authorize.net.
- **Explicit flags:** Use `payout_ignore`, `is_test_account`, `active`, `status` instead of sentinel `transaction_id`/`customer_id`.
- **Configurable rules:** Payout amounts and cutoff dates in `plan_payout_rates` and `system_settings`; no hardcoded user IDs or date literals.
- **UUID primary keys** for new app tables; `auth.users.id` (UUID) as profile identity.
- **Slug-based URLs:** Restaurants use unique `slug`; legacy `safe_url` mapped at redirect or migration.

---

## 2. Enums and status values

```sql
-- Role (who can log in and what they see)
CREATE TYPE app_role AS ENUM ('member', 'restaurant_admin', 'admin');

-- Membership / subscription
CREATE TYPE membership_status AS ENUM (
  'active', 'canceled', 'past_due', 'trialing', 'gifted', 'expired', 'inactive'
);
CREATE TYPE membership_source AS ENUM ('direct', 'promo', 'gift', 'complimentary', 'itb', 'first_responder');

-- Payout pipeline
CREATE TYPE payout_status AS ENUM (
  'draft', 'pending_submission', 'pending_approval', 'approved', 'paid', 'rejected', 'canceled'
);
CREATE TYPE tremendous_order_status AS ENUM ('pending', 'paid', 'rejected', 'canceled');

-- Redemption
CREATE TYPE redemption_method AS ENUM ('member_scan', 'restaurant_scan');

-- Gift code
CREATE TYPE gift_code_status AS ENUM ('available', 'redeemed', 'expired', 'revoked');

-- ITB application
CREATE TYPE itb_application_status AS ENUM ('pending', 'approved', 'rejected');

-- Email event (for audit)
CREATE TYPE email_event_type AS ENUM (
  'welcome', 'cancel', 'renewal', 'gift_delivery', 'password_reset', 'referral', 'other'
);
```

---

## 3. Core tables

### 3.1 Identity and auth

**profiles**  
App-level identity; one row per human/actor. Linked to Supabase `auth.users.id`.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK, FK → auth.users(id) | Same as auth.users.id |
| role | app_role | NOT NULL | member \| restaurant_admin \| admin |
| email | TEXT | UNIQUE NOT NULL | |
| first_name | TEXT | | |
| last_name | TEXT | | |
| phone | TEXT | | |
| avatar_url | TEXT | | |
| active | BOOLEAN | DEFAULT true | Account active; set false on cancel/sync |
| status | TEXT | | Subscription display status (e.g. active, inactive); synced from billing |
| status_override | VARCHAR(10) | | Admin override; legacy statusoverride |
| payout_ignore | BOOLEAN | DEFAULT false | Exclude from referral payout eligibility |
| is_test_account | BOOLEAN | DEFAULT false | Replaces sentinel IDs for test/freebee |
| cancellation_email_sent | BOOLEAN | DEFAULT false | |
| on_email_list | BOOLEAN | DEFAULT false | Newsletter/marketing |
| referral_code_id | UUID | FK → referral_codes(id) | Denorm: “their” referral code (if ambassador) |
| promo_code | VARCHAR(20) | | Code used at signup (display/reporting) |
| parent_restaurant_admin_id | UUID | FK → restaurant_admins(id) | Sub-admin link; NULL for non–sub-admin |
| restaurant_id | UUID | FK → restaurants(id) | Set when role = restaurant_admin (primary restaurant) |
| billing_customer_id | VARCHAR(255) | | Single provider customer ID |
| billing_subscription_id | VARCHAR(255) | | Single provider subscription ID |
| creation_date | TIMESTAMPTZ | DEFAULT now() | |
| last_login | TIMESTAMPTZ | | |
| metadata | JSONB | | Extensible (e.g. legacy_user_id for migration) |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** email, role, restaurant_id, billing_customer_id, billing_subscription_id, referral_code_id.

---

### 3.2 Membership plans and memberships

**membership_plans**  
Catalog of plans (replaces legacy plan_type string and VIP/Ultimate flags).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| code | VARCHAR(50) | UNIQUE NOT NULL | e.g. CLASSIC, AMBASSADOR, 3MONTHGIFTMEMBERSHIP |
| name | TEXT | | Display name |
| billing_interval_months | INT | | 1, 3, 6, 12; 0 = one-time/trial |
| price_cents | INT | | List price (optional; can come from billing provider) |
| is_gift_eligible | BOOLEAN | DEFAULT false | |
| is_referral_eligible | BOOLEAN | DEFAULT false | Can own referral code (e.g. Ambassador) |
| is_trial | BOOLEAN | DEFAULT false | |
| legacy_plan_type | VARCHAR(20) | | Map from legacy plan_type for migration |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**memberships**  
Active and historical subscriptions per profile.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| profile_id | UUID | FK → profiles(id) NOT NULL | |
| plan_id | UUID | FK → membership_plans(id) NOT NULL | |
| status | membership_status | NOT NULL | |
| source | membership_source | DEFAULT 'direct' | |
| starts_at | TIMESTAMPTZ | | |
| ends_at | TIMESTAMPTZ | | |
| canceled_at | TIMESTAMPTZ | | |
| billing_customer_id | VARCHAR(255) | | Denorm from profile if needed |
| billing_subscription_id | VARCHAR(255) | | |
| referral_code_id | UUID | FK → referral_codes(id) | Attribution at signup |
| promo_code_id | UUID | FK → promo_codes(id) | Promo used at signup |
| gift_code_id | UUID | FK → gift_codes(id) | Set when source = gift |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** profile_id, plan_id, status, billing_subscription_id.

---

### 3.3 Restaurants and portal

**restaurants**

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| slug | VARCHAR(100) | UNIQUE NOT NULL | Public URL segment; from safe_url or generated |
| safe_url | VARCHAR(100) | | Legacy; redirect to slug or drop |
| code | VARCHAR(10) | UNIQUE | Legacy restaurant code (portal/redeem) |
| name | VARCHAR(100) | | |
| legal_name | VARCHAR(255) | | |
| admin_email | VARCHAR(255) | | |
| admin_phone | VARCHAR(20) | | |
| address_1 | VARCHAR(100) | | |
| address_2 | VARCHAR(50) | | |
| city | VARCHAR(100) | | |
| state | VARCHAR(50) | | |
| zip_code | VARCHAR(10) | | |
| phone | VARCHAR(20) | | |
| latitude | NUMERIC | | |
| longitude | NUMERIC | | |
| why_should_visit | TEXT | | |
| fine_print | TEXT | | |
| website | VARCHAR(255) | | |
| menu_link | VARCHAR(255) | | |
| price_range | VARCHAR(5) | | |
| cuisine_1 | VARCHAR(255) | | |
| cuisine_2 | VARCHAR(255) | | |
| cuisine_3 | VARCHAR(255) | | |
| dining_style | VARCHAR(255) | | |
| dietary | VARCHAR(255) | | |
| takes_reservation | BOOLEAN | DEFAULT false | |
| good_for_groups | BOOLEAN | DEFAULT false | |
| kid_friendly | VARCHAR(20) | | |
| dog_friendly | VARCHAR(20) | | |
| parking | VARCHAR(255) | | |
| wifi | BOOLEAN | DEFAULT false | |
| featured | BOOLEAN | DEFAULT false | |
| active | BOOLEAN | DEFAULT false | |
| portal_enabled | BOOLEAN | DEFAULT false | Replaces legacy portal |
| logo_path | VARCHAR(255) | | |
| document_path | VARCHAR(255) | | |
| business_hours | TEXT | | |
| attire | VARCHAR(50) | | |
| facebook_page | VARCHAR(255) | | |
| instagram_page | VARCHAR(255) | | |
| kdsadmin_notes | TEXT | | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** slug, code, active, featured.

**restaurant_admins**  
Links a profile (or legacy email) to a restaurant for portal access.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| restaurant_id | UUID | FK → restaurants(id) NOT NULL | |
| profile_id | UUID | FK → profiles(id) | Nullable during migration; then required |
| email | VARCHAR(255) | NOT NULL | |
| email_key | VARCHAR(20) | UNIQUE | Password reset / invite |
| has_restaurant_plus | BOOLEAN | DEFAULT false | |
| restaurant_portal_active | BOOLEAN | DEFAULT false | |
| parent_admin_id | UUID | FK → restaurant_admins(id) | -1 → NULL; sub-admin |
| billing_customer_id | VARCHAR(255) | | Legacy; retire if unused |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Constraint:** One of (profile_id, email) required for login; profile_id preferred.

**restaurant_staff**  
Optional: staff members who can validate redemptions (e.g. PIN or QR); for future use.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| restaurant_id | UUID | FK → restaurants(id) NOT NULL | |
| name | VARCHAR(100) | | |
| pin_hash | VARCHAR(255) | | Optional PIN auth |
| role | VARCHAR(50) | | staff, manager, etc. |
| active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**restaurant_photos**

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| restaurant_id | UUID | FK → restaurants(id) NOT NULL | |
| path | VARCHAR(255) | | |
| ordering | INT | DEFAULT 0 | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

---

### 3.4 Referral and promo

**referral_codes**  
One code per sponsor (member or restaurant). Constraint: exactly one of profile_id or restaurant_admin_id set.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| r_code | VARCHAR(20) | UNIQUE NOT NULL | Public code (e.g. AB12345) |
| profile_id | UUID | FK → profiles(id) | Member (Ambassador) owner |
| restaurant_admin_id | UUID | FK → restaurant_admins(id) | Restaurant owner |
| active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

**Constraint:** CHECK ( (profile_id IS NOT NULL AND restaurant_admin_id IS NULL) OR (profile_id IS NULL AND restaurant_admin_id IS NOT NULL) ).

**referrals**  
Attribution: “this profile was referred by this code” (and which membership).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| referred_profile_id | UUID | FK → profiles(id) NOT NULL | |
| referral_code_id | UUID | FK → referral_codes(id) NOT NULL | |
| referred_membership_id | UUID | FK → memberships(id) | Membership at signup |
| attributed_at | TIMESTAMPTZ | DEFAULT now() | |
| status | VARCHAR(20) | | active, excluded, etc. |
| note | TEXT | | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** referred_profile_id, referral_code_id.

**promo_codes**

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| promo_code | VARCHAR(20) | UNIQUE NOT NULL | |
| promo_desc | VARCHAR(256) | | |
| active | BOOLEAN | DEFAULT false | |
| promo_start_date | DATE | | |
| promo_end_date | DATE | | |
| restaurant_admin_id | UUID | FK → restaurant_admins(id) | Restaurant-owned promo |
| plus_referrer_id | UUID | FK → profiles(id) | Ambassador-owned promo |
| qt_referrer | BOOLEAN | DEFAULT false | Kind Diners Society referrer |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

---

### 3.5 Gifts

**gift_orders**  
One row per purchase (replaces legacy gift_certificates for new flow).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| purchaser_profile_id | UUID | FK → profiles(id) | Optional; guest checkout |
| purchaser_email | VARCHAR(255) | NOT NULL | |
| purchaser_first_name | VARCHAR(100) | | |
| purchaser_last_name | VARCHAR(100) | | |
| billing_transaction_id | VARCHAR(255) | | Single provider transaction |
| total_cents | INT | | |
| status | VARCHAR(20) | | completed, refunded, etc. |
| notes | TEXT | | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**gift_codes**  
One per gift certificate (replaces gift_certificate_codes). One code per duration unit (3/6/12 month).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| gift_order_id | UUID | FK → gift_orders(id) NOT NULL | |
| code | VARCHAR(32) | UNIQUE NOT NULL | Redeemable token (e.g. gcc_id legacy) |
| duration_months | INT | NOT NULL | 3, 6, or 12 |
| redeemed_profile_id | UUID | FK → profiles(id) | Set on redeem |
| redeemed_membership_id | UUID | FK → memberships(id) | Membership created from gift |
| status | gift_code_status | DEFAULT 'available' | |
| expires_at | DATE | | Optional |
| pdf_filename | VARCHAR(255) | | Legacy filename for migration |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** code, gift_order_id, redeemed_profile_id.

---

### 3.6 Redemptions (visits)

**member_qr_codes**  
Optional: per-member QR for redemption; can be derived from profile id or dedicated code.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| profile_id | UUID | FK → profiles(id) NOT NULL | |
| code | VARCHAR(64) | UNIQUE | |
| status | VARCHAR(20) | DEFAULT 'active' | active, deactivated |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| deactivated_at | TIMESTAMPTZ | | |

**redemptions**  
One row per visit (replaces bottle_redeemed). 7-day cooldown enforced in app using allowed_again_at.

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| profile_id | UUID | FK → profiles(id) | Member who visited (member_scan) |
| restaurant_admin_id | UUID | FK → restaurant_admins(id) | Who scanned (restaurant_scan) |
| restaurant_id | UUID | FK → restaurants(id) NOT NULL | |
| membership_id | UUID | FK → memberships(id) | Membership used |
| redeemed_at | TIMESTAMPTZ | DEFAULT now() | |
| method | redemption_method | NOT NULL | member_scan \| restaurant_scan |
| qr_code_id | UUID | FK → member_qr_codes(id) | Optional |
| notes | TEXT | | |
| allowed_again_at | TIMESTAMPTZ | | redeemed_at + 7 days |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** profile_id, restaurant_id, restaurant_admin_id, redeemed_at.

---

### 3.7 Payouts

**payouts**  
One row per payout batch (per recipient per period). Recipient = profile (member) or restaurant (via restaurant_id).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| recipient_profile_id | UUID | FK → profiles(id) | Member payout |
| recipient_restaurant_id | UUID | FK → restaurants(id) | Restaurant payout |
| status | payout_status | NOT NULL | |
| period_start | DATE | | Payout period start |
| period_end | DATE | | Payout period end |
| amount_cents | INT | DEFAULT 0 | Total for this payout |
| payout_date | DATE | | |
| approved_at | TIMESTAMPTZ | | |
| paid_at | TIMESTAMPTZ | | |
| created_by_admin_id | UUID | FK → profiles(id) | Who approved (if applicable) |
| provider | VARCHAR(20) | DEFAULT 'tremendous' | |
| external_batch_id | VARCHAR(64) | | Tremendous batch or similar |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Constraint:** Exactly one of recipient_profile_id or recipient_restaurant_id set.

**payout_items**  
Line items: each referred user (or referral) contributing to a payout (replaces payout_referrals + amount on Payout).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| payout_id | UUID | FK → payouts(id) NOT NULL | |
| referral_id | UUID | FK → referrals(id) | Referral that generated this item |
| referred_profile_id | UUID | FK → profiles(id) | Denorm for display |
| amount_cents | INT | NOT NULL | |
| reason | VARCHAR(50) | | e.g. AMBASSADOR_REFERRAL, CLASSIC_REFERRAL |
| status | VARCHAR(20) | DEFAULT 'included' | included, removed, restored |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**tremendous_records**  
Tremendous order per payout (one-to-one or one-to-many depending on provider behavior).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| payout_id | UUID | FK → payouts(id) NOT NULL | |
| tremendous_order_id | VARCHAR(32) | NOT NULL | |
| tremendous_reward_id | VARCHAR(32) | | |
| status | tremendous_order_status | DEFAULT 'pending' | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

---

### 3.8 Plan payout rates (config)

**plan_payout_rates**  
Configurable payout amount by plan and recipient type (replaces hardcoded $3/$2 and $2.50/$1.50).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| plan_code | VARCHAR(50) | NOT NULL | Referred member’s plan (e.g. AMBASSADOR, CLASSIC) |
| recipient_type | VARCHAR(20) | NOT NULL | member \| restaurant |
| amount_cents | INT | NOT NULL | |
| active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |

**Unique:** (plan_code, recipient_type).

---

### 3.9 Audit and system

**audit_logs**

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| actor_profile_id | UUID | FK → profiles(id) | Who did it |
| action | VARCHAR(100) | NOT NULL | e.g. payout.approve, membership.cancel |
| entity_type | VARCHAR(50) | | payouts, profiles, restaurants, etc. |
| entity_id | UUID | | |
| data_before | JSONB | | |
| data_after | JSONB | | |
| ip | INET | | |
| user_agent | TEXT | | |
| created_at | TIMESTAMPTZ | DEFAULT now() | |

**Indexes:** actor_profile_id, entity_type, entity_id, created_at.

**system_settings**  
Key-value config (e.g. legacy_referral_cutoff_date, feature flags).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| key | VARCHAR(100) | PK | |
| value | TEXT | | JSON or plain |
| updated_at | TIMESTAMPTZ | DEFAULT now() | |
| updated_by_profile_id | UUID | FK → profiles(id) | |

**email_events**  
Log of sent emails (for audit and idempotency).

| Column | Type | Constraints | Notes |
|--------|------|-------------|--------|
| id | UUID | PK | |
| event_type | email_event_type | NOT NULL | |
| recipient_email | VARCHAR(255) | NOT NULL | |
| subject | TEXT | | |
| template_id | VARCHAR(100) | | |
| entity_type | VARCHAR(50) | | e.g. profiles, gift_codes |
| entity_id | UUID | | |
| sent_at | TIMESTAMPTZ | DEFAULT now() | |
| provider_message_id | VARCHAR(255) | | Resend/SendGrid id |
| metadata | JSONB | | |

**Indexes:** recipient_email, event_type, sent_at.

---

### 3.10 Content and CMS (concise)

**faq_categories** — id (UUID), title, ordering.  
**faq_questions** — id (UUID), category_id FK, question_body, answer_body, ordering.  
**videos** — id (UUID), ordering, embed_code, eat_page, join_page.  
**ads** — id (UUID), ad_photo_path, ad_url, ad_title, ad_description, active.  
**marketing_materials** — id (UUID), title, description, photo_path, active, list_of_restaurant_ids (or junction).  
**cuisines** — id (UUID), name UNIQUE.  
**itb_applications** — id (UUID), profile_id FK, application_status (itb_application_status), restaurant, supervisor, position, file_path, created_at, updated_at.  
**newsletter_subscriptions** — id (UUID), email UNIQUE, name.  
**restaurant_suggestions** — id (UUID), restaurant_name, restaurant_city, restaurant_state, restaurant_zip_code, reason, suggested_by, date.

---

## 4. Retired / not carried forward

- **Sentinel transaction_id / customer_id:** Replaced by `is_test_account`, `payout_ignore`, and single billing provider. No `000000001`, `222222222`, etc. in new schema.
- **Hardcoded user_id 13474:** Use `payout_ignore` or `is_test_account` on profile.
- **Dual billing (Recurly + Authorize):** Single provider only; no `is_recurly` or live Authorize API in schema.
- **User.get_subscription_status from Authorize in request path:** Status comes from webhooks + cached status on profile/membership.
- **GcGcc junction:** Replaced by gift_codes.gift_order_id.
- **BaseModel/FormModel mixins:** Not in DB; application-layer only.
- **err / err_400:** Use application logging and optional error_events table if needed; not required in core schema.

---

## 5. Migration mapping reference

See **LEGACY_TO_NEW_MIGRATION_MAP.md** for table-by-table and field-by-field mapping from legacy models to these tables.
