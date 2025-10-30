import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_static") ||
    pathname.startsWith("/public") ||
    pathname.endsWith(".ico") ||
    pathname === "/login" ||
    pathname === "/api/login"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const result = await verifyJwt(token);
  if (!result.valid) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.set("token", "", { maxAge: 0, path: "/" });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|_static|favicon\\.ico|login|api/login).*)",
  ],
};
