import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WinnerProvider } from "@/hooks/WinnerProvider";

export const metadata: Metadata = {
  title: "La zona del pecado",
  description: "Creador por Chimuelo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WinnerProvider>
          {children}
          <Analytics />
        </WinnerProvider>
      </body>
    </html>
  );
}
