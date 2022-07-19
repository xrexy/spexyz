import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchData } from "next-auth/client/_utils";
import { trpc } from "./utils/trpc";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, origin } = nextUrl;
  if (pathname === "/" || pathname.startsWith("/_next/")) return;

  if (process.env.NODE_ENV !== "production") console.log(pathname);

  if (pathname.startsWith("/api/redirect/")) {
    const slug = pathname.split("/").pop();

    if (!slug) return NextResponse.redirect(origin);

    const redirectFetch = await fetch(`${origin}/api/redirect/${slug}`);
    if (redirectFetch.status.toString().startsWith("4")) {
      return NextResponse.redirect(origin);
    }

    const data = await redirectFetch.json();
    return NextResponse.redirect(data?.url);
  }
}
