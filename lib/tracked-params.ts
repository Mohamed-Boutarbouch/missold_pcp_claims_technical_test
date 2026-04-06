export const TRACKED_PARAMS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "fbclid", "ttclid", "taboola_click_id",
] as const

export type TrackedParamKey = typeof TRACKED_PARAMS[number]
export type TrackingParams = Partial<Record<TrackedParamKey, string>>

export const TRACKING_COOKIE_NAME = "tracking_params"
export const TRACKING_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
