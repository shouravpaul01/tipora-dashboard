"use client";

import {
  Users,
  Gift,
  Wallet,
  DollarSign,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { SummaryCard } from "../shared/SummaryCard";

interface DashboardSummaryCardsProps {
  cards: {
    totalUsers: number;
    totalTips: number;
    totalWithdraws: number;
    totalPlatformRevenue: number;
  };
}

export function DashboardSummaryCards({
  cards,
}: DashboardSummaryCardsProps) {
  const cardItems = [
    {
      title: "Total Users",
      value: cards?.totalUsers,
      subTitle: "Registered users",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-500",
      valueColor: "text-blue-600",
    },
    {
      title: "Total Tips",
      value: cards?.totalTips,
      subTitle: "Tips sent",
      icon: Gift,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-500",
      valueColor: "text-green-600",
    },
    {
      title: "Total Withdraws",
      value: cards?.totalWithdraws,
      subTitle: "Withdrawal requests",
      icon: Wallet,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      border: "border-violet-500",
      valueColor: "text-violet-600",
    },
    {
      title: "Platform Revenue",
      value: `$${cards?.totalPlatformRevenue.toLocaleString()}`,
      subTitle: "Total earnings",
      icon: DollarSign,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-500",
      valueColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cardItems.map((card) => <SummaryCard
          key={card.title}
          {...card}
        />)}
    </div>
  );
}