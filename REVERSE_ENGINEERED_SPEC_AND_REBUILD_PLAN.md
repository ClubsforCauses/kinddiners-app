# Kind Diners — Reverse-Engineered Spec & Rebuild Plan for platform-v2

**Source of truth:** Repository root `models.py` (database), `app_flask.py` (routes), `commands/` (CLI jobs).  
**Legacy app:** Not modified. This document drives implementation inside `/platform-v2` only.

---

## 1. Database Entities and Relationships (from root `models.py`)

### 1.1 Mixins and base (no tables)

- **BaseModel** — `add_object`, `update_object`, `delete_object`, `serialize`, `encrypt_string`, `decrypt_string`
- **FormModel** — `_form_errors`, `set_values(form, form_settings)`

### 1.2 Core entities

| Model | Table | Purpose | Key columns |
|-------|--------|---------|-------------|
| **Errors** | `err` | Server error log | error_id, first_occurred, last_occurred, occurrences, action, url, content, user_id, user_type, user_agent |
| **Err400** | `err_400` | 4xx error log | error_id, first_occurred, last_occurred, occurrences, url, err_code |
| **Admin** | `admin` | Platform admins | admin_id, first_name, last_name, email_address, pass_hash, email_key, last_login, active |
| **User** | `user` | Members (paying, trial, complimentary, sub-admins) | user_id, first_name, last_name, email_address, pass_hash, email_key, last_login, creation_date, active, status, cancellation_email_sent, referral_code, promo_code, plan_type, customer_id, transaction_id, parent_admin_id, beta_user, payout_ignore, expiration_date, statusoverride, cc_*, ma_*, zip |
| **GiftCertificates** | `gift_certificates` | Gift purchase header | gc_id, cc_first_name, cc_last_name, email_address, transaction_id, total_charge, three, six, twelve, expiration_date, creation_date |
| **GiftCertificateCodes** | `gift_certificate_codes` | Individual gift codes | gcc_id (PK string), gc_id (FK), user_id (FK nullable), duration, filename |
| **Restaurant** | `restaurant` | Partner restaurants | restaurant_id, code, name, legal_name, admin_email, safe_url, address_1, city, state, zip_code, cuisine_1/2/3, active, featured, portal, referral_code, logo_path, document_path, latitude, longitude, business_hours, etc. |
| **RestaurantAdmin** | `restaurant_admin` | Restaurant partner accounts | restaurant_admin_id, restaurant_id (FK), email_address, email_key, pass_hash, referral_code, has_restaurant_plus, parent_admin_id, customer_id, transaction_id, creation_date, last_login |
| **ReferralCode** | `referral_code` | Referral code ownership | r_code (PK), user_id (FK), restaurant_admin_id (FK) |
| **PromoCode** | `promo_code` | Promo codes for signup | promo_code (PK), promo_desc, active, promo_start_date, promo_end_date, restaurant_referrer_id (FK), plus_referrer_id (FK), QT_referrer, creation_date |
| **BottleRedeemed** | `bottle_redeemed` | Visit/redemption log | bottle_redeemed_id, date, user_id (FK), restaurant_admin_id (FK), restaurant_id (FK) |
| **Payout** | `payouts` | Payout header | id, user_id (FK nullable), restaurant_id (FK nullable), status, amount, payout_date, approved_at, paid_at, created_at |
| **PayoutReferral** | `payout_referrals` | Referrals in a payout | id, payout_id (FK), user_id (FK), amount, created_at |
| **TremendousRecord** | `tremendous_records` | Tremendous order link | id, payout_id (FK), tremendous_order_id, tremendous_reward_id, status, created_at, updated_at |
| **RecurlyLog** | `recurly_data` | Recurly webhook log | id, entry_date, entry (JSON) |
| **ITBApps** | `itb_apps` | In-The-Biz applications | id, user_id (FK), application_status, restaurant, supervisor, position, file_path, created_at, updated_at |
| **RestaurantPhoto** | `restaurant_photo` | Restaurant images | restaurant_photo_id, restaurant_id (FK), path, ordering |
| **MarketingMaterial** | `marketing_material` | Marketing assets | marketing_material_id, title, description, photo_path, active, list_of_restaurants |
| **Ad** | `ad` | Ads | ad_id, ad_photo_path, ad_url, ad_title, ad_description, active |
| **FaqCategory** | `faq_category` | FAQ categories | category_id, title, ordering |
| **FaqQuestion** | `faq_question` | FAQ questions | question_id, category_id (FK), ordering, question_body, answer_body |
| **Videos** | `videos` | Video embeds | video_id, ordering, embed_code, eat_page, join_page |
| **NewsletterSubscription** | `newsletter_subscription` | Newsletter signups | newsletter_subscription_id, name, email_address |
| **RestaurantSuggestion** | `restaurant_suggestion` | User suggestions | restaurant_suggestion_id, restaurant_name, restaurant_city, restaurant_state, restaurant_zip_code, reason, suggested_by, date |
| **Cuisine** | `cuisines` | Cuisine types | id, name |
| **GcGcc** | `gc_gcc` | Join table (gc_id, gcc_id); note: GiftCertificateCodes.gcc_id is String(20), GcGcc.gcc_id is Integer — possible legacy inconsistency | gc_id (FK), gcc_id (FK) |

