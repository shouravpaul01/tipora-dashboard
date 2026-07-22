"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";

import Pagination from "@/components/shared/Pagination";

import { UserSummaryCards } from "@/components/users/UserSummaryCards";
import { UserTable } from "@/components/users/UserTable";
import { UserDetailsDialog } from "@/components/users/UserDetailsDialog";

import {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetUserSummaryQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi";
import { useDebounce } from "@/hooks/useDebounce";
import UserFilter from "@/components/users/UserFilter";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import SectionHeader from "@/components/shared/SectionHeader";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounce(search);

  /**
   * Users
   */
  const {
    data: usersRes,
    isLoading: usersLoading,
    isFetching,
  } = useGetAllUsersQuery({
    page: currentPage,
    limit,
    searchTerm: debouncedSearch,
    status,
  });

  /**
   * Summary
   */
  const { data: summaryRes, isLoading: summaryLoading } =
    useGetUserSummaryQuery(undefined);

  /**
   * Single User
   */
  const { data: userDetails } = useGetSingleUserQuery(selectedUserId, {
    skip: !selectedUserId,
  });

  /**
   * Update Status
   */
  const [updateStatus, { isLoading: updating }] = useUpdateUserStatusMutation();

  const handleStatusChange = async (
    id: string,
    status: "ACTIVE" | "BLOCKED",
  ) => {
    try {
      const res: any = await updateStatus({
        id,
        status,
      }).unwrap();

      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedUserId(id);
    setShowDetails(true);
  };

  if (usersLoading || summaryLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Users Management"
        description=" Manage platform users"
      />
      <UserSummaryCards summary={summaryRes?.data} />
      <UserFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      <UserTable
        loading={isFetching || updating}
        users={usersRes?.data || []}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={usersRes?.meta?.totalPage || 1}
        totalData={usersRes?.meta?.total || 0}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
      />

      <UserDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        user={userDetails?.data}
      />
    </div>
  );
}
