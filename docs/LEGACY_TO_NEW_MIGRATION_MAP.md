# Legacy to New Schema — Migration Mapping

This document maps each legacy model and key field from root `models.py` (and related tables) to the future-state schema in **FUTURE_STATE_SCHEMA.md**. Use it to write ETL scripts that extract from the legacy DB and load into the new Postgres (Supabase) database.

**Conventions:**
- **Legacy** = table/column in the current Flask/SQLAlchemy app.
- **New** = table/column in platform-v2 future-state schema.
- **Retire** = do not migrate; replace with explicit logic or config.
- **ID mapping tables** (e.g. `legacy_profile_map`) are recommended for ETL to keep `legacy_*_id` → `new UUID` mapping.

---

## 1. ID mapping tables (create first)

Create these in the **new** database to store legacy → new ID mappings. Populate during migration; use for foreign key resolution in later steps.

| New table | Purpose |
|-----------|---------|
| legacy_profile_map | legacy_user_id (int) → new profile id (UUID); legacy admin_id → profile id |
| legacy_restaurant_map | legacy restaurant_id → new restaurants.id (UUID) |
| legacy_restaurant_admin_map | legacy restaurant_admin_id → new restaurant_admins.id (UUID) |
| legacy_referral_code_map | legacy r_code (PK string) → new referral_codes.id (UUID) |
| legacy_promo_code_map | legacy promo_code (PK string) → new promo_codes.id (UUID) |
| legacy_gift_order_map | legacy gc_id → new gift_orders.id (UUID) |
| legacy_gift_code_map | legacy gcc_id (string) → new gift_codes.id (UUID) |
| legacy_payout_map | legacy payouts.id → new payouts.id (UUID) |
| legacy_redemption_map | legacy bottle_redeemed_id → new redemptions.id (UUID) |

Each mapping table: `legacy_id` (or legacy key), `new_id` (UUID), `created_at`.

---

## 2. User and Admin → profiles

| Legacy | New | Notes |
|--------|-----|--------|
| **user** | **profiles** | One profile per User. Also one profile per Admin. |
| **admin** | **profiles** | Merge Admin into profiles with role = 'admin'. |

### User → profiles (members)

| Legacy user.* | New profiles.* | Transformation / notes |
|--------------|----------------|-------------------------|
| user_id | — | Store in legacy_profile_map; do not use as PK. |
| first_name | first_name | |
| last_name | last_name | |
| email_address | email | |
| pass_hash | — | Retire; auth via Supabase Auth. Create auth.users row and use auth.users.id as profiles.id. |
| email_key | — | Migrate to password reset flow or store in metadata if needed. |
| last_login | last_login | |
| creation_date | creation_date | |
| active | active | |
| status | status | Map "active"/"inactive"/"new". |
| cancellation_email_sent | cancellation_email_sent | |
| on_email_list | on_email_list | |
| referral_code | — | Resolve to referral_codes.id → referral_code_id (after referral_codes migrated). |
| promo_code | promo_code | Keep as string for display; optionally FK to promo_codes.id later. |
| date_of_birth | metadata->date_of_birth or omit | Optional. |
| phone | phone | |
| plan_type | — | Map to membership_plans.id and create memberships row. |
| customer_id | billing_customer_id | Only if not sentinel; else leave NULL and set is_test_account. |
| transaction_id | — | Retire. Use to set is_test_account / payout_ignore (see below). |
| parent_admin_id | parent_restaurant_admin_id | Map to new restaurant_admins.id via legacy_restaurant_admin_map. |
| beta_user | metadata->beta_user or is_trial | |
| payout_ignore | payout_ignore | |
| cc_* / ma_* / zip | metadata or omit | Address in metadata if needed for support; not required in profiles. |
| expiration_date | — | Move to memberships.ends_at. |
| statusoverride | status_override | |

**Sentinel / retirement rules for User:**
- If `transaction_id` IN (`'000000001'`, `'00000001'`, `'222222222'`) OR `customer_id` IN (`'000000002'`, `'0000000002'`, `'00000002'`) → set `is_test_account = true`; leave `billing_customer_id` / `billing_subscription_id` NULL or legacy value in metadata.
- If `user_id == 13474` → set `payout_ignore = true` (or `is_test_account = true`).
- Do not copy sentinel strings into new billing fields.

### Admin → profiles (admins)

| Legacy admin.* | New profiles.* | Notes |
|----------------|----------------|--------|
| admin_id | — | legacy_profile_map admin_id → profiles.id |
| first_name | first_name | |
| last_name | last_name | |
| email_address | email | |
| pass_hash | — | Supabase Auth; create auth user, link by id. |
| email_key | — | Reset flow in new app. |
| last_login | last_login | |
| active | active | |

