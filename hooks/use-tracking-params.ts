"use client"

import { useMemo } from "react"
import { TRACKING_COOKIE_NAME, TrackingParams } from "@/lib/tracked-params"

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
  return match ? match.split("=").slice(1).join("=") : undefined
}

export function useTrackingParams(): TrackingParams {
  return useMemo(() => {
    const raw = getCookie(TRACKING_COOKIE_NAME)
    if (!raw) return {}
    try {
      return JSON.parse(raw) as TrackingParams
    } catch {
      return {}
    }
  }, [])
}
