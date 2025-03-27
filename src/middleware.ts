import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("O2-refresh-token"); // use your actual cookie name

  const pathname = request.nextUrl.pathname;

  const isAdminRoute =
    pathname === "/" ||
    pathname.startsWith("/discount") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/coupon") ||
    pathname.startsWith("/product ") ||
    pathname.startsWith("/category") ||
    pathname.startsWith("/blog");

  const isLoginPage = pathname.startsWith("/login");

  if (isAdminRoute && !accessToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/discount/:path*",
    "/user/:path*",
    "/coupon/:path*",
    "/product/:path*",
    "/category/:path*",
    "/blog/:path*",
  ],
};
