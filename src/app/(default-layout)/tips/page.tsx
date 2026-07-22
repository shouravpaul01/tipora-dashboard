"use client";

import { useEffect, useState } from "react";

import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import SkeletonLoading from "@/components/shared/SkeletonLoading";



import {
  useGetAllTipsQuery,
  useGetSingleTipQuery,
  useGetTipSummaryQuery,
} from "@/redux/api/tipApi";
import { useDebounce } from "@/hooks/useDebounce";
import { TipSummaryCards } from "@/components/tips/TipSummaryCards";
import TipFilter from "@/components/tips/TipFilter";
import { TipTable } from "@/components/tips/TipTable";
import { TipDetailsDialog } from "@/components/tips/TipDetailsDialog";

export default function TipsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedTipId, setSelectedTipId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
const [toDate, setToDate] = useState<Date>();

  const debouncedSearch = useDebounce(search);

  /**
   * Tips
   */
  const {
  data: tipsRes,
  isLoading: tipsLoading,
  isFetching,
} = useGetAllTipsQuery({
  page: currentPage,
  limit,
  searchTerm: debouncedSearch,
  status,
  fromDate: fromDate?.toISOString(),
  toDate: toDate?.toISOString(),
});
useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearch, status, fromDate, toDate]);
  /**
   * Summary
   */
  const { data: summaryRes, isLoading: summaryLoading } =
    useGetTipSummaryQuery(undefined);

  /**
   * Single Tip
   */
  const { data: tipDetails } = useGetSingleTipQuery(selectedTipId, {
    skip: !selectedTipId,
  });

  const handleViewDetails = (id: string) => {
    setSelectedTipId(id);
    setShowDetails(true);
  };

  if (tipsLoading || summaryLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Tips Management"
        description="Monitor and manage all tip transactions"
      />
      <TipSummaryCards summary={summaryRes?.data} />
      <TipFilter
  search={search}
  onSearchChange={setSearch}
  status={status}
  onStatusChange={setStatus}
  fromDate={fromDate}
  toDate={toDate}
  onFromDateChange={setFromDate}
  onToDateChange={setToDate}
  onClear={() => {
    setSearch("");
    setStatus("");
    setFromDate(undefined);
    setToDate(undefined);
    setCurrentPage(1);
  }}
/>
      <TipTable
        loading={isFetching}
        tips={tipsRes?.data || []}
        onViewDetails={handleViewDetails}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={tipsRes?.meta?.totalPage || 1}
        totalData={tipsRes?.meta?.total || 0}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
      />

      <TipDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        tip={tipDetails?.data}
      />
    </div>
  );
}