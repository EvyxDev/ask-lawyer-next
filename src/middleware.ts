import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const protectedRoutes = ["/dashboard"];

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // استخراج اللغات المدعومة
  const locales = routing.locales;

  // التحقق من المسار المحمي بأي لغة
  const isProtected = locales.some((locale) =>
    protectedRoutes.some((route) => pathname.startsWith(`/${locale}${route}`))
  );

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const locale = request.nextUrl.locale || "ar";
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)" ,'/(ar|en)/:path*'],
};
