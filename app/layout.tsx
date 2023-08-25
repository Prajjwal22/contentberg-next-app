import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const inter = DM_Sans({ subsets: ["latin"], weight:["400", "600"] });

export const metadata: Metadata = {
  title: process.env.SITE_TITLE,
  description: process.env.SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
       {children}
       <Footer />
      </body>
    </html>
  );
}
