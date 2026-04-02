# Kind Diners Society — platform-v2

Next.js rebuild scaffold. **Legacy Flask app is unchanged** (repository root).

## Structure

- **`app/`** — Next.js App Router
  - **`(auth)/`** — Login, restaurant-login, admin, reset-password
  - **`(public)/`** — Home, restaurants, faq, contact, our-mission, gift, gift-center, memberships, referral-program
  - **`join/`** — join/[plan], join/complimentary/[key], promo-trial
  - **`[code]/`** — Referral redirect (set r_code → promo-trial)
  - **`(member)/`** — profile, refer, my-referrals, manage-membership, qrcode, visit-log, redeem/[id], settings/promo-code
  - **`gift/redeem/[code]/`** — Gift code redemption
  - **`(portal)/`** — Restaurant portal: dashboard, marketing, referrals, customer-referrals, logistics, subadmins, contract, contact, preview, payout
  - **`(admin)/`** — Admin: dashboard, restaurants, users, customers, payouts, referral-report, content (faq, videos, ads, cuisines, itb), gifts, admins, logs
  - **`api/`** — Placeholder API routes by domain
- **`components/`** — Shared UI (e.g. PlaceholderPage)
- **`lib/domains/`** — Domain modules: auth, memberships, restaurants, referrals, gifts, payouts, admin, portal

## Docs

- **`REVERSE_ENGINEERED_SPEC_AND_REBUILD_PLAN.md`** — Database entities, route groups, route→model mapping, workflows, legacy rules, rebuild plan.

## Setup

```bash
cd platform-v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). All pages are placeholders; implement per the spec.
