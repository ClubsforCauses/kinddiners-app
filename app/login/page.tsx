import kdsLogo from '@/app/assets/kds-logo.svg';

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 py-8">
      <div className="flex justify-center">
        <img src={kdsLogo.src} alt="Kind Diners Society" className="h-12 md:h-14 mb-8" />
      </div>
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="text-sm text-slate-600">
          Sign in to your Kind Diners account. Authentication will eventually be
          handled by Supabase Auth mapped to profiles.
        </p>
      </div>

      <form className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Sign in
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">
          Forgot your password? Flows for member, restaurant admin, and admin
          reset links will reuse the existing reset-password routes.
        </p>
      </form>

      <p className="text-center text-xs text-slate-500">
        New to Kind Diners?{" "}
        <a
          href="/memberships"
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Explore memberships
        </a>
        .
      </p>
    </div>
  );
}
