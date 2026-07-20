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
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className={`
              group
              relative
              overflow-hidden
              border
              ${card.border}
              border-t-4
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            `}
          >
            {/* background glow */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:scale-125" />

            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold tracking-tight">
                    {card.value.toLocaleString()}
                  </h2>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />

                    <p className="text-xs text-muted-foreground">
                      {card.subTitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${card.iconBg}
                    transition-transform
                    duration-300
                    group-hover:rotate-6
                    group-hover:scale-110
                  `}
                >
                  <Icon
                    className={`h-7 w-7 ${card.iconColor}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}