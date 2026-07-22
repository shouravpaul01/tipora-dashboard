"use client";

import { cn } from "@/lib/utils";

interface DashboardRevenueFilterProps {
  period: "weekly" | "monthly" | "yearly";
  onPeriodChange: (period: "weekly" | "monthly" | "yearly") => void;
}

export function DashboardRevenueFilter({
  period,
  onPeriodChange,
}: DashboardRevenueFilterProps) {
  const periods = [
    { value: "weekly" as const, label: "Weekly" },
    { value: "monthly" as const, label: "Monthly" },
    { value: "yearly" as const, label: "Yearly" },
  ];

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Revenue Overview</h3>
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => onPeriodChange(p.value)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-all",
              period === p.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}