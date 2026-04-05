"use client";

import { forwardRef } from "react";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { CircleFlag } from "react-circle-flags";
import { cn } from "@/lib/utils";

interface UKPhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  inline?: boolean;
}

export const UKPhoneInput = forwardRef<HTMLInputElement, UKPhoneInputProps>(
  ({ className, value, onChange, inline = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatter = new AsYouType("GB");
      const formatted = formatter.input(e.target.value);

      const parsed = parsePhoneNumberFromString(formatted, "GB");
      const e164 = parsed?.number ?? formatted;

      onChange?.(e164);
    };

    const wrapperClasses = cn(
      "flex items-center gap-2 relative bg-transparent transition-colors text-base rounded-md border border-input pl-3 h-9",
      "has-[input:focus]:ring-1 has-[input:focus]:ring-ring",
      inline && "rounded-l-none w-full",
      className
    );

    return (
      <div className={wrapperClasses}>
        <div className="w-4 h-4 rounded-full shrink-0">
          <CircleFlag countryCode="gb" height={16} />
        </div>

        <input
          ref={ref}
          type="tel"
          autoComplete="tel"
          placeholder="07123 456789"
          value={value}
          onChange={handleChange}
          className="flex w-full border-none bg-transparent outline-none text-sm"
          {...props}
        />
      </div>
    );
  }
);

UKPhoneInput.displayName = "UKPhoneInput";
