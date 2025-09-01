import { cookies } from "next/headers";

// ---------------------------------

export async function POST(request: Request) {
  const { token } = await request.json();
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    maxAge: 60 * 24 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
    path: "/",
  });

  return new Response("Token (access-refresh) are stored in cookies");
}
