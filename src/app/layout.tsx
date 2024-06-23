import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Cart } from "@/app/components";
import { Providers } from "@/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container flex-grow pb-10 pt-6">{children}</main>
          </div>
          <Cart />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: "Pnu-practice",
};

