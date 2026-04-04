import { MarketingLayout } from '@/components/layout/MarketingLayout';

export default function FaqPage() {
  const faqs = [
    {
      category: 'Membership',
      questions: [
        {
          q: 'What is Kind Diners Society?',
          a: 'Kind Diners Society is a membership platform that connects members with curated restaurant experiences. Members get exclusive access to partner restaurants, can earn through referrals, and contribute to supporting the hospitality community.',
        },
        {
          q: 'What membership tiers are available?',
          a: 'We offer two tiers: Classic and Ambassador. Classic provides core benefits including restaurant access and referral rewards. Ambassador includes additional perks and higher referral payouts.',
        },
        {
          q: 'How do I cancel my membership?',
          a: 'You can cancel anytime from your profile settings. Your access will continue until the end of your current billing period.',
        },
      ],
    },
    {
      category: 'Restaurant Visits',
      questions: [
        {
          q: 'How do I redeem a restaurant visit?',
          a: 'Browse available restaurants in your membership portal, select a venue, and generate a QR code. Present this code to your server when dining to redeem your visit.',
        },
        {
          q: 'How often can I visit each restaurant?',
          a: 'Most restaurants allow one visit every 7 days. Specific visit frequencies are listed on each restaurant\'s profile.',
        },
        {
          q: 'Can I visit restaurants in different cities?',
          a: 'Yes! Your membership gives you access to all partner restaurants across all cities in our network.',
        },
      ],
    },
    {
      category: 'Referral Program',
      questions: [
        {
          q: 'How does the referral program work?',
          a: 'Share your unique referral link with friends. When they join with a paid membership, you earn a payout. Track all your referrals and earnings in your dashboard.',
        },
        {
          q: 'When do I receive referral payouts?',
          a: 'Referral payouts are processed monthly. Once approved, funds are sent to your registered payout method.',
        },
        {
          q: 'Is there a limit to referrals?',
          a: 'No limit! Refer as many members as you like and earn for each successful paid membership.',
        },
      ],
    },
  ];

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything you need to know about Kind Diners Society memberships, restaurant visits, and referrals.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category) => (
              <div key={category.category} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-200"
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4">
                        <h3 className="font-semibold text-gray-900">
                          {faq.q}
                        </h3>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-orange-600 transition-transform group-open:rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </summary>
                      <p className="mt-4 text-gray-600">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-center text-white shadow-xl lg:p-12">
            <h2 className="mb-4 text-2xl font-bold">
              Still Have Questions?
            </h2>
            <p className="mb-6 text-lg opacity-90">
              Our team is here to help. Reach out anytime.
            </p>
            <a
              href="/coming-soon"
              className="inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 shadow-lg transition-all hover:bg-gray-50"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
