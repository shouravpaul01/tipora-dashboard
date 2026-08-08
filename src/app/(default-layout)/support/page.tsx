"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import SkeletonLoading from "@/components/shared/SkeletonLoading";


import { useGetAllTicketsQuery } from "@/redux/api/supportApi";
import { useDebounce } from "@/hooks/useDebounce";
import TicketFilter from "@/components/support/TicketFilter";
import { TicketTable } from "@/components/support/TicketTable";

export default function SupportPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data: ticketsRes, isLoading, isFetching } = useGetAllTicketsQuery({
    page: currentPage,
    limit,
    searchTerm: debouncedSearch,
    status,
    category,
    priority,
  });

  if (isLoading) return <SkeletonLoading />;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Support Tickets"
        description="Manage user and guest support requests"
      />
      <TicketFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
        priority={priority}
        onPriorityChange={setPriority}
      />
      <TicketTable
        loading={isFetching}
        tickets={ticketsRes?.data || []}
        onViewTicket={(id) => router.push(`/support/${id}`)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={ticketsRes?.meta?.totalPage || 1}
        totalData={ticketsRes?.meta?.total || 0}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}