### 1.3 Association tables (no model class, used in relationships)

- **wine_selection** — restaurant_id, bottle_id (both PKs; wine_bottle is commented out)
- **user_restaurant_subscription** — restaurant_id, user_id (both PKs); `Restaurant.email_subscribers` uses this

### 1.4 Relationships (from `models.py`)

| From | Relationship | To | Backref / notes |
|------|--------------|-----|------------------|
| User | itb_apps (1:1) | ITBApps | backref="user" |
| User | parent_admin_id → RestaurantAdmin | RestaurantAdmin | subadmins on RestaurantAdmin |
| User | referral_code (string) | — | Denorm; actual ownership in ReferralCode.user_id |
| GiftCertificates | gift_certificate_codes | GiftCertificateCodes | back_populates gift_certificates |
| GiftCertificateCodes | gc_id → GiftCertificates, user_id → User | GiftCertificates, User | get_user property |
| Restaurant | photos | RestaurantPhoto | order_by ordering |
| Restaurant | email_subscribers | User | secondary=user_restaurant_subscription |
| RestaurantAdmin | restaurant | Restaurant | backref='admin' |
| RestaurantAdmin | subadmins | User | User.parent_admin_id |
| RestaurantAdmin | redemptions | BottleRedeemed | |
| ReferralCode | user, restaurant_admin | User, RestaurantAdmin | backref r_code on each |
| PromoCode | restaurant_admin, plus_user | RestaurantAdmin, User | |
| BottleRedeemed | restaurant | Restaurant | |
| Payout | user, restaurant | User, Restaurant | backref payouts |
| Payout | referrals | PayoutReferral | back_populates payout, cascade delete-orphan |
| Payout | tremendous_record | TremendousRecord | backref payouts, uselist=False |
| PayoutReferral | payout, user | Payout, User | backref payout_referrals on User |
| TremendousRecord | payout_id → Payout | Payout | |
| FaqCategory | questions | FaqQuestion | |
| FaqQuestion | category | FaqCategory | |

---

## 2. Route Groups (from `app_flask.py`)

Routes are defined only in `app_flask.py` (and `/job/db/backup` in `_backup.py`). Grouped by URL prefix and purpose.

