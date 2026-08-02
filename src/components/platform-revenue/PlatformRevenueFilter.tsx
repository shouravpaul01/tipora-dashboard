"use client";

import { RotateCcw } from "lucide-react";

import SearchInput from "@/components/shared/SearchInput";
import FilterSelect from "@/components/shared/FilterSelect";
import FilterDatePicker from "@/components/shared/FilterDatePicker";
import { Button } from "@/components/ui/button";

interface PlatformRevenueFilterProps {
  search: string;
  onSearchChange: (value: string) => void;

  source: string;
  onSourceChange: (value: string) => void;

  fromDate: Date | undefined;
  onFromDateChange: (date: Date | undefined) => void;

  toDate: Date | undefined;
  onToDateChange: (date: Date | undefined) => void;

  onClear: () => void;
}

export default function PlatformRevenueFilter({
  search,
  onSearchChange,
  source,
  onSourceChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onClear,
}: PlatformRevenueFilterProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="w-full xl:max-w-md">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search by reference ID..."
          />
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <FilterSelect
            label="Source"
            labelPosition="top"
            value={source}
            onChange={onSourceChange}
            placeholder="All Sources"
            includeAllOption
            options={[
              { label: "Withdraw Fee", value: "WITHDRAW_FEE" },
              { label: "Tip Fee", value: "TIP_FEE" },
              { label: "Other", value: "OTHER" },
            ]}
          />

          <FilterDatePicker
            className="min-w-[180px]!"
            label="From Date"
            value={fromDate}
            onChange={onFromDateChange}
          />

          <FilterDatePicker
            className="min-w-[180px]!"
            label="To Date"
            value={toDate}
            onChange={onToDateChange}
          />

          <Button
            variant="outline"
            className="mt-auto h-11"
            onClick={onClear}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}