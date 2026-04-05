import { z } from "zod"

export const leadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number (e.g. +212612345678)"),

  dateOfBirth: z
    .date()
    .refine((date) => {
      if (!(date instanceof Date) || isNaN(date.getTime())) return false

      const today = new Date()
      let age = today.getFullYear() - date.getFullYear()

      const hasHadBirthdayThisYear =
        today.getMonth() > date.getMonth() ||
        (today.getMonth() === date.getMonth() &&
          today.getDate() >= date.getDate())

      if (!hasHadBirthdayThisYear) age--

      return age >= 18
    }, {
      message: "You must be at least 18 years old",
    }),

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

export type LeadFormData = z.infer<typeof leadSchema>
