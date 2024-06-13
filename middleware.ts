import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req: request });

  // Check if the user is authenticated
  const isAuthenticated = !!token;
  if (!isAuthenticated) {
    // Redirect to the sign-in page if not authenticated
    const redirectUrl = new URL("/signin", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Get the user's role from the token
  const role = token?.role;

  // Check if the user is trying to access the /employee route
  if (request.nextUrl.pathname.startsWith("/employee") && role === "staff") {
    // Redirect to a not authorized page or home page
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Allow the request to proceed if authenticated and authorized
  return NextResponse.next();
}

// Update the matcher configuration to include the /employee route
export const config = {
  matcher: ["/", "/employee/:path*","/product/:path*","/setting/:path*","/transaction/:path*"],
};
