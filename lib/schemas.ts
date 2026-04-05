import { isValidPhoneNumber } from "libphonenumber-js"
import { z } from "zod"

const baseSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  phone: z.string().refine(
    (value) => isValidPhoneNumber(value, "GB"),
    "Enter a valid UK phone number"
  ),

  address: z.array(z.string()).min(1, "Select at least one address option"),

  gclid: z.string().optional(),
  gbraid: z.string().optional(),
  wbraid: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  fbclid: z.string().optional(),
  ttclid: z.string().optional(),
  taboola_click_id: z.string().optional(),
})

const dobRefine = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return false
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())
  if (!hasHadBirthdayThisYear) age--
  return age >= 18
}

export const leadSchema = baseSchema.extend({
  dateOfBirth: z.date().refine(dobRefine, { message: "You must be at least 18 years old" }),
})

export const leadServerSchema = baseSchema.extend({
  dateOfBirth: z.coerce.date().refine(dobRefine, { message: "You must be at least 18 years old" }),
})

export type LeadFormData = z.infer<typeof leadSchema>
