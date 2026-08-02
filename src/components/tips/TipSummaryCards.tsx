"use client";

import { Gift, DollarSign, Users, TrendingUp, Clock } from "lucide-react";

import { SummaryCard } from "../shared/SummaryCard";

interface TipSummaryCardsProps {
  summary: {
    today: {
      totalTips: number;
      totalAmount: number;
    };
    weekly: {
      totalTips: number;
      totalAmount: number;
    };
    monthly: {
      totalTips: number;
      totalAmount: number;
    };
    yearly: {
      totalTips: number;
      totalAmount: number;
    };
    total: {
      totalTips: number;
      totalAmount: number;
    };
  };
}

export function TipSummaryCards({ summary }: TipSummaryCardsProps) {
  const cards = [
    {
      title: "Total Tips",
      value: summary.total.totalTips,
      subTitle: `$${summary.total.totalAmount.toLocaleString()} total amount`,
      icon: Gift,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-500",
    },
    {
      title: "Total Amount",
      value: `$${summary.total.totalAmount.toLocaleString()}`,
      subTitle: `${summary.total.totalTips} tips overall`,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-500",
    },
    {
      title: "Today",
      value: summary.today.totalTips,
      subTitle: `$${summary.today.totalAmount.toLocaleString()} today`,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      border: "border-yellow-500",
    },
    {
      title: "This Week",
      value: summary.weekly.totalTips,
      subTitle: `$${summary.weekly.totalAmount.toLocaleString()} this week`,
      icon: TrendingUp,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      border: "border-violet-500",
    },
    {
      title: "This Month",
      value: summary.monthly.totalTips,
      subTitle: `$${summary.monthly.totalAmount.toLocaleString()} this month`,
      icon: Users,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-500",
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
