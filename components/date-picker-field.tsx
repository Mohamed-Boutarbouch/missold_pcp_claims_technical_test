"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerFieldProps = {
  value: Date | undefined
  onChangeAction: (date: Date | undefined) => void
}

export function DatePickerField({
  value,
  onChangeAction,
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="font-sans w-full">
      <FieldLabel htmlFor="date">Date of birth</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal w-full"
          >
            {value ? value.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChangeAction(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
