"use client";

import {
  Users,
  UserCheck,
  UserX,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { SummaryCard } from "../shared/SummaryCard";

interface UserSummaryCardsProps {
  summary: {
    today: number;
    weekly: number;
    monthly: number;
    yearly: number;
    total: number;
    verifiedUsers: number;
    activeUsers: number;
    blockedUsers: number;
  };
}

export function UserSummaryCards({
  summary,
}: UserSummaryCardsProps) {
  const cards = [
    {
      title: "Total Users",
      value: summary.total,
      subTitle: `+${summary.today} joined today`,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-500",
    },
    {
      title: "Active Users",
      value: summary.activeUsers,
      subTitle: `${(
        (summary.activeUsers / summary.total) *
        100
      ).toFixed(1)}% active`,
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-500",
    },
    {
      title: "Blocked Users",
      value: summary.blockedUsers,
      subTitle: `${(
        (summary.blockedUsers / summary.total) *
        100
      ).toFixed(1)}% blocked`,
      icon: UserX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      border: "border-red-500",
    },
    {
      title: "Verified Users",
      value: summary.verifiedUsers,
      subTitle: `${(
        (summary.verifiedUsers / summary.total) *
        100
      ).toFixed(1)}% verified`,
      icon: BadgeCheck,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      border: "border-violet-500",
    },
    {
      title: "New This Week",
      value: summary.weekly,
      subTitle: `${summary.monthly} this month`,
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => <SummaryCard
                key={card.title}
                {...card}
              />)}
    </div>
  );
}