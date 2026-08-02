"use client";

import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subTitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  border: string;
  valueColor?: string;
}

export function SummaryCard({
  title,
  value,
  subTitle,
  icon: Icon,
  iconBg,
  iconColor,
  border,
  valueColor,
}: SummaryCardProps) {
  return (
    <Card
      className={`
        p-0
        group
        relative
        overflow-hidden
        border
        ${border}
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
              {title}
            </p>

            <h2 className={`mt-3 text-4xl font-bold tracking-tight ${valueColor}`}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />

              <p className="text-xs text-muted-foreground">
                {subTitle}
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
              ${iconBg}
              transition-transform
              duration-300
              group-hover:rotate-6
              group-hover:scale-110
            `}
          >
            <Icon className={`h-7 w-7 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}