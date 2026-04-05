import { TRACKED_PARAMS, type TrackingParams } from "@/data/tracked-params"

const STORAGE_KEY = "_tracking"

export function captureTrackingParams(): void {
  const searchParams = new URLSearchParams(window.location.search)

  const existing = readTrackingParams()
  const merged: TrackingParams = { ...existing }

  let hasNew = false
  TRACKED_PARAMS.forEach((key) => {
    const value = searchParams.get(key)
    if (value) {
      merged[key] = value
      hasNew = true
      searchParams.delete(key)
    }
  })

  if (!hasNew) return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))

  const cleanUrl =
    window.location.pathname +
    (searchParams.toString() ? `?${searchParams.toString()}` : "") +
    window.location.hash

  window.history.replaceState(null, "", cleanUrl)
}

export function readTrackingParams(): TrackingParams {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    const result: TrackingParams = {}
    TRACKED_PARAMS.forEach((key) => {
      if (typeof parsed[key] === "string") result[key] = parsed[key]
    })
    return result
  } catch {
    return {}
  }
}
