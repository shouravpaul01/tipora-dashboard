"use client";

import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterDatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;

  placeholder?: string;

  label?: string;
  labelPosition?: "top" | "left";

  className?: string;
  labelClassName?: string;
  containerClassName?: string;

  allowClear?: boolean;
}

export default function FilterDatePicker({
  value,
  onChange,
  placeholder = "Select date",

  label,
  labelPosition = "top",

  className,
  labelClassName,
  containerClassName,

  allowClear = true,
}: FilterDatePickerProps) {
  const picker = (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-11 w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />

            {value
              ? format(value, "PPP")
              : placeholder}
          </div>

          {allowClear && value ? (
            <X
              className="size-4 opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onChange(undefined);
              }}
            />
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
        captionLayout="dropdown"  
        />
      </PopoverContent>
    </Popover>
  );

  if (!label) return picker;

  if (labelPosition === "left") {
    return (
      <div
        className={cn(
          "flex items-center gap-3",
          containerClassName
        )}
      >
        <Label
          className={cn(
            "min-w-24 font-medium",
            labelClassName
          )}
        >
          {label}
        </Label>

        <div className="flex-1">{picker}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-2",
        containerClassName
      )}
    >
      <Label
        className={cn(
          "font-medium",
          labelClassName
        )}
      >
        {label}
      </Label>

      {picker}
    </div>
  );
}