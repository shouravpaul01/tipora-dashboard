"use client";

import SearchInput from "@/components/shared/SearchInput";
import FilterSelect from "@/components/shared/FilterSelect";

interface UserFilterProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
}

export default function UserFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: UserFilterProps) {
  return (
    <div className="bg-slate-100 flex flex-col gap-4 rounded-xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="w-full md:max-w-md">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by name, email or phone..."
        />
      </div>

      {/* Filters */}
      <div className="flex w-full gap-3 md:w-auto">
        <FilterSelect
          label="Status"
          labelPosition="top"
          value={status}
          onChange={onStatusChange}
          placeholder="All Status"
          includeAllOption
          options={[
            {
              label: "Active",
              value: "ACTIVE",
            },
            {
              label: "Blocked",
              value: "BLOCKED",
            },
          ]}
        />
      </div>
    </div>
  );
}