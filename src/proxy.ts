import { NextRequest, NextResponse } from "next/server";
import { Locales } from "@/constants/locale";

function getLocale() {
  return Locales[0];
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLocaleExists = Locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (isLocaleExists) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const locale = getLocale();

  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|favicon.png|images|icons|assets).*)"],
};