| Group | Prefix / pattern | Auth | Purpose |
|-------|------------------|------|---------|
| **Public** | `/`, `/demo`, `/coming-soon`, `/restaurants`, `/restaurants/<safe_url>`, `/faq`, `/referralprogram`, `/gift_certificate`, `/gift-center`, `/memberships`, `/memberships/promo`, `/our_mission`, `/contact_us`, `/restaurant_partner`, `/show-me-the-money`, `/enormous_acts`, `/addto/mailinglist`, `/promo-trial`, `/<string:code>`, `/load-modal/<modal_name>`, `/<path:resource>` | None | Home, discovery, static, referral redirect |
| **Auth** | `/login`, `/logout`, `/password/reset/request/<user_type>`, `/password/reset/<user_type>/<email_key>`, `/restaurant-login`, `/admin` (GET/POST login) | None | Login and password reset |
| **Join / registration** | `/register/<reg_type>`, `/register/test`, `/register/free`, `/register/inf`, `/register/promo-end/<plan_type>`, `/extend/promo/<plan_type>/<promo_code>`, `/register/complimentary/<email_key>`, `/apply-promo`, `/process_registration`, `/register/success`, `/registration/complete`, `/registration/failed`, `/influencer`, `/payform`, `/restaurant/register/<email_key>` | None (or email_key) | Signup and post-payment |
| **Member** | `/profile`, `/refer`, `/user/settings/promo-code`, `/my_referrals/`, `/manage-membership`, `/set_membership`, `/update/membership`, `/subscription/change_plan`, `/subscription/cancel`, `/subscription/restore`, `/subscription/error`, `/qrcode`, `/redeem/<user_id>`, `/redeem/<user_id>/<user_type>`, `/restaurant-visit-log`, `/buy-gift`, `/delete-gift` | user or user+restaurant_admin | Profile, referrals, membership, redemption, gifts |
| **Restaurant portal** | `/restaurant-admin/dashboard`, `/restaurant-admin/welcome`, `/restaurant-admin/marketing`, `/restaurant-admin/referrals`, `/restaurant-admin/customer_referrals/`, `/restaurant-admin/logistics`, `/restaurant-admin/add-subadmin`, `/restaurant-admin/contract`, `/restaurant-admin/contact-us`, `/restaurant-admin/preview/`, `/marketing/download/<path>`, `/set_payout`, `/payout_report`, `/document/add` | restaurant_admin (or g.restaurant_admin for masquerade) | Portal pages |
| **Admin** | `/admin/dashboard`, `/admin/restaurants`, `/admin/settings/restaurant/cuisines`, `/admin/all`, `/admin/marketing`, `/admin/register`, `/admin//customer/allnew`, `/admin/customer/all`, `/admin/users`, `/admin/logs`, `/admin/check/subscription/by/subscriptionID/<subid>`, `/admin/pay_out_report`, `/admin/referral_report`, `/admin/inthebiz_applications`, approve/dismiss, `/admin/faq`, `/admin/faq/<category_id>`, `/admin/video`, `/admin/faq/reorder`, `/promo-codes`, `/admin/gift_admin`, `/customer-visits/list`, `/ads/upload`, `/presignups/all`, `/admin/portal-entrance/<safe_url>`, `/admin/portal-exit`, `/admin/update/all/url`, `/paywho`, `/restaurant/edit/<restaurant_id>`, `/restaurant/new`, `/send/test/dotsdev/payout`, `/send/live/dotsdev/payout/...`, `/testpage123`, `/setup/*`, `/test_membership_card` | admin | Back-office and setup |
| **API (JSON/form)** | `/api/v1/flash-message`, `/process_registration`, `/api/user/update-promo-code`, `/api/free/new`, `/api/restaurant/edit`, `/api/resend/restaurant-email`, `/api/restaurant/new`, `/api/restaurant/admin/add-subadmin`, `/api/restaurant/admin/delete-subadmin`, `/api/upload/photos`, `/api/photo/delete`, `/api/upload/marketing`, `/api/delete/marketing`, `/api/edit/marketing`, `/api/marketing/activation`, `/api/upload/logo`, `/api/promo-code/*`, `/api/upload/ad`, `/api/delete/ad`, `/api/edit/ad`, `/api/upload/document`, `/api/delete/document`, `/api/newsletter/subscription`, `/api/restaurant/activation`, `/api/ad/activation`, `/api/promo/email/send`, `/api/promo/sms/send`, `/api/rcode/email/send`, `/api/rcode/sms/send`, `/api/request_info/email/send`, `/api/message/email/send`, `/api/restaurants/filter`, `/api/set/coords`, `/api/create/document`, `/api/create/membership_card`, `/api/create/gift_certificate/<month>`, `/api/faq/*`, `/api/videos`, `/api/video_edit`, `/api/ordering/<photo_id>/<ordering>`, `/api/suggest/restaurant`, `/api/membership/status-check`, `/api/email/update`, `/api/restaurant/autocomplete`, `/api/check/email/exists`, `/api/check/rcode/exists`, `/api/check/phone/exists`, `/api/v1/admin/restore_payout`, `/api/v1/admin/restore_referral`, `/api/v1/admin/get_referred_users`, `/api/v1/admin/delete_referral`, `/api/v1/admin/payouts/approve`, `/api/v1/admin/payouts/reject`, `/api/cuisines/add`, `/api/cuisines/update/<id>`, `/api/cuisines/delete/<id>` | Varies by endpoint | CRUD and actions |
| **Webhooks** | `/recurly/data`, `/webhooks/tremendous` | Signature verification | Recurly log; Tremendous status update |
| **Internal jobs** | `/job/check-memberships`, `/job/db/backup` | HTTP Basic (tfapi + INTERNAL_API_KEY) | Membership sync; DB backup |

---

## 3. Routes → Models (Read/Write)

