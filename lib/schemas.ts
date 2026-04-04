import { z } from "zod"

export const leadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number (e.g. +212612345678)"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
    .refine((val) => {
      const date = new Date(val)
      const age = new Date().getFullYear() - date.getFullYear()
      return age >= 18 && age <= 100
    }, "You must be at least 18 years old"),
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
