"use client";

import SearchInput from "@/components/shared/SearchInput";
import FilterSelect from "@/components/shared/FilterSelect";

interface TicketFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  priority: string;
  onPriorityChange: (value: string) => void;
}

export default function TicketFilter({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
}: TicketFilterProps) {
  return (
    <div className="bg-slate-100 flex flex-col gap-4 rounded-xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-md">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by subject, ticket #, user..."
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <FilterSelect
          label="Status"
          labelPosition="top"
          value={status}
          onChange={onStatusChange}
          placeholder="All Status"
          includeAllOption
          options={[
            { label: "Open", value: "OPEN" },
            { label: "In Progress", value: "IN_PROGRESS" },
            { label: "Resolved", value: "RESOLVED" },
            { label: "Closed", value: "CLOSED" },
          ]}
        />
        <FilterSelect
          label="Category"
          labelPosition="top"
          value={category}
          onChange={onCategoryChange}
          placeholder="All Categories"
          includeAllOption
          options={[
            { label: "Payment Issue", value: "PAYMENT_ISSUE" },
            { label: "Withdrawal Issue", value: "WITHDRAWAL_ISSUE" },
            { label: "Account Issue", value: "ACCOUNT_ISSUE" },
            { label: "Other", value: "OTHER" },
          ]}
        />
        <FilterSelect
          label="Priority"
          labelPosition="top"
          value={priority}
          onChange={onPriorityChange}
          placeholder="All Priorities"
          includeAllOption
          options={[
            { label: "Low", value: "LOW" },
            { label: "Medium", value: "MEDIUM" },
            { label: "High", value: "HIGH" },
            { label: "Urgent", value: "URGENT" },
          ]}
        />
      </div>
    </div>
  );
}