Summary of which routes read, insert, update, or delete which models. Source: ROUTE_MODEL_MAPPING.md and root code.

### 3.1 Read-only (query) by model

| Model | Routes that query it |
|-------|----------------------|
| User | login, profile, password_reset*, restaurant_login, set_membership, my_referrals, refer_friend, promo_code, restaurant_admin_logistics, add_restaurant_subadmins, customer_list, customer_list_new, users_list, check_subscription_by_subscriptionID, pay_out_report, referrals_report, get_referred_users, register_success, register_free, register_inf, extend_promo, free_user_register, giftcertificate_redeem, redeem, restaurant_visit_log, inthebiz_applications, presignups_list, api_restaurant_edit, api_admin_restaurant_subadmin_add, api_delete_subadmin, api_create_membership_card, api_membership_status_check, api_email_update, api_check_*; job_check_memberships; populate_payouts (User only) |
| Admin | login, admin_register (exists check), admin_list, password_reset_request |
| RestaurantAdmin | login, restaurant_register, password_reset_request, restaurant_portal_admin_entrance, add_restaurant_subadmins, restaurant_edit, api_restaurant_edit, api_resend_restaurant_email, api_admin_restaurant_subadmin_add, api_delete_subadmin; setup_referral_code_table |
| Restaurant | index, restaurants, restaurant_details, admin_restaurants, restaurant_edit, restaurant_admin_contract, restaurant_admin_preview, admin_marketing, pay_out_report, customer_visit_list, api_restaurants_filter, api_restaurant_autocomplete, update_all_safe_url_route, document_add, redeem (restaurant flow); get_matching_restaurants in populate_payouts |
| ReferralCode | process_registration, promo_redirect, free_user_register, user/settings/promo-code, update_promo_code, api_check_rcode_exists, paywho, setup_referral_code_table; User.get_referral_code, Restaurant.get_referral_code |
| PromoCode | process_registration, register_free, register_promo_end, extend_promo, admin_restaurants, restaurant_admin_promo_referral_codes, promo_codes, customer_list*, users_list, promo_memberships; api_add_promo_code, api_validate_promo |
| GiftCertificates | buy_gift, delete_gift, gift_admin | 
| GiftCertificateCodes | buy_gift, register_success, giftcertificate_redeem, gift_admin, influencer |
| BottleRedeemed | redeem, restaurant_visit_log, restaurant_admin_logistics, customer_visit_list |
| Payout | referrals_report, restore_payout, approve_payouts, reject_payouts, get_referred_users, restore_referral, delete_referral; tremendous_webhook; populate_payouts, tremendous_* commands |
| PayoutReferral | referrals_report, restore_referral, delete_referral, get_referred_users |
| TremendousRecord | tremendous_webhook; tremendous_submit_payouts, tremendous_release_approved_payouts |
| RecurlyLog | recurly_data (write only) |
| ITBApps | inthebiz_applications, approve_inthebiz_app, dismiss_inthebiz_app; register_success (create) |
| MarketingMaterial | restaurant_admin_marketing, admin_marketing, api_upload_marketing, api_delete_marketing, api_edit_marketing, api_marketing_activation |
| RestaurantPhoto | api_upload_photos, api_photo_delete, api_ordering_photo; restaurant_edit (via restaurant.photos) |
| FaqCategory, FaqQuestion | faq, admin_faq, reorder_questions, api_faq_* |
| Videos | admin_video, api_videos, api_video_edit |
| Ad | ads_upload, api_upload_ad, api_delete_ad, api_edit_ad, api_ad_activation |
| Cuisine | restaurant_new, cuisines, api_cuisines_* |
| NewsletterSubscription | api_newsletter/subscription (insert) |
| RestaurantSuggestion | api_suggest_restaurant (insert) |
| Err400 | not_found_404, unauthorized_403, method_not_allowed_405 (write) |
| Errors | save_error (add_error) from error handlers and BaseModel |

### 3.2 Write (insert/update/delete) by model

