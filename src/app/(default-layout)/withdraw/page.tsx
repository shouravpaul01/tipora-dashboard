"use client";

import { useState } from "react";

import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import SkeletonLoading from "@/components/shared/SkeletonLoading";



import {
  useGetAllWithdrawsQuery,
  useGetSingleWithdrawQuery,
  useGetWithdrawSummaryQuery,
} from "@/redux/api/withdrawApi";
import { useDebounce } from "@/hooks/useDebounce";
import { WithdrawSummaryCards } from "@/components/withdraw/WithdrawSummaryCards";
import WithdrawFilter from "@/components/withdraw/WithdrawFilter";
import { WithdrawTable } from "@/components/withdraw/WithdrawTable";
import { WithdrawDetailsDialog } from "@/components/withdraw/WithdrawDetailsDialog";

export default function WithdrawPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedWithdrawId, setSelectedWithdrawId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
const [toDate, setToDate] = useState<Date>();

  const debouncedSearch = useDebounce(search);

 const {
  data: withdrawsRes,
  isLoading: withdrawsLoading,
  isFetching,
} = useGetAllWithdrawsQuery({
  page: currentPage,
  limit,
  searchTerm: debouncedSearch,
  status,
  type,
  fromDate: fromDate?.toISOString(),
  toDate: toDate?.toISOString(),
});

  const { data: summaryRes, isLoading: summaryLoading } =
    useGetWithdrawSummaryQuery(undefined);

  const { data: withdrawDetails } = useGetSingleWithdrawQuery(
    selectedWithdrawId,
    { skip: !selectedWithdrawId }
  );

  const handleViewDetails = (id: string) => {
    setSelectedWithdrawId(id);
    setShowDetails(true);
  };
const handleClear = () => {
  setSearch("");
  setStatus("");
  setType("");
  setFromDate(undefined);
  setToDate(undefined);
  setCurrentPage(1);
};
  if (withdrawsLoading || summaryLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Withdraw Management"
        description="Monitor and manage all withdrawal requests"
      />
      <WithdrawSummaryCards summary={summaryRes?.data} />
      <WithdrawFilter
  search={search}
  onSearchChange={setSearch}
  status={status}
  onStatusChange={setStatus}
  type={type}
  onTypeChange={setType}
  fromDate={fromDate}
  onFromDateChange={setFromDate}
  toDate={toDate}
  onToDateChange={setToDate}
  onClear={handleClear}
/>
      <WithdrawTable
        loading={isFetching}
        withdraws={withdrawsRes?.data || []}
        onViewDetails={handleViewDetails}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={withdrawsRes?.meta?.totalPage || 1}
        totalData={withdrawsRes?.meta?.total || 0}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
      />

      <WithdrawDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        withdraw={withdrawDetails?.data}
      />
    </div>
  );
}