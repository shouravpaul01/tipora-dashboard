"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CreditCard,
  MessageSquare,
  Wallet,
} from "lucide-react";


import { formatDate } from "@/utils/formatDate";

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any | null;
}

export function UserDetailsDialog({
  open,
  onOpenChange,
  user,
}: UserDetailsDialogProps) {
  if (!user) return null;

  const getInitials = (firstName?: string, lastName?: string) =>
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl! !p-0 h-[90vh] overflow-hidden flex flex-col rounded-3xl">
        <DialogHeader>
          {/* ================= Header ================= */}

          <div className="relative overflow-hidden border-b bg-gradient-to-r from-primary/5 via-background to-primary/10 px-8 py-8">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
              <Avatar className="size-28 border-4 border-background shadow-xl">
                <AvatarImage src={user.photo || ""} />

                <AvatarFallback className="bg-primary text-3xl font-bold text-white">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {user.fullName}
                  </h2>

                  <Badge
                    className={
                      user.status === "ACTIVE"
                        ? "border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700"
                        : "border border-red-200 bg-red-50 px-3 py-1 text-red-700"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>

                

                <p className="mt-1 text-sm text-muted-foreground">
                  Joined {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-8 py-5">
            {/* ================= Contact Cards ================= */}

            <div className="grid gap-5 px-8 md:grid-cols-3">
              {/* Email */}

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Mail className="size-5 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Email
                    </p>

                    <p className="font-medium break-all">
                      {user.email || "No Email"}
                    </p>

                    <div className="flex items-center gap-2 text-xs">
                      {user.isEmailVerified ? (
                        <>
                          <CheckCircle2 className="size-4 text-emerald-500" />
                          <span className="text-emerald-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-4 text-yellow-600" />
                          <span className="text-yellow-600">Not Verified</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Phone className="size-5 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Phone
                    </p>

                    <p className="font-medium">{user.phone}</p>

                    <div className="flex items-center gap-2 text-xs">
                      {user.isPhoneVerified ? (
                        <>
                          <CheckCircle2 className="size-4 text-emerald-500" />
                          <span className="text-emerald-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-4 text-yellow-500" />
                          <span className="text-yellow-500">Not Verified</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Joined */}

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Calendar className="size-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Member Since
                    </p>

                    <p className="font-medium">{formatDate(user.createdAt)}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {user.auth?.lastLoginAt
                        ? `Last Login ${formatDate(user.auth.lastLoginAt)}`
                        : "Never Logged In"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ===== Part 2 starts here ===== */}
            {/* ================= Statistics ================= */}

            <div className="grid gap-5 px-8 md:grid-cols-2 xl:grid-cols-4">
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Wallet Balance
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      ${Number(user.wallet?.availableBalance ?? 0).toFixed(2)}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Available Balance
                    </p>
                  </div>

                  <div className="rounded-2xl bg-primary/10 p-4">
                    <Wallet className="size-7 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Earned
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      ${Number(user.wallet?.totalEarned ?? 0).toFixed(2)}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Lifetime Earnings
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-500/10 p-4">
                    <TrendingUp className="size-7 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Methods
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {user.stats?.totalPaymentMethods ?? 0}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Connected Accounts
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blue-500/10 p-4">
                    <CreditCard className="size-7 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Support Tickets
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {user.stats?.totalRaisedTickets ?? 0}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Total Created
                    </p>
                  </div>

                  <div className="rounded-2xl bg-orange-500/10 p-4">
                    <MessageSquare className="size-7 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ================= Activity ================= */}

            <div className="grid gap-6 px-8 pb-8 lg:grid-cols-2 ">
              <Card className="p-0">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-lg font-semibold">
                    Activity Summary
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tips Sent</span>

                      <span className="font-semibold">
                        {user.stats?.totalSentTips ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Tips Received
                      </span>

                      <span className="font-semibold">
                        {user.stats?.totalReceivedTips ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Withdraw Requests
                      </span>

                      <span className="font-semibold">
                        {user.stats?.totalWithdrawRequests ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Assigned Tickets
                      </span>

                      <span className="font-semibold">
                        {user.stats?.totalAssignedTickets ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Notifications
                      </span>

                      <span className="font-semibold">
                        {user.stats?.totalNotifications ?? 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-0">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-lg font-semibold">
                    Financial Summary
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Wallet Currency
                      </span>

                      <span className="font-semibold uppercase">
                        {user.wallet?.currency ?? "USD"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Available Balance
                      </span>

                      <span className="font-semibold text-green-600">
                        ${Number(user.wallet?.availableBalance ?? 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Withdrawn
                      </span>

                      <span className="font-semibold">
                        ${Number(user.wallet?.totalWithdrawn ?? 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Earned
                      </span>

                      <span className="font-semibold">
                        ${Number(user.wallet?.totalEarned ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* ================= Footer ================= */}
          </div>
        </div>
        <div className="shrink-0 border-t bg-muted/20 px-8 py-5">
          <div className="flex  text-sm text-muted-foreground md:flex-row md:items-center md:justify-end">

            <div className="flex items-center gap-6">
              <div>
                <span className="font-medium text-foreground">Status:</span>{" "}
                {user.status}
              </div>

              <div>
                <span className="font-medium text-foreground">Last Login:</span>{" "}
                {user.auth?.lastLoginAt
                  ? formatDate(user.auth.lastLoginAt)
                  : "Never"}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