| Model | Insert | Update | Delete |
|-------|--------|--------|--------|
| User | process_registration, register_free, register_success, api_new_free; api_admin_restaurant_subadmin_add | process_registration, register_free, update_membership, subscription_*, register_success, subscription_error, profile, password_reset, extend_promo, free_user_register, api_restaurant_edit, api_delete_subadmin, api_membership_status_check, api_email_update; job_check_memberships; authorize_update_subscriptions | api_delete_subadmin (sub-admin User) |
| Admin | admin_register | login (last_login), password_reset_request (email_key), password_reset (pass_hash) | — |
| RestaurantAdmin | restaurant_register; api_restaurant_edit (add admin) | api_restaurant_edit, api_admin_restaurant_subadmin_add (parent), api_delete_subadmin; restaurant_login (last_login) | — |
| Restaurant | api_restaurant_add | api_restaurant_edit, api_upload_logo, api_upload_document, api_delete_document, api_create_document, api_restaurant_activation, update_all_safe_url_route, setup_cuisine_type | — |
| ReferralCode | process_registration (link), register_success (generate_rcode), setup_referral_code_table; User.generate_rcode, RestaurantAdmin.generate_rcode | — | — |
| PromoCode | api_add_promo_code | api_promo_activation, api_edit_promo | api_delete_promo |
| GiftCertificates | buy_gift | buy_gift (transaction_id) | delete_gift |
| GiftCertificateCodes | buy_gift | register_success (user_id), giftcertificate_redeem (user_id) | — (cascade or explicit in delete_gift) |
| BottleRedeemed | redeem | — | — |
| Payout | populate_payouts | restore_payout, approve_payouts, reject_payouts, restore_referral (recalc), delete_referral (recalc); tremendous_webhook | — |
| PayoutReferral | populate_payouts | restore_referral (active; app sets referral.active=True — column may exist in DB only) | delete_referral |
| TremendousRecord | tremendous_submit_payouts | tremendous_webhook, tremendous_release_approved_payouts | — |
| RecurlyLog | recurly_data | — | — |
| ITBApps | register_success | approve_inthebiz_app, dismiss_inthebiz_app | — |
| MarketingMaterial | api_upload_marketing | api_edit_marketing, api_marketing_activation | api_delete_marketing |
| RestaurantPhoto | api_upload_photos | api_ordering_photo | api_delete_photo |
| FaqCategory | api_faq_category_create | api_faq_category_update | api_faq_category_delete |
| FaqQuestion | api_faq_question_update (create path) | reorder_questions, api_faq_question_update | api_faq_question_delete |
| Videos | api_video_edit | api_video_edit | api_video_edit |
| Ad | api_upload_ad | api_edit_ad, api_ad_activation | api_delete_ad |
| Cuisine | add_cuisine | update_cuisine | delete_cuisine |
| NewsletterSubscription | api_newsletter_subscription | — | — |
| RestaurantSuggestion | api_suggest_restaurant | — | — |
| Errors | add_error (BaseModel, save_error) | add_error (occurrences, last_occurred) | — |
| Err400 | not_found_404, etc. | not_found_404 (occurrences) | — |

---

## 4. Workflows

### 4.1 Membership workflow

1. **Entry:** `/register/<reg_type>` or `/register/free`, `/register/complimentary/<email_key>`, `/register/inf`, `/promo-trial` (with session r_code), or gift redeem redirect.
2. **Form submit:** POST `/process_registration` — create User, set referral_code from session r_code, link ReferralCode if sponsor; or POST to Recurly then redirect to `/register/success` with params.
3. **Post-payment:** GET/POST `/register/success` — update User (customer_id, transaction_id, status, active, plan_type), create ReferralCode via `user.generate_rcode()` for AMBASSADOR, link GiftCertificateCodes if gift, create ITBApps for INTHEBIZ/FIRSTRESPONDERSMEMBERSHIP; send welcome email by plan_type.
4. **Ongoing:** `/update/membership` (payment profile), `/subscription/change_plan`, `/subscription/cancel`, `/subscription/restore` — call Recurly then update User. `/subscription/error` sets User.active = False.
5. **Sync:** `/job/check-memberships` (external URL per user; set active False + send cancellation email if not found); `flask update_subscriptions` (Authorize: set payout_ignore on mismatch).

### 4.2 Referral workflow

1. **Attribution:** User visits `/<code>` → promo_redirect sets session r_code → redirect to promo-trial. On `/process_registration`, User.referral_code = sponsor’s r_code (from ReferralCode).
2. **Sponsor code:** Only User with plan_type in ['AMBASSADOR','AMBASSADORFREE'] has ReferralCode (User.get_referral_code). Restaurant has ReferralCode via RestaurantAdmin.
3. **Lists:** Member: `/my_referrals/` uses User.referred_by_list (User.referral_code == sponsor.get_referral_code, active, status active). Restaurant: `/restaurant-admin/customer_referrals/` uses restaurant.referred_by_list (same + transaction_id and creation_date filters in model).
4. **Payout:** See 4.4.

