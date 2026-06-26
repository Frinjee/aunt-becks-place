import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SITE_UNAVAILABLE } from "@/lib/site-maintenance";

export function middleware(_request: NextRequest) {
  if (!SITE_UNAVAILABLE) return NextResponse.next();

  return new NextResponse("Service Unavailable", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
