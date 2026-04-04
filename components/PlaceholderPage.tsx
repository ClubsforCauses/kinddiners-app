import kdsLogo from '@/app/assets/kds-logo.svg';

type PlaceholderPageProps = {
  title: string;
  description?: string;
  routeGroup?: string;
};

export function PlaceholderPage({
  title,
  description,
  routeGroup,
}: PlaceholderPageProps) {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg p-6 bg-gray-50">
        <div className="flex justify-center mb-6">
          <img src={kdsLogo.src} alt="Kind Diners Society" className="h-10" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {routeGroup && (
          <p className="text-sm text-gray-500 mt-1">Route group: {routeGroup}</p>
        )}
        {description && (
          <p className="mt-2 text-gray-600">{description}</p>
        )}
        <p className="mt-4 text-sm text-gray-400">
          Placeholder — implement per REVERSE_ENGINEERED_SPEC_AND_REBUILD_PLAN.md
        </p>
      </div>
    </main>
  );
}
