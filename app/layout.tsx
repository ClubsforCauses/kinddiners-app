import "./globals.css";
import { PublicNav } from "@/components/layout/PublicNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
          <PublicNav />
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
