"use client";

import {
  Gift,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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

export function TipSummaryCards({
  summary,
}: TipSummaryCardsProps) {
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
      {cards.map((card) => {
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

                  <h2 className="mt-3 text-4xl font-bold tracking-tight">
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