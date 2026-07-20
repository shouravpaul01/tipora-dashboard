"use client";

import { ElementType } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";

type IconConfig = {
  icon: ElementType;
  onClick?: () => void;
  className?: string;
};

interface FormPhoneInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  defaultCountry?: string;
  disabled?: boolean;
}

export function FormPhoneInput({
  name,
  label,
  placeholder = "Enter phone number",
  description,
  defaultCountry = "bd",
  disabled = false,
}: FormPhoneInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            defaultCountry={defaultCountry}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            disabled={disabled}
            inputProps={{
              id: name,
              placeholder,
            }}
            className="w-full"
            inputClassName={cn(
              "w-full h-12! rounded-r-lg! border border-l-0 border-input bg-background px-3 text-base!",
              "placeholder:text-muted-foreground! focus-visible:border-ring! focus-visible:ring-3! focus-visible:ring-ring/50!",
              error && "border-destructive"
            )}
            countrySelectorStyleProps={{
              buttonClassName:
                "h-12! rounded-l-lg! border border-r-0 border-input bg-background px-3!",
              dropdownStyleProps: {
                className: "z-50 rounded-md!",
              },
            }}
          />
        )}
      />

      {description && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}