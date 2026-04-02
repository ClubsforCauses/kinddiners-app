import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kind Diners Society",
  description: "Membership and restaurant discovery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
