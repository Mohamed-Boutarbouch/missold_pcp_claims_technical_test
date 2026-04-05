"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { leadSchema, type LeadFormData } from "@/lib/schemas"
import { useTrackingParams } from "@/hooks/use-tracking-params"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DatePickerField } from "./date-picker-field"
import MultipleSelector from "./ui/multi-select"
import { UK_CITIES } from "@/data/uk-cities"
import { UKPhoneInput } from "./uk-phone-input"

type formSubmissionState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [mounted, setMounted] = useState(false)
  const urlParams = useTrackingParams()
  const [status, setStatus] = useState<formSubmissionState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: undefined,
      address: [],
    },
  })

  useEffect(() => {
    if (Object.keys(urlParams).length === 0) return
    (Object.entries(urlParams) as [keyof LeadFormData, string][]).forEach(([key, value]) => {
      form.setValue(key, value, { shouldDirty: false, shouldTouch: false, shouldValidate: false })
    })
  }, [urlParams])

  async function onSubmit(data: LeadFormData) {
    setStatus("loading")
    setErrorMsg("")
    console.log(data)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.message ?? "Something went wrong")
      }
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Submission failed")
    }
  }

  if (status === "success") {
    return (
      <Alert className="border-green-200 bg-green-50">
        <AlertDescription className="text-green-800 text-center py-4">
          Thanks! We've received your details and will be in touch shortly.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <UKPhoneInput
                    className="w-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePickerField
                    value={field.value}
                    onChangeAction={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      className="w-full"
                      defaultOptions={UK_CITIES}
                      placeholder="Select cities"
                      hideClearAllButton
                      hidePlaceholderWhenSelected
                      emptyIndicator={
                        <p className="text-center text-sm">No results found</p>
                      }
                      value={UK_CITIES.filter((c) =>
                        field.value?.includes(c.value)
                      )}
                      onChange={(options) =>
                        field.onChange(options.map((o) => o.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {status === "error" && (
          <Alert variant="destructive">
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base"
          disabled={mounted ? !form.formState.isValid || status === "loading" : false}
        >
          {status === "loading" ? "Submitting…" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
