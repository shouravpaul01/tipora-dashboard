"use client";

import {
  DollarSign,
  TrendingUp,
  Clock,
  CalendarDays,
  BarChart3,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SummaryCard } from "../shared/SummaryCard";

interface PlatformRevenueSummaryCardsProps {
  summary: {
    today: number;
    weekly: number;
    monthly: number;
    yearly: number;
    total: number;
  };
}

export function PlatformRevenueSummaryCards({
  summary,
}: PlatformRevenueSummaryCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${summary.total.toLocaleString()}`,
      subTitle: "All time earnings",
      icon: BarChart3,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-500",
    },
    {
      title: "Today",
      value: `$${summary.today.toLocaleString()}`,
      subTitle: "Today's revenue",
      icon: Clock,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-500",
    },
    {
      title: "This Week",
      value: `$${summary.weekly.toLocaleString()}`,
      subTitle: "Last 7 days",
      icon: TrendingUp,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      border: "border-violet-500",
    },
    {
      title: "This Month",
      value: `$${summary.monthly.toLocaleString()}`,
      subTitle: `${summary.monthly > 0 ? "Current month" : "No revenue"}`,
      icon: CalendarDays,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-500",
    },
    {
      title: "This Year",
      value: `$${summary.yearly.toLocaleString()}`,
      subTitle: "Year to date",
      icon: DollarSign,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      border: "border-yellow-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
}
