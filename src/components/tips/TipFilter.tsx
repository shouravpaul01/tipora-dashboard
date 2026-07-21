"use client";

import { RotateCcw } from "lucide-react";

import SearchInput from "@/components/shared/SearchInput";
import FilterSelect from "@/components/shared/FilterSelect";
import FilterDatePicker from "@/components/shared/FilterDatePicker";
import { Button } from "@/components/ui/button";

interface TipFilterProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  fromDate?: Date;
  toDate?: Date;

  onFromDateChange: (date: Date | undefined) => void;
  onToDateChange: (date: Date | undefined) => void;

  onClear: () => void;
}

export default function TipFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onClear,
}: TipFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 lg:flex-row lg:items-end lg:justify-between">
      {/* Left */}
      <div className="w-full lg:max-w-md">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by sender, receiver, email or phone..."
        />
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-end gap-3">
        <FilterDatePicker
          className="min-w-[180px]!"
          label="From"
          value={fromDate}
          onChange={onFromDateChange}
          placeholder="Start Date"
        />

        <FilterDatePicker
          className="min-w-[180px]!"
          label="To"
          value={toDate}
          onChange={onToDateChange}
          placeholder="End Date"
        />

        <FilterSelect
          label="Status"
          labelPosition="top"
          value={status}
          onChange={onStatusChange}
          placeholder="All Status"
          includeAllOption
          options={[
            {
              label: "Pending",
              value: "PENDING",
            },
            {
              label: "Completed",
              value: "COMPLETED",
            },
            {
              label: "Failed",
              value: "FAILED",
            },
            {
              label: "Refunded",
              value: "REFUNDED",
            },
          ]}
        />

        <Button
          type="button"
          variant="outline"
          onClick={onClear}
          className="h-11 gap-2 px-4"
        >
          <RotateCcw className="size-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