### 4.3 Gift workflow

1. **Purchase:** `/gift-center` → POST `/buy-gift` — Recurly one-time charge; create GiftCertificates and GiftCertificateCodes (generate_gcc_id); send email with PDF/codes.
2. **Redeem:** GET `/giftcertificate_redeem/<gcc_id>` or `/gift-membership-redeem/<gcc_id>` — if gcc exists and gcc.user_id is null, redirect to register with plan (e.g. 3monthgiftmembership); else “gift code no good”.
3. **Claim:** After payment, `/register/success` sets GiftCertificateCodes.user_id = user.user_id for the gcc_id in flow.
4. **Admin:** `/admin/gift_admin` lists purchases and codes; POST `/api/create/gift_certificate/<month>` generates PDF. Member: `/delete-gift` deletes GiftCertificates (and codes).

### 4.4 Payout workflow

1. **Populate:** `flask populate_payouts` — for previous month: get eligible User (plan_type AMBASSADOR, active, status active, payout_ignore False, creation_date < last_month_end) and Restaurant (admin_email not null, active). For each, get referred User (referral_code match, transaction_id not in ['000000001','00000001','222222222'], non-null, active, status active, payout_ignore False, creation_date < last_month_end). User 13474 excluded. Create Payout (user_id or restaurant_id, status PENDING_APPROVAL, amount) and PayoutReferral rows (amount from calculate_referral_value: user 3/2, restaurant 2.50/1.50 by plan_type).
2. **Review:** Admin: `/admin/pay_out_report`, `/admin/referral_report` — list payouts and referred users.
3. **Actions:** POST `/api/v1/admin/payouts/approve` (status APPROVED), `/api/v1/admin/payouts/reject` (REJECTED), `/api/v1/admin/restore_payout` (REJECTED → PENDING_APPROVAL), `/api/v1/admin/restore_referral` (set referral.active True, recalc payout), `/api/v1/admin/delete_referral` (delete PayoutReferral, recalc).
4. **Submit/release:** `flask submit_payouts` — send APPROVED payouts to Tremendous API; create TremendousRecord. `flask release_approved_payouts` — approve orders in Tremendous; set TremendousRecord and Payout to PAID.
5. **Webhook:** POST `/webhooks/tremendous` — on ORDERS.APPROVED/CANCELED update TremendousRecord and Payout status.

### 4.5 Restaurant portal workflow

1. **Login:** POST `/restaurant-login` — lookup RestaurantAdmin (and Restaurant); set session restaurant_admin_id (and restaurant context). Admin can enter portal via `/admin/portal-entrance/<safe_url>` (masquerade).
2. **Dashboard:** `/restaurant-admin/dashboard`, `/restaurant-admin/welcome` — static.
3. **Marketing:** `/restaurant-admin/marketing` — list MarketingMaterial (filter by list_of_restaurants; -1 = all). `/marketing/download/<path>` serves file.
4. **Referrals:** `/restaurant-admin/referrals` — users who signed up with restaurant’s promo. `/restaurant-admin/customer_referrals/` — restaurant.referred_by_list.
5. **Logistics:** `/restaurant-admin/logistics` — list BottleRedeemed for this restaurant.
6. **Sub-admins:** `/restaurant-admin/add-subadmin` — form; POST `/api/restaurant/admin/add-subadmin` creates User with parent_admin_id, plan ULTIMATEPLUSFREE. Delete via `/api/restaurant/admin/delete-subadmin`.
7. **Contract/contact/preview:** Contract shows restaurant.document_path; contact form; preview redirects to public restaurant page.
8. **Payout:** `/set_payout`, `/payout_report` — pages (no Payout write in these routes).

---

## 5. Legacy Business Rules and Hardcoded Exceptions

### 5.1 Sentinel values (do not replicate literally)

| Type | Values | Meaning in legacy |
|------|--------|-------------------|
| User.transaction_id | `000000001`, `00000001`, `222222222`, `0000000000` | Freebee, test, manual billing, complimentary |
| User.customer_id | `000000002`, `0000000002`, `00000002` | Freebee, complimentary, manual billing fallback |
| ReferralCode.get_customer_id | returns `'10000'` | No customer_id for Recurly sponsor |
| RestaurantAdmin.customer_id | default `'000000'` | |

**Rebuild:** Use booleans (e.g. `is_test_account`, `payout_ignore`) and single billing provider; no magic IDs.

