"use client";

import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardRevenueChartProps {
  data: {
    label: string;
    amount: number;
  }[];
  period: "weekly" | "monthly" | "yearly";
}

export function DashboardRevenueChart({
  data,
  period,
}: DashboardRevenueChartProps) {
  const getPeriodLabel = () => {
    switch (period) {
      case "weekly":
        return "Revenue This Week";

      case "monthly":
        return "Revenue This Year";

      case "yearly":
        return "Revenue By Year";
    }
  };

  const totalRevenue = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="min-w-[170px] rounded-xl border bg-background p-4 shadow-xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-primary" />

          <span className="text-sm text-muted-foreground">
            Revenue
          </span>
        </div>

        <h3 className="mt-2 text-2xl font-bold text-primary">
          $
          {Number(payload[0].value).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </h3>
      </div>
    );
  };

  return (
    <Card className="h-full border shadow-sm">
      <CardContent className="flex h-full flex-col p-6">
        {/* Header */}

        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {getPeriodLabel()}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              $
              {totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Platform revenue generated
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2">
            <TrendingUp className="size-4 text-emerald-600" />

            <span className="text-xs font-semibold text-emerald-600">
              Revenue
            </span>
          </div>
        </div>

        {/* Chart */}

        <div className="h-[380px] flex-1">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{
                top: 15,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="60%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.18}
                  />

                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="hsl(var(--border))"
                opacity={0.5}
                vertical={false}
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                width={55}
                tickMargin={10}
                tickFormatter={formatCurrency}
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />

              <Tooltip
                cursor={{
                  stroke:
                    "hsl(var(--primary))",
                  strokeDasharray: "4 4",
                }}
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{
                  r: 7,
                  fill: "white",
                  stroke:
                    "hsl(var(--primary))",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}