"use client"

import { useEffect } from "react"
import { captureTrackingParams } from "@/lib/tracking"

export function TrackingCapture() {
  useEffect(() => {
    captureTrackingParams()
  }, [])

  return null
}