### 5.2 Hardcoded exclusions and dates

- **User.user_id == 13474** — excluded from referral payout (User.referred_by_payout returns 0; get_user_referrals returns [] in populate_payouts). Rebuild: use payout_ignore or is_test_account.
- **User.creation_date < '2024-08-01 00:00:00'** — in User.referred_by_payout, User.referred_by_list (display), Restaurant.referred_by_payout, Restaurant.referred_by_list. Rebuild: config or program_cutoff_date; payout logic already uses paid_last_month in commands.
- **RECURLY_SWAP_TIMESTAMP** — User.is_recurly = creation_date > timestamp; drives Recurly vs Authorize. Rebuild: single provider only.

### 5.3 Payout amounts (duplicated)

- **User (ambassador):** AMBASSADOR referred $3, CLASSIC $2 (User.referred_by_payout and populate_payouts.calculate_referral_value).
- **Restaurant:** AMBASSADOR $2.50, CLASSIC $1.50 (Restaurant.referred_by_payout and calculate_referral_value). TRIAL, 30DAYTRIAL, INTHEBIZ → $0.
- Rebuild: single config table or env (e.g. plan_payout_rates).

### 5.4 Subscription status (Authorize in request path)

- User.get_subscription_status and User.get_subscription call Authorize.net API when not is_recurly. Rebuild: remove Authorize; use only DB + webhooks.

### 5.5 Redemption

- BottleRedeemed.get_next_eligible_date = date + 7 days. Same restaurant: 7-day cooldown.
- For user_type == 'restaurant', redeem uses user_id in URL as restaurant code (int division / 10) then Restaurant by code; BottleRedeemed stores restaurant_admin_id. Rebuild: explicit restaurant_admin_id or restaurant identifier in URL.
- CLASSICFREE/AMBASSADORFREE require has_valid_promo (30 days from creation) or “promotional period has ended”.

### 5.6 Gift “used” definition

- GiftCertificateCodes.is_valid = False if any User.promo_code == gcc_id. Redeem flow uses gcc.user_id. Rebuild: use only user_id (or profile_id) for “redeemed”.

### 5.7 Manual billing workaround

- process_registration: on Recurly manual_billing_error, set transaction_id=222222222, customer_id=00000002 so user can complete. Rebuild: proper error handling; no sentinel success.

---

## 6. Clean Rebuild Plan for platform-v2

### 6.1 Principles

- **Do not modify** root `app_flask.py`, `models.py`, or `commands/`.
- **Source of truth** for legacy schema and behavior: root `models.py` and this spec.
- **New app** lives entirely under `platform-v2` (e.g. Next.js + Supabase). Legacy and v2 can coexist; data migration later.

### 6.2 Suggested stack (platform-v2)

- **App:** Next.js (App Router), React, Tailwind.
- **DB:** Postgres (Supabase).
- **Auth:** Supabase Auth (replace Admin/User/RestaurantAdmin session with JWT + profiles).
- **Billing:** Single provider (Stripe or Recurly); no Authorize.net.
- **Email:** Resend (or one transactional provider).
- **Payouts:** Tremendous only (no Dots.dev).
- **Storage:** Supabase Storage or S3 for marketing, logos, documents, ITB files.
- **Jobs:** n8n or Vercel cron calling platform-v2 API routes with internal auth.

### 6.3 Target schema (platform-v2, not legacy)

