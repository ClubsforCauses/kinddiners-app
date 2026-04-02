import { SectionHeader } from "@/components/ui/SectionHeader";

export default function GiftInfoPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Gift certificates for people who love dining out.
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          This page mirrors the information from the legacy Kind Diners gift
          certificate landing page, but rendered through the new platform-v2
          shell and architecture. It explains how gift memberships work and
          links into the Gift Center for purchase.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="How gift memberships work"
          description="Based on the legacy gift_certificates and gift_certificate_codes models."
        />
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• Purchase 3, 6, or 12 month Classic memberships as gifts.</li>
          <li>• Each purchase creates one or more unique gift codes.</li>
          <li>• Recipients redeem codes to start their membership.</li>
          <li>• Codes are tracked and cannot be reused once claimed.</li>
        </ul>
        <a
          href="/gift-center"
          className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Go to Gift Center
        </a>
      </section>
    </div>
  );
}
