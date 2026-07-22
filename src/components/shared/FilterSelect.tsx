"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
  description?: string;
}

interface FilterSelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  includeAllOption?: boolean;

  // Optional Label
  label?: string;
  labelPosition?: "top" | "left";
  labelClassName?: string;
  containerClassName?: string;
}

export default function FilterSelect({
  value,
  onChange,
  placeholder = "Select",
  options,
  includeAllOption = false,

  label,
  labelPosition = "top",
  labelClassName,
  containerClassName,
}: FilterSelectProps) {
  const finalOptions = includeAllOption
    ? [{ label: "All", value: "all" }, ...options]
    : options;

  const selectedOption = finalOptions.find(
    (opt) => opt.value === value
  );

  const select = (
    <Select
      value={value || undefined}
      onValueChange={(val) =>
        onChange(val === "all" ? "" : val)
      }
    >
      <SelectTrigger className="h-11! w-full bg-background">
        <SelectValue placeholder={placeholder}>
          {selectedOption?.label ?? placeholder}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {finalOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {option.label}
              </span>

              {option.description && (
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (!label) {
    return select;
  }

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
            "min-w-24 text-sm font-medium",
            labelClassName
          )}
        >
          {label}
        </Label>

        <div className="flex-1">{select}</div>
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
          "text-sm font-medium",
          labelClassName
        )}
      >
        {label}
      </Label>

      {select}
    </div>
  );
}