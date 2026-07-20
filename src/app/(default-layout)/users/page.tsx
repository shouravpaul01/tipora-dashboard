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

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

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
  });

  /**
   * Summary
   */
  const { data: summaryRes, isLoading: summaryLoading } =
    useGetUserSummaryQuery(undefined);

  /**
   * Single User
   */
  const { data: userDetails } = useGetSingleUserQuery(
    selectedUserId,
    {
      skip: !selectedUserId,
    }
  );

  /**
   * Update Status
   */
  const [updateStatus, { isLoading: updating }] =
    useUpdateUserStatusMutation();

  const handleStatusChange = async (
    id: string,
    status: "ACTIVE" | "BLOCKED"
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
    return (
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>

        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="text-muted-foreground">
          Manage platform users
        </p>
      </div>

      <UserSummaryCards
        summary={summaryRes?.data}
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