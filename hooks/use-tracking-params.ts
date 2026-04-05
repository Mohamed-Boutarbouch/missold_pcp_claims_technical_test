"use client"

import { useState, useEffect } from "react"
import { type TrackingParams } from "@/data/tracked-params"
import { readTrackingParams } from "@/lib/tracking"

export function useTrackingParams(): TrackingParams {
  const [params, setParams] = useState<TrackingParams>({})

  useEffect(() => {
    setParams(readTrackingParams())
  }, [])

  return params
}
