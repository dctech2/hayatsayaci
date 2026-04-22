import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Hayat Sayacı",
  description: "Hayatının nereye gittiğini gör."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}