Set `role = 'admin'`, `restaurant_id = NULL`, `billing_* = NULL`.

---

## 3. Restaurant, RestaurantAdmin → restaurants, restaurant_admins

### Restaurant → restaurants

| Legacy restaurant.* | New restaurants.* | Notes |
|--------------------|-------------------|--------|
| restaurant_id | — | legacy_restaurant_map → restaurants.id |
| code | code | |
| legal_name | legal_name | |
| name | name | |
| admin_email | admin_email | |
| admin_phone | admin_phone | |
| safe_url | safe_url (and slug) | Set slug = safe_url or generate from name+city; ensure unique. |
| plaza_name | metadata or omit | |
| address_1, address_2, city, state, zip_code | same | |
| phone | phone | |
| why_should_visit, fine_print | same | |
| website, menu_link | same | |
| price_range | price_range | |
| cuisine_1, cuisine_2, cuisine_3 | same | |
| dining_style, dietary, etc. | same | |
| featured | featured | |
| active | active | |
| portal | portal_enabled | |
| referral_code | — | Resides on ReferralCode; restaurant gets code via restaurant_admin. |
| logo_path | logo_path | |
| latitude, longitude | same | |
| document_path | document_path | |
| business_hours, attire | same | |
| facebook_page, instagram_page | same | |
| kdsadmin_notes | kdsadmin_notes | |
| created, last_updated | created_at, updated_at | |

### RestaurantAdmin → restaurant_admins

| Legacy restaurant_admin.* | New restaurant_admins.* | Notes |
|--------------------------|-------------------------|--------|
| restaurant_admin_id | — | legacy_restaurant_admin_map → id (UUID) |
| restaurant_id | restaurant_id | Map via legacy_restaurant_map. |
| email_address | email | |
| email_key | email_key | |
| pass_hash | — | Auth via Supabase; create profile with role restaurant_admin, link profile_id. |
| first_name, last_name | — | Store on profile when merging; or keep in metadata. |
| referral_code | — | Resolve via ReferralCode → referral_codes. |
| restaurant_portal_active | restaurant_portal_active | |
| has_restaurant_plus | has_restaurant_plus | |
| creation_date | created_at | |
| last_login | — | On profile. |
| parent_admin_id | parent_admin_id | Map -1 → NULL; else via legacy_restaurant_admin_map. |
| customer_id, transaction_id | billing_customer_id or omit | Retire sentinel; optional for legacy. |

Create a **profile** for each RestaurantAdmin (role = 'restaurant_admin', restaurant_id = new restaurant id), then set restaurant_admins.profile_id. If auth migration is deferred, leave profile_id NULL and use email_key for invite/login until cutover.

---

## 4. ReferralCode → referral_codes

| Legacy referral_code.* | New referral_codes.* | Notes |
|------------------------|----------------------|--------|
| r_code | r_code | PK in legacy; unique in new. |
| user_id | profile_id | Map via legacy_profile_map. |
| restaurant_admin_id | restaurant_admin_id | Map via legacy_restaurant_admin_map. |

Constraint: exactly one of profile_id or restaurant_admin_id set. Create referral_codes after profiles and restaurant_admins. Then backfill profiles.referral_code_id where User had a ReferralCode.

---

## 5. PromoCode → promo_codes

| Legacy promo_code.* | New promo_codes.* | Notes |
|--------------------|-------------------|--------|
| promo_code | promo_code | PK → unique. |
| promo_desc | promo_desc | |
| active | active | |
| promo_start_date | promo_start_date | |
| promo_end_date | promo_end_date | |
| restaurant_referrer_id | restaurant_admin_id | Map via legacy_restaurant_admin_map. |
| plus_referrer_id | plus_referrer_id | Map to profiles.id via legacy_profile_map. |
| QT_referrer | qt_referrer | |
| creation_date | created_at | |

---

## 6. GiftCertificates, GiftCertificateCodes → gift_orders, gift_codes

### GiftCertificates → gift_orders

| Legacy gift_certificates.* | New gift_orders.* | Notes |
|----------------------------|-------------------|--------|
| gc_id | — | legacy_gift_order_map → gift_orders.id |
| email_address | purchaser_email | |
| cc_first_name | purchaser_first_name | |
| cc_last_name | purchaser_last_name | |
| transaction_id | billing_transaction_id | |
| total_charge | total_cents | Convert to cents. |
| expiration_date | — | Optional on order or on gift_codes. |
| three, six, twelve | — | Expand to N rows in gift_codes (3/6/12 month, count = three/six/twelve). |
| notes | notes | |
| creation_date | created_at | |
| cc_address, cc_* | metadata or omit | |

