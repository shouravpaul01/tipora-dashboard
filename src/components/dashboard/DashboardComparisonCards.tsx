"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Users,
  Gift,
  Wallet,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface DashboardComparisonCardsProps {
  comparison: {
    users: { current: number; previous: number; growth: number };
    tips: { current: number; previous: number; growth: number };
    withdraws: { current: number; previous: number; growth: number };
    revenue: { current: number; previous: number; growth: number };
  };
}

export function DashboardComparisonCards({
  comparison,
}: DashboardComparisonCardsProps) {
  const comparisonItems = [
    {
      title: "Users",
      current: comparison.users.current,
      previous: comparison.users.previous,
      growth: comparison.users.growth,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Tips",
      current: comparison.tips.current,
      previous: comparison.tips.previous,
      growth: comparison.tips.growth,
      icon: Gift,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Withdraws",
      current: comparison.withdraws.current,
      previous: comparison.withdraws.previous,
      growth: comparison.withdraws.growth,
      icon: Wallet,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Revenue",
      current: `$${comparison.revenue.current}`,
      previous: `$${comparison.revenue.previous}`,
      growth: comparison.revenue.growth,
      icon: DollarSign,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      isCurrency: true,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {comparisonItems.map((item) => {
        const Icon = item.icon;
        const isPositive = item.growth >= 0;

        return (
          <Card
            key={item.title}
            className="p-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-xl ${item.iconBg} p-3`}>
                  <Icon className={`size-5 ${item.iconColor}`} />
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isPositive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="size-3.5" />
                  ) : (
                    <TrendingDown className="size-3.5" />
                  )}
                  {Math.abs(item.growth).toFixed(1)}%
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl font-bold">
                    {typeof item.current === "number"
                      ? item.current.toLocaleString()
                      : item.current}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    prev month: {typeof item.previous === "number"
                      ? item.previous.toLocaleString()
                      : item.previous}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}