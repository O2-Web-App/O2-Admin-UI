import { serialize } from "cookie";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  // Make a POST request to the Our API

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_O2_API_URL}/api/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  
  // If the request fails, return an error message to the client-side
  if (!response.ok) {
    const errorText = await response.text(); // log backend error
    console.error("❌ Backend login failed:", response.status, errorText);

    return NextResponse.json(
      {
        message: "Failed to login",
        backendError: errorText, // helpful debug
      },
      { status: response.status }
    );
  }

  // If the request is successful, parse the response body to get the data
  const data = await response.json();
  // Extract roles and ensure the user has the "ADMIN" role
  const roles = data?.data?.user.role || "";

  if (roles !== "admin") {
    return NextResponse.json(
      {
        message: "Unauthorized: Admin access only.",
      },
      {
        status: 403,
      }
    );
  }

  const user = data.data?.user || null;
  const accessToken = data.data?.access_token || null;
  const refreshToken = data.data?.refresh_token;


  // Serialize the refresh token and set it as a cookie with
  // (httpOnly, secure, path, and sameSite options) in the response headers to the client-side
  const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
  const serialized = serialize(cookieName, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax", // or "strict" or "none"
  });

  // Return the access token and user data to the client-side
  // with the serialized refresh token as a cookie

  return NextResponse.json(
    {
      accessToken: accessToken,
      user: user,
    },
    {
      status: response.status,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
