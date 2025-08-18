import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const authPages = ["/login", "/register", "/questions/add"];

  if (authPages.includes(url.pathname)) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      });

      if (res.ok) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } catch (err) {}
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/questions/add"],
};
