"use client"

import { TRACKED_PARAMS } from "@/data/tracked-params"
import { useState } from "react"

type TrackedParamKey = typeof TRACKED_PARAMS[number]

export type TrackingParams = Partial<Record<TrackedParamKey, string>>

function readTrackingCookie(): TrackingParams {
  if (typeof document === "undefined") return {}

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_tracking="))

  if (!match) return {}

  try {
    const raw = match.slice("_tracking=".length)
    const parsed = JSON.parse(decodeURIComponent(raw)) as Record<string, unknown>

    const result: TrackingParams = {}

    for (const key of TRACKED_PARAMS) {
      const value = parsed[key]
      if (typeof value === "string") {
        result[key] = value
      }
    }

    return result
  } catch {
    return {}
  }
}

export function useTrackingParams(): TrackingParams {
  const [params] = useState<TrackingParams>(() => readTrackingCookie())
  return params
}
