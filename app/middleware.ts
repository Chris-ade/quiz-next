import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { res, verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res({ success: true, message: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    verifyToken(token); // throws if invalid
    return NextResponse.next();
  } catch (error) {
    return res({ succes: false, message: "Session expired or invalid." }, 401);
  }
}

export const config = {
  matcher: ["/api/me", "/api/protected/:path*"], // Add any routes you want to protect
};
