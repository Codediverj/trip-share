import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = req.nextUrl.pathname;

  if (!user && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (user) {
    await supabase.auth.getSession();
  }
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon\\.|robots\\.txt|sitemap\\.xml).*)"],
};
