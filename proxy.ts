import { NextRequest, NextResponse } from "next/server"
import { TRACKED_PARAMS, TRACKING_COOKIE_NAME, TRACKING_COOKIE_MAX_AGE, TrackingParams } from "@/lib/tracked-params"

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const response = NextResponse.next()

  const incoming: TrackingParams = {}
  for (const key of TRACKED_PARAMS) {
    const value = searchParams.get(key)
    if (value) incoming[key] = value
  }

  if (Object.keys(incoming).length > 0) {
    const existing = request.cookies.get(TRACKING_COOKIE_NAME)?.value
    let merged: TrackingParams = {}

    if (existing) {
      try {
        merged = JSON.parse(existing)
      } catch {
      }
    }

    const final: TrackingParams = { ...merged, ...incoming }

    response.cookies.set(
      TRACKING_COOKIE_NAME,
      JSON.stringify(final),
      {
        maxAge: TRACKING_COOKIE_MAX_AGE,
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }
    )
  }

  return response
}

export const config = {
  matcher: ["/", "/contact/:path*"],
}
