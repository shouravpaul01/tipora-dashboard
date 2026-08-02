"use client";

import {
  Wallet,
  DollarSign,
  TrendingDown,
  Building2,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { SummaryCard } from "../shared/SummaryCard";

interface WithdrawSummaryCardsProps {
  summary: {
    today: {
      totalWithdraws: number;
      totalAmount: number;
      totalNetAmount: number;
      totalPlatformFee: number;
      totalStripeFee: number;
    };
    weekly: {
      totalWithdraws: number;
      totalAmount: number;
      totalNetAmount: number;
      totalPlatformFee: number;
      totalStripeFee: number;
    };
    monthly: {
      totalWithdraws: number;
      totalAmount: number;
      totalNetAmount: number;
      totalPlatformFee: number;
      totalStripeFee: number;
    };
    yearly: {
      totalWithdraws: number;
      totalAmount: number;
      totalNetAmount: number;
      totalPlatformFee: number;
      totalStripeFee: number;
    };
    total: {
      totalWithdraws: number;
      totalAmount: number;
      totalNetAmount: number;
      totalPlatformFee: number;
      totalStripeFee: number;
    };
  };
}

export function WithdrawSummaryCards({
  summary,
}: WithdrawSummaryCardsProps) {
  const cards = [
    {
      title: "Total Withdraws",
      value: summary.total.totalWithdraws,
      subTitle: `$${summary.total.totalAmount.toLocaleString()} requested`,
      icon: Wallet,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-500",
    },
    {
      title: "Total Net Amount",
      value: `$${summary.total.totalNetAmount.toLocaleString()}`,
      subTitle: `${summary.total.totalWithdraws} withdrawals`,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-500",
    },
    {
      title: "Platform Fees",
      value: `$${summary.total.totalPlatformFee.toLocaleString()}`,
      subTitle: "Revenue from fees",
      icon: TrendingDown,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      border: "border-violet-500",
    },
    {
      title: "Stripe Fees",
      value: `$${summary.total.totalStripeFee.toLocaleString()}`,
      subTitle: "Processing fees",
      icon: Building2,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-500",
    },
    {
      title: "This Month",
      value: summary.monthly.totalWithdraws,
      subTitle: `$${summary.monthly.totalAmount.toLocaleString()} this month`,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      border: "border-yellow-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) =>  <SummaryCard
                      key={card.title}
                      {...card}
                    />)}
    </div>
  );
}