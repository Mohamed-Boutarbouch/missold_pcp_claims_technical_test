import { cookies } from "next/headers"
import { TRACKING_COOKIE_NAME, TrackingParams } from "@/lib/tracked-params"

export async function getTrackingParams(): Promise<TrackingParams> {
  const store = await cookies()
  const raw = store.get(TRACKING_COOKIE_NAME)?.value
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}
