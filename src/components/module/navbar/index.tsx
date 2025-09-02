"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/lib/services/auth";
import { links } from "./links";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { data: user, isLoading } = useMe();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className={`${
        pathname === "/" && "text-white"
      } lg:max-w-[1280px] max-w-[95%] mx-auto my-7 p-3 rounded-full bg-white/10 backdrop-blur-[5px] shadow-sm`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg whitespace-nowrap">
            Yones Maheri
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === link.href
                  ? "text-blue-600"
                  : pathname === "/"
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : user ? (
            <span className="text-sm font-medium">{user.name}</span>
          ) : (
            <Link href="/login">
              <Button className="text-black" variant="outline">Sign up / Sign in</Button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link href={"/"}>Yones Maheri</Link>
              </SheetHeader>
              <div className="flex h-full flex-col justify-between mt-6 px-4">
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)} // 👈 شیت رو می‌بندیم
                      className={`border p-4 rounded-xl text-sm font-medium transition-all hover:text-blue-600 ${
                        pathname === link.href
                          ? "text-blue-600 bg-blue-100"
                          : "text-gray-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="my-4">
                  {isLoading ? (
                    <Skeleton className="h-6 w-24" />
                  ) : user ? (
                    <span className="text-sm font-medium">{user.name}</span>
                  ) : (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full">Sign up / Sign in</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
