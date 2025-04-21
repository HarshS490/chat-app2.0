import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("Running Middleware");
  const cookies = req.headers.get('cookie');
  console.log("Cookies in request:", cookies);
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/users/:path*", "/auth"],
};
