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
      {cardItems.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className={`
              p-0
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

                  <h2 className={`mt-3 text-4xl font-bold tracking-tight ${card.valueColor}`}>
                    {typeof card.value === "number"
                      ? card.value.toLocaleString()
                      : card.value}
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