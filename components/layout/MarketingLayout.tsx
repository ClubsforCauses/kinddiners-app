import { MarketingNav } from './MarketingNav';
import { MarketingFooter } from './MarketingFooter';

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      <MarketingNav />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
