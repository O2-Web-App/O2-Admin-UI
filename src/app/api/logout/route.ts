import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Create a POST request handler for Logout
export async function POST() {
    // Get the refresh token from the client-side cookies
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";

    // Await the cookies() function to resolve the Promise
    const cookieStore = await cookies();
    const credential = cookieStore.get(cookieName);

    console.log("Credential:", credential);

    // If the refresh token is not found, return an error message
    if (!credential) {
        return NextResponse.json(
            { message: "Token not found" },
            { status: 400 }
        );
    }

    // Expire the cookie by setting an empty value with max-age 0
    const response = NextResponse.json(
        { message: "Logout successful" },
        { status: 200 }
    );

    response.headers.set(
        "Set-Cookie",
        `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0;`
    );

    return response;
}
