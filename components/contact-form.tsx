"use client"

import { leadSchema, updateLeadSchema, type LeadFormData, type UpdateLeadFormData } from "@/lib/schemas"
import { TrackingParams } from "@/lib/tracked-params"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { DatePickerField } from "@/components/date-picker-field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultipleSelector } from "@/components/ui/multi-select"
import { UKPhoneInput } from "@/components/uk-phone-input"
import { UK_CITIES } from "@/data/uk-cities"

type FormSubmissionState = "idle" | "loading" | "success" | "error"
type EditState = "hidden" | "open" | "saving" | "saved" | "error"

export function ContactForm({ tracking }: { tracking: TrackingParams }) {
  const [status, setStatus] = useState<FormSubmissionState>("idle")
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [editState, setEditState] = useState<EditState>("hidden")
  const [editError, setEditError] = useState("")

  const [submittedData, setSubmittedData] = useState<LeadFormData | null>(null);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: undefined,
      address: [],
      ...tracking,
    },
  })

  const editForm = useForm<UpdateLeadFormData>({
    resolver: zodResolver(updateLeadSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: undefined,
      address: [],
    },
  })

  async function onSubmit(data: LeadFormData) {
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message ?? "Something went wrong")
      }

      setTransactionId(json.transactionId)
      setSubmittedData(data);
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Submission failed")
    }
  }

  async function onEdit(data: UpdateLeadFormData) {
    if (!transactionId) return

    const payload = Object.fromEntries(
      Object.entries(data).filter(([, v]) => {
        if (v === "" || v === undefined || v === null) return false
        if (Array.isArray(v) && v.length === 0) return false
        return true
      })
    )

    if (Object.keys(payload).length === 0) {
      setEditError("Fill in at least one field to update.")
      return
    }

    setEditState("saving")
    setEditError("")

    try {
      const res = await fetch(`/api/leads/${transactionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message ?? "Update failed")
      }

      setEditState("saved")
      editForm.reset()
    } catch (err) {
      setEditState("error")
      setEditError(err instanceof Error ? err.message : "Update failed")
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4">
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800 text-center py-2">
            Thanks! We've received your details and will be in touch shortly.
          </AlertDescription>
        </Alert>

        {transactionId && (
          <p className="text-center text-xs text-gray-400">
            Reference:{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-600">
              {transactionId}
            </code>
          </p>
        )}

        {editState === "saved" ? (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-800 text-center py-2">
              Your details have been updated.
            </AlertDescription>
          </Alert>
        ) : editState === "hidden" ? (
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setEditState("open");
                if (submittedData) {
                  editForm.reset({
                    firstName: submittedData.firstName,
                    lastName: submittedData.lastName,
                    phone: submittedData.phone,
                    dateOfBirth: submittedData.dateOfBirth,
                    address: submittedData.address,
                  });
                }
              }}
              className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors"
            >
              Made a mistake? Edit your submission
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Edit your submission
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Only fill in the fields you want to change.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditState("hidden")
                  setEditError("")
                  editForm.reset()
                }}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                aria-label="Close edit panel"
              >
                ✕
              </button>
            </div>

            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(onEdit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
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
                    control={editForm.control}
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
                    control={editForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <UKPhoneInput
                            className="w-full"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
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
                      control={editForm.control}
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
                                <p className="text-center text-sm">
                                  No results found
                                </p>
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

                {editState === "error" && (
                  <Alert variant="destructive">
                    <AlertDescription>{editError}</AlertDescription>
                  </Alert>
                )}

                {editError && editState !== "error" && (
                  <p className="text-sm text-red-500">{editError}</p>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 text-sm"
                  disabled={editState === "saving"}
                >
                  {editState === "saving" ? "Saving…" : "Save changes"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          disabled={!form.formState.isValid || status === "loading"}
        >
          {status === "loading" ? "Submitting…" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