- **profiles** — One row per auth user (member, restaurant_admin, admin). id (UUID from auth.users), role, email, first_name, last_name, phone, plan_type, active, status, payout_ignore, billing_customer_id, billing_subscription_id, referral_code (denorm or FK), promo_code, parent_restaurant_admin_id, restaurant_id, creation_date, last_login, cancellation_email_sent. Replaces User + Admin for identity; RestaurantAdmin becomes profile with role=restaurant_admin + restaurant_id.
- **restaurants** — id, slug (unique), name, legal_name, code, admin_email, address_1, city, state, zip_code, phone, latitude, longitude, cuisine_1/2/3, active, featured, portal, logo_path, document_path, referral_code, created_at, updated_at. Use slug for URLs; optional safe_url for redirects from legacy.
- **restaurant_admins** — id, restaurant_id, auth_id (FK auth.users), email, email_key, has_restaurant_plus, customer_id (if still needed for Recurly sponsor). Sub-admins: profiles with parent_restaurant_admin_id.
- **referral_codes** — id, r_code (unique), profile_id (nullable), restaurant_admin_id (nullable). Constraint: one of the two set.
- **promo_codes** — id, promo_code (unique), promo_desc, active, promo_start_date, promo_end_date, restaurant_admin_id, plus_user_id (profile), qt_referrer, created_at.
- **gift_certificates** — id, purchaser_email, cc_first_name, cc_last_name, total_charge, transaction_id, expiration_date, three, six, twelve, created_at.
- **gift_certificate_codes** — id, gcc_id (unique string), gc_id, profile_id (nullable, set on redeem), duration, filename, created_at.
- **redemptions** — id, profile_id (nullable), restaurant_admin_id (nullable), restaurant_id, redeemed_at. Clear: either profile (member) or restaurant_admin (restaurant scan) per row.
- **payouts** — id, profile_id (nullable), restaurant_id (nullable), status (enum), amount, payout_date, approved_at, paid_at, created_at.
- **payout_referrals** — id, payout_id, profile_id (referred user), amount, active (for restore). No hardcoded user_id exclusion; use payout_ignore on profile.
- **tremendous_records** — id, payout_id, tremendous_order_id, tremendous_reward_id, status, created_at, updated_at.
- **plan_payout_rates** — plan_type, recipient_type (member | restaurant), amount. Replaces hardcoded 3/2 and 2.50/1.50.
- Content tables: faq_categories, faq_questions, videos, ads, marketing_materials, cuisines, itb_apps, newsletter_subscriptions, restaurant_photos, restaurant_suggestions. Optional: err / err_400 or use external logging.

### 6.4 Implementation order (platform-v2)

1. **Scaffold** — Next.js app in `platform-v2`, Supabase project, env (no legacy env in v2).
2. **Auth** — Supabase Auth; profiles table and RLS; login/logout, password reset for member and restaurant_admin and admin.
3. **Public + discovery** — Home, restaurants list, restaurant detail by slug, FAQ, contact, mission. Read from Supabase (migrate or dual-write later).
4. **Join** — Plan selection, registration with single billing provider, referral code in URL/session; create profile + referral_code link; register_success equivalent (webhook or server action).
5. **Member** — Profile, manage membership (plan/CC via billing), QR code, visit log; subscription status from DB + webhooks only.
6. **Redemption** — Create redemptions; 7-day cooldown; member and restaurant flows with explicit identifiers.
7. **Restaurant portal** — Login, dashboard, marketing (list + download), referrals list, logistics (visit list), sub-admins, contract/contact/preview, payout view.
8. **Admin** — Restaurants CRUD, users/customers lists, subscription lookup, content (FAQ, videos, ads, cuisines, ITB), gift admin, logs, masquerade (portal entrance/exit).
9. **Gifts** — Purchase (billing + gift_certificates + gift_certificate_codes), redeem (set profile_id on code), admin list and PDF.
10. **Payout pipeline** — Populate (cron/API), approve/reject/restore (APIs), Tremendous submit/release (job or n8n), webhook; plan_payout_rates for amounts; no user_id 13474, no sentinel transaction_id.

### 6.5 What to retire (do not reimplement in platform-v2)

- Authorize.net and RECURLY_SWAP_TIMESTAMP.
- Sentinel transaction_id/customer_id; manual billing → success with 222222222.
- Hardcoded user_id 13474; use payout_ignore or is_test_account.
- Date literal 2024-08-01 in app logic; use config or column.
- Redeem URL hack (user_id as restaurant code); use explicit restaurant_admin_id/slug.
- Dots.dev test/live payout routes.
- Dual “gift used” (promo_code vs user_id); use only profile_id on gift_certificate_codes.
- Live Authorize API calls in request path.
- In-process cron (Crython); use n8n or Vercel cron.

### 6.6 Data migration (later phase)

- Export from legacy DB (user, admin, restaurant_admin, restaurant, referral_code, promo_code, gift_certificates, gift_certificate_codes, bottle_redeemed, payouts, payout_referrals, tremendous_records, content tables).
- Map to platform-v2 schema (profiles from User + Admin + RestaurantAdmin; redemptions from bottle_redeemed; etc.). Normalize sentinels to booleans; backfill program_cutoff_date if needed.
- Run migration scripts outside legacy app; point platform-v2 to new DB or switched-over Supabase.

---

*This document is the single reverse-engineered spec and rebuild plan for implementing the new system inside `/platform-v2`. Legacy app at repository root is unchanged.*
