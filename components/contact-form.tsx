"use client"

import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ADDRESS_OPTIONS } from "@/data/address-options"
import { DatePickerField } from "./date-picker-field"


export function ContactForm() {
  const urlParams = useTrackingParams()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: undefined,
      address: [],
      ...urlParams,
    },
  })

  // useWatch replaces the double-nested FormField anti-pattern for checkboxes
  const selectedAddresses = useWatch({ control: form.control, name: "address" }) ?? []

  function toggleAddress(value: string, checked: boolean) {
    const current = form.getValues("address") ?? []
    form.setValue(
      "address",
      checked ? [...current, value] : current.filter((v) => v !== value),
      { shouldValidate: true }
    )
  }

  async function onSubmit(data: LeadFormData) {
    setStatus("loading")
    setErrorMsg("")
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+212 6 12 34 56 78" {...field} />
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

        {/* Address — fixed: single FormField, useWatch for derived state */}
        <FormField
          control={form.control}
          name="address"
          render={() => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {ADDRESS_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`address-${option.value}`}
                      checked={selectedAddresses.includes(option.value)}
                      onCheckedChange={(checked) =>
                        toggleAddress(option.value, checked === true)
                      }
                    />
                    <label
                      htmlFor={`address-${option.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <Alert variant="destructive">
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={status === "loading"} className="w-full">
          {status === "loading" ? "Submitting…" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
