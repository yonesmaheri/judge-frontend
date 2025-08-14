import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/module/provider";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "سیستم داوری",
  description: "سیستم داوری آنلاین کد های برنامه نویسی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vazir.className} bg-gray-100 text-gray-900 antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
