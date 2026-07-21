"use client";

import { useState } from "react";

import SectionHeader from "@/components/shared/SectionHeader";
import SkeletonLoading from "@/components/shared/SkeletonLoading";

import { DashboardSummaryCards } from "@/components/dashboard/DashboardSummaryCards";
import { DashboardComparisonCards } from "@/components/dashboard/DashboardComparisonCards";
import { DashboardRevenueFilter } from "@/components/dashboard/DashboardRevenueFilter";
import { DashboardRevenueChart } from "@/components/dashboard/DashboardRevenueChart";
import { DashboardGrowthChart } from "@/components/dashboard/DashboardGrowthChartProps";
import { DashboardRecentUsers } from "@/components/dashboard/DashboardRecentUsers";

import { useGetDashboardOverviewQuery } from "@/redux/api/dashboardApi";

export default function DashboardPage() {
  const [revenuePeriod, setRevenuePeriod] = useState<
    "weekly" | "monthly" | "yearly"
  >("monthly");

  const { data: dashboardRes, isLoading } =
    useGetDashboardOverviewQuery(undefined);

  if (isLoading) {
    return <SkeletonLoading />;
  }

  const dashboardData = dashboardRes?.data;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard"
        description="Overview of your platform performance"
      />

      {/* Summary */}
      <DashboardSummaryCards
        cards={dashboardData?.cards}
      />

      {/* Comparison */}
      <DashboardComparisonCards
        comparison={dashboardData?.comparison}
      />

      {/* Charts */}
      <div className="grid items-stretch gap-6 lg:grid-cols-7">

        {/* Revenue */}
        <div className="flex flex-col gap-4 lg:col-span-4">

          <DashboardRevenueFilter
            period={revenuePeriod}
            onPeriodChange={setRevenuePeriod}
          />

          <div className="flex-1">
            <DashboardRevenueChart
              data={
                dashboardData?.revenueCharts?.[
                  revenuePeriod
                ] || []
              }
              period={revenuePeriod}
            />
          </div>

        </div>

        {/* Growth */}
        <div className="flex lg:col-span-3">

          <div className="w-full">
            <DashboardGrowthChart
              data={dashboardData?.growthCharts}
            />
          </div>

        </div>

      </div>

      {/* Recent Users */}
      <DashboardRecentUsers
        users={dashboardData?.recentUsers || []}
      />
    </div>
  );
}