purchaser_profile_id: optional; if purchaser later created an account, link. Otherwise NULL.

### GiftCertificateCodes → gift_codes

| Legacy gift_certificate_codes.* | New gift_codes.* | Notes |
|---------------------------------|------------------|--------|
| gcc_id | code | Keep as unique code string. |
| gc_id | gift_order_id | Map via legacy_gift_order_map. |
| user_id | redeemed_profile_id | Map via legacy_profile_map; NULL if not yet redeemed. |
| duration | duration_months | 3, 6, or 12. |
| filename | pdf_filename | |

Create one gift_codes row per legacy GiftCertificateCodes row. status = 'redeemed' if user_id was set, else 'available'. redeemed_membership_id: set if you migrate membership linkage; else NULL.

**GcGcc:** Retire; relationship is gift_codes.gift_order_id.

---

## 7. BottleRedeemed → redemptions

| Legacy bottle_redeemed.* | New redemptions.* | Notes |
|--------------------------|-------------------|--------|
| bottle_redeemed_id | — | legacy_redemption_map |
| date | redeemed_at | |
| user_id | profile_id | Map via legacy_profile_map. |
| restaurant_admin_id | restaurant_admin_id | Map via legacy_restaurant_admin_map. |
| restaurant_id | restaurant_id | Map via legacy_restaurant_map. |

method: Infer from data — if user_id set use 'member_scan', if restaurant_admin_id set use 'restaurant_scan'. membership_id: Optional; resolve from profile’s active membership at redeemed_at if needed. allowed_again_at = date + 7 days.

---

## 8. Payout, PayoutReferral → payouts, payout_items

### Payout → payouts

| Legacy payouts.* | New payouts.* | Notes |
|------------------|---------------|--------|
| id | — | legacy_payout_map → payouts.id (UUID) |
| user_id | recipient_profile_id | Map via legacy_profile_map; NULL if restaurant payout. |
| restaurant_id | recipient_restaurant_id | Map via legacy_restaurant_map; NULL if user payout. |
| status | status | Map 0→draft/pending_submission, 1→pending_approval, 2→approved, 3→paid, 4→rejected. |
| created_at | created_at | |
| payout_date | payout_date | |
| approved_at | approved_at | |
| paid_at | paid_at | |
| amount | amount_cents | Convert to cents. |

period_start / period_end: Legacy may not have; derive from populate_payouts logic (e.g. first/last day of paid month) or leave NULL and backfill from payout_date. created_by_admin_id: Optional; if audit exists.

### PayoutReferral → payout_items

| Legacy payout_referrals.* | New payout_items.* | Notes |
|---------------------------|---------------------|--------|
| id | — | |
| payout_id | payout_id | Map via legacy_payout_map. |
| user_id | referred_profile_id | Map via legacy_profile_map. |
| amount | amount_cents | Convert to cents. |
| created_at | created_at | |

referral_id: If referrals table is populated from legacy (inferred from User.referral_code + creation_date), link; else NULL. reason: e.g. 'AMBASSADOR_REFERRAL', 'CLASSIC_REFERRAL' from referred user’s plan_type.

---

## 9. TremendousRecord → tremendous_records

| Legacy tremendous_records.* | New tremendous_records.* | Notes |
|-----------------------------|--------------------------|--------|
| id | — | New UUID. |
| payout_id | payout_id | Map via legacy_payout_map. |
| tremendous_order_id | tremendous_order_id | |
| tremendous_reward_id | tremendous_reward_id | |
| status | status | Map 0→pending, 1→paid, 2→rejected. |
| created_at | created_at | |
| updated_at | updated_at | |

---

## 10. Memberships (derived from User)

Legacy has no separate memberships table; plan and dates live on User. Migration:

- Insert **membership_plans** from known plan_type values (CLASSIC, AMBASSADOR, 3MONTHGIFTMEMBERSHIP, etc.).
- For each User with a plan_type and (optionally) transaction_id/customer_id not sentinel:
  - Create **memberships** row: profile_id (mapped), plan_id (from plan_type), status from User.status/active, starts_at = creation_date, ends_at = expiration_date if present.
  - Set source = 'direct' or 'gift' (if plan is gift type) or 'promo' (if promo_code set).

---

## 11. Referrals (inferred)

Legacy has no dedicated “referrals” table; attribution is User.referral_code = sponsor’s r_code. For migration:

- For each User U with U.referral_code set and U not in sentinel list:
  - Find ReferralCode RC where RC.r_code = U.referral_code.
  - Create **referrals** row: referred_profile_id = U’s new profile id, referral_code_id = RC’s new id, attributed_at = U.creation_date, status = 'active'.
  - Optionally set referred_membership_id to U’s first membership id (if created).

---

## 12. Content and CMS

| Legacy | New | Notes |
|--------|-----|--------|
| faq_category | faq_categories | category_id → id (UUID), title, ordering. |
| faq_question | faq_questions | question_id → id, category_id FK mapped, question_body, answer_body, ordering. |
| videos | videos | video_id → id, ordering, embed_code, eat_page, join_page. |
| ad | ads | ad_id → id, ad_photo_path, ad_url, ad_title, ad_description, active. |
| marketing_material | marketing_materials | marketing_material_id → id, title, description, photo_path, active, list_of_restaurants → list or junction. |
| cuisines | cuisines | id → id (UUID), name. |
| itb_apps | itb_applications | user_id → profile_id, application_status enum. |
| newsletter_subscription | newsletter_subscriptions | newsletter_subscription_id → id, email_address → email, name. |
| restaurant_suggestion | restaurant_suggestions | Straight column map. |
| restaurant_photo | restaurant_photos | restaurant_id mapped, path, ordering. |

---

## 13. Retired / not migrated

- **Errors (err), Err400:** Use app logging; optional error_events table in new system.
- **RecurlyLog (recurly_data):** Optional: copy to audit or external log; not required in core schema.
- **wine_selection, user_restaurant_subscription:** Migrate if still used; else retire. user_restaurant_subscription → optional newsletter_or_interest table.
- **Sentinel values:** Do not copy `transaction_id` / `customer_id` sentinel strings into new billing fields; use is_test_account, payout_ignore.
- **Hardcoded 13474:** Set payout_ignore (or is_test_account) on that profile.
- **Date literal 2024-08-01:** Store in system_settings as legacy_referral_cutoff if needed for reporting; do not hardcode in app logic.

---

## 14. Suggested ETL order

1. Create new schema (all tables and enums).
2. Create and populate **membership_plans**.
3. **profiles:** User + Admin → profiles (with legacy_profile_map); create auth.users if doing auth cutover.
4. **restaurants** (with legacy_restaurant_map).
5. **restaurant_admins** (with legacy_restaurant_admin_map); link profiles for restaurant admins.
6. **referral_codes** (with legacy_referral_code_map); backfill profiles.referral_code_id.
7. **promo_codes** (with legacy_promo_code_map).
8. **memberships** (from User + membership_plans).
9. **gift_orders** + **gift_codes** (with legacy maps).
10. **referrals** (inferred from User.referral_code).
11. **redemptions** (from BottleRedeemed).
12. **payouts** + **payout_items** (from Payout, PayoutReferral).
13. **tremendous_records**.
14. **audit_logs**, **system_settings**, **email_events** (optional; from logs or leave empty).
15. Content: faq_categories, faq_questions, videos, ads, marketing_materials, cuisines, itb_applications, newsletter_subscriptions, restaurant_photos, restaurant_suggestions.
16. **plan_payout_rates** (seed from business rules: AMBASSADOR/CLASSIC × member/restaurant amounts).

---

## 15. Unresolved migration risks

- **Auth cutover:** If legacy uses session + pass_hash, decide: one-time password reset for all users, or temporary “legacy login” that creates Supabase user on first login and links to profile. Storing legacy_user_id in profiles.metadata helps support lookups during transition.
- **Dual billing (Recurly + Authorize):** Legacy users on Authorize have no single subscription id in new provider. Options: migrate Recurly-only first; or create “legacy” membership rows with status from last known sync and no billing_subscription_id until they re-subscribe.
- **Redeem URL semantics:** Legacy redeem used user_id in URL for restaurant flow (with int division). New schema uses explicit restaurant_id/restaurant_admin_id; redirects or URL changes required.
- **Gift PDFs:** Legacy PDFs in `/static/giftcertificates/`; new system may generate new PDFs. Preserve pdf_filename and path for historical access; new flow uses new storage.
- **Payout report CSVs:** Legacy writes to `/static/payout_reports/`. New system should write to object storage or internal report table; preserve external_batch_id and metadata for audit.
- **Sub-admins (User with parent_admin_id):** New schema has parent_restaurant_admin_id on profiles; ensure portal access logic respects this and does not require separate “staff” table until needed.
- **ITB/First Responder:** Plan types and ITBApps migration straightforward; approval workflow and file_path storage need to align with new storage (e.g. Supabase Storage).
