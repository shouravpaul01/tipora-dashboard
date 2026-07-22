"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardGrowthChartProps {
  data: {
    users: { label: string; count: number }[];
    tips: { label: string; count: number }[];
    withdraws: { label: string; count: number }[];
  };
}

const COLORS = {
  users: "#2563eb", // Blue
  tips: "#10b981", // Emerald
  withdraws: "#f59e0b", // Amber
};

export function DashboardGrowthChart({
  data,
}: DashboardGrowthChartProps) {
  const mergedData = data.users.map((user, index) => ({
    label: user.label,
    users: user.count,
    tips: data.tips[index]?.count || 0,
    withdraws: data.withdraws[index]?.count || 0,
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="min-w-[180px] rounded-xl border bg-background p-4 shadow-xl">
        <p className="mb-3 border-b pb-2 text-sm font-semibold">
          {label}
        </p>

        {payload.map((entry: any) => (
          <div
            key={entry.dataKey}
            className="mb-2 flex items-center justify-between gap-6 last:mb-0"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-3 rounded-full"
                style={{
                  backgroundColor: entry.color,
                }}
              />
              <span className="text-sm">
                {entry.name}
              </span>
            </div>

            <span className="font-semibold">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="border shadow-sm p-0">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">
            Growth Overview
          </h3>

          <p className="text-sm text-muted-foreground">
            User registrations, tip activity and
            withdraw requests.
          </p>
        </div>

        <div className="h-[420px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={mergedData}
              barGap={8}
              barCategoryGap="22%"
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient
                  id="usersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#3b82f6"
                  />
                  <stop
                    offset="100%"
                    stopColor="#1d4ed8"
                  />
                </linearGradient>

                <linearGradient
                  id="tipsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#34d399"
                  />
                  <stop
                    offset="100%"
                    stopColor="#059669"
                  />
                </linearGradient>

                <linearGradient
                  id="withdrawGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#fbbf24"
                  />
                  <stop
                    offset="100%"
                    stopColor="#d97706"
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(0,0,0,0.04)",
                }}
                content={<CustomTooltip />}
              />

              <Legend
                iconType="circle"
                wrapperStyle={{
                  paddingTop: 10,
                }}
              />

              <Bar
                dataKey="users"
                name="Users"
                radius={[8, 8, 0, 0]}
                fill="url(#usersGradient)"
                maxBarSize={34}
              />

              <Bar
                dataKey="tips"
                name="Tips"
                radius={[8, 8, 0, 0]}
                fill="url(#tipsGradient)"
                maxBarSize={34}
              />

              <Bar
                dataKey="withdraws"
                name="Withdraws"
                radius={[8, 8, 0, 0]}
                fill="url(#withdrawGradient)"
                maxBarSize={34}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}