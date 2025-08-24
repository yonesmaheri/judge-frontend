import type { Metadata } from "next";
// import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/module/provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/module/navbar";

// const vazir = Vazirmatn({
//   variable: "--font-vazir",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Yones Maheri - Portfolio",
  description: "Yones Maheri - Frontend and python developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` bg-gray-50 text-gray-900 antialiased h-screen`}
      >
        <ReactQueryProvider>
          <Navbar/>
          {children}
          </ReactQueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}
