"use client";

import { RotateCcw } from "lucide-react";

import SearchInput from "@/components/shared/SearchInput";
import FilterSelect from "@/components/shared/FilterSelect";
import FilterDatePicker from "@/components/shared/FilterDatePicker";
import { Button } from "@/components/ui/button";
interface WithdrawFilterProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string) => void;

  fromDate: Date | undefined;
  onFromDateChange: (date: Date | undefined) => void;

  toDate: Date | undefined;
  onToDateChange: (date: Date | undefined) => void;

  onClear: () => void;
}
export default function WithdrawFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  type,
  onTypeChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onClear,
}: WithdrawFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="w-full xl:max-w-md">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search by user name, email or phone..."
          />
        </div>

           <div className="flex flex-wrap items-end gap-3">
          <FilterSelect
            label="Status"
            labelPosition="top"
            value={status}
            onChange={onStatusChange}
            placeholder="All Status"
            includeAllOption
            options={[
              { label: "Completed", value: "COMPLETED" },
              { label: "Processing", value: "PROCESSING" },
              { label: "Pending", value: "PENDING" },
              { label: "Failed", value: "FAILED" },
            ]}
          />

          <FilterSelect
          
            label="Type"
            labelPosition="top"
            value={type}
            onChange={onTypeChange}
            placeholder="All Types"
            includeAllOption
            options={[
              { label: "Instant", value: "INSTANT" },
              { label: "Standard", value: "STANDARD" },
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
            onClick={onClear}
            className="h-11 mt-5"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}