import { cookies } from "next/headers";

// ---------------------------------

export async function POST(request: Request) {
  const { token } = await request.json();
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return new Response("Token (access-refresh) are stored in cookies");
}

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken) {
    return Response.json("");
  }
  return Response.json(accessToken);
}
