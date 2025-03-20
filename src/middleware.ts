import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  // Get the token from cookies
  const accessToken = req.cookies.get("refresh_token")?.value || "";

  // Check if user is authenticated
  const isAuthenticated = Boolean(accessToken);

  // If user tries to access "/admin" but is not authenticated, show login page
  if (req.nextUrl.pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is already logged in and tries to visit "/login", redirect to home
  if (req.nextUrl.pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protect "/admin" routes
export const config = {
  matcher: ["/admin/:path*", "/login"], // Ensures middleware applies to "/admin/*" and "/login"
};
