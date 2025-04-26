import { NextRequest, NextResponse } from "next/server";
import { verifyTokenMiddleware, res } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/score")) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res({ success: false, message: "Unauthorized." }, 401);
    }

    try {
      verifyTokenMiddleware(token);
      return NextResponse.next();
    } catch (err: any) {
      return res(
        { success: false, message: "Session invalid or expired." },
        403
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/score", "/api/score/:path*"],
};
