import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const authCookie =
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token");

  if (pathname.includes("movies") && !authCookie)
    return NextResponse.redirect(new URL("/", req.url));

  if (pathname === "/" && authCookie)
    return NextResponse.redirect(new URL("/movies", req.url));
}
