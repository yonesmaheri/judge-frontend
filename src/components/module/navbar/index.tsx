"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/lib/services/auth";

export default function Navbar() {
  const pathname = usePathname();
  const { data: user, isLoading } = useMe();

  const links = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/questions", label: "سوالات" },
  ];

  return (
    <nav dir='rtl' className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="font-bold text-lg">CodeJudge</span>
        </Link>

        {/* منو */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === link.href ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : user ? (
            <span className="text-sm font-medium">{user.name}</span>
          ) : (
            <Link href="/login">
              <Button variant="outline">ورود / ثبت‌نام</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
