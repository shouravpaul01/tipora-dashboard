"use client";

import { useState } from "react";

import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import SkeletonLoading from "@/components/shared/SkeletonLoading";



import {
  useGetAllPlatformRevenuesQuery,
  useGetSinglePlatformRevenueQuery,
  useGetPlatformRevenueSummaryQuery,
} from "@/redux/api/platformRevenueApi";
import { useDebounce } from "@/hooks/useDebounce";
import { PlatformRevenueSummaryCards } from "@/components/platform-revenue/PlatformRevenueSummaryCards";
import PlatformRevenueFilter from "@/components/platform-revenue/PlatformRevenueFilter";
import { PlatformRevenueTable } from "@/components/platform-revenue/PlatformRevenueTable";
import { PlatformRevenueDetailsDialog } from "@/components/platform-revenue/PlatformRevenueDetailsDialog";

export default function PlatformRevenuePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedRevenueId, setSelectedRevenueId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
const [toDate, setToDate] = useState<Date>();

  const debouncedSearch = useDebounce(search);

 const {
  data: revenuesRes,
  isLoading: revenuesLoading,
  isFetching,
} = useGetAllPlatformRevenuesQuery({
  page: currentPage,
  limit,
  searchTerm: debouncedSearch,
  source,
  fromDate: fromDate?.toISOString(),
  toDate: toDate?.toISOString(),
});

  const { data: summaryRes, isLoading: summaryLoading } =
    useGetPlatformRevenueSummaryQuery(undefined);

  const { data: revenueDetails } = useGetSinglePlatformRevenueQuery(
    selectedRevenueId,
    { skip: !selectedRevenueId }
  );

  const handleViewDetails = (id: string) => {
    setSelectedRevenueId(id);
    setShowDetails(true);
  };
  const handleClear = () => {
  setSearch("");
  setSource("");
  setFromDate(undefined);
  setToDate(undefined);
  setCurrentPage(1);
};

  if (revenuesLoading || summaryLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Platform Revenue"
        description="Track all platform earnings from fees and commissions"
      />
      <PlatformRevenueSummaryCards summary={summaryRes?.data} />
    <PlatformRevenueFilter
  search={search}
  onSearchChange={setSearch}
  source={source}
  onSourceChange={setSource}
  fromDate={fromDate}
  onFromDateChange={setFromDate}
  toDate={toDate}
  onToDateChange={setToDate}
  onClear={handleClear}
/>
      <PlatformRevenueTable
        loading={isFetching}
        revenues={revenuesRes?.data || []}
        onViewDetails={handleViewDetails}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={revenuesRes?.meta?.totalPage || 1}
        totalData={revenuesRes?.meta?.total || 0}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
      />

      <PlatformRevenueDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        revenue={revenueDetails?.data}
      />
    </div>
  );
}