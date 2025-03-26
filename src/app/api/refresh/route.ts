import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies(); // ✅ Await cookies()
  const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
  const credential = cookieStore.get(cookieName); // ✅ Now this works

  if (!credential) {
    console.error("No refresh token found in cookies.");
    return NextResponse.json({ message: "Token not found" }, { status: 404 });
  }

  const refreshToken = credential.value;

  try {
    // Make API call to refresh the token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_O2_API_URL}/api/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    const rawResponse = await response.text();

    if (!response.ok) {
      console.error("Failed to refresh token. Status:", response.status);
      return NextResponse.json(
        { message: "Failed to refresh access token" },
        { status: response.status }
      );
    }

    const data = JSON.parse(rawResponse);

    const access_token = data?.data?.access_token;
    const refresh_token = data?.data.refresh_token;

    if (!access_token || !refresh_token) {
      console.error("Missing tokens in API response.");
      return NextResponse.json(
        { message: "Invalid token response" },
        { status: 500 }
      );
    }

    // Serialize the refresh token
    const serialized = serialize(cookieName, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    console.log("Successfully refreshed tokens.");

    return NextResponse.json(
      { accessToken: access_token },
      {
        headers: { "Set-Cookie": serialized },
      }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { message: "An error occurred while refreshing the token." },
      { status: 500 }
    );
  }
}
