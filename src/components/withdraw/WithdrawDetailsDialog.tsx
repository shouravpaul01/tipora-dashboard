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
  DollarSign,
  Building2,
  CreditCard,
  Wallet,
  TrendingDown,
  AlertCircle,
  Zap,
  Clock,
} from "lucide-react";

import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import { getInitials, getStatusLabel, statusDotStyles, statusStyles } from "@/constant";

interface WithdrawDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdraw: any | null;
}


const typeIcons: Record<string, any> = {
  INSTANT: Zap,
  STANDARD: Clock,
};

export function WithdrawDetailsDialog({
  open,
  onOpenChange,
  withdraw,
}: WithdrawDetailsDialogProps) {
  if (!withdraw) return null;




  const TypeIcon = typeIcons[withdraw.type] || Clock;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl! !p-0 h-[90vh] overflow-hidden flex flex-col rounded-3xl">
        <DialogHeader>
          {/* ================= Header ================= */}
          <div className="relative overflow-hidden border-b bg-gradient-to-r from-primary/5 via-background to-primary/10 px-8 py-8">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="size-20 border-4 border-background shadow-xl">
                  <AvatarImage src={withdraw.user.photo || ""} />
                  <AvatarFallback className="bg-primary text-2xl font-bold text-white">
                    {getInitials(withdraw.user.firstName, withdraw.user.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {withdraw.user.fullName}
                    </h2>
                    <Badge className={cn("px-3 py-1", statusStyles[withdraw.status] || "")}>
                      <span
                        className={cn(
                          "mr-1.5 h-2 w-2 rounded-full",
                          statusDotStyles[withdraw.status] || "bg-gray-500"
                        )}
                      />
                      {getStatusLabel(withdraw.status)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Withdraw ID: {withdraw.id}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Net Amount</p>
                <p className="text-4xl font-bold text-primary">
                  ${Number(withdraw.netAmount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-8 py-5">
            {/* ================= User & Wallet Info ================= */}
            <div className="grid gap-5 px-8 lg:grid-cols-2">
              {/* User Card */}
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Mail className="size-5 text-primary" />
                    User Details
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="size-4 text-muted-foreground" />
                      <span>{withdraw.user.email || "No Email"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-4 text-muted-foreground" />
                      <span>{withdraw.user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="size-4 text-muted-foreground" />
                      <span>Stripe Account: </span>
                      {withdraw.user.stripeAccountVerified ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <CheckCircle2 className="size-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          <XCircle className="size-3 mr-1" />
                          Not Verified
                        </Badge>
                      )}
                    </div>
                    {withdraw.user.stripeAccountId && (
                      <div className="text-xs font-mono text-muted-foreground">
                        ID: {withdraw.user.stripeAccountId}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Card */}
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Wallet className="size-5 text-primary" />
                    Wallet Details
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Balance</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${Number(withdraw.wallet.availableBalance).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Earned</p>
                        <p className="text-2xl font-bold">
                          ${Number(withdraw.wallet.totalEarned).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                        <p className="text-2xl font-bold">
                          ${Number(withdraw.wallet.totalWithdrawn).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Currency</p>
                        <p className="text-2xl font-bold uppercase">{withdraw.wallet.currency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ================= Financial Breakdown ================= */}
            <div className="grid gap-5 px-8 md:grid-cols-2 xl:grid-cols-4">
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <h3 className="mt-2 text-3xl font-bold">
                      ${Number(withdraw.amount).toFixed(2)}
                    </h3>
                    <p className="mt-2 text-xs uppercase text-muted-foreground">{withdraw.currency}</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-4">
                    <DollarSign className="size-7 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Fee</p>
                    <h3 className="mt-2 text-3xl font-bold">
                      ${Number(withdraw.platformFee).toFixed(2)}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">Revenue</p>
                  </div>
                  <div className="rounded-2xl bg-violet-500/10 p-4">
                    <TrendingDown className="size-7 text-violet-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Stripe Fee</p>
                    <h3 className="mt-2 text-3xl font-bold">
                      ${Number(withdraw.stripeFee).toFixed(2)}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">Processing</p>
                  </div>
                  <div className="rounded-2xl bg-orange-500/10 p-4">
                    <Building2 className="size-7 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Amount</p>
                    <h3 className="mt-2 text-3xl font-bold text-green-600">
                      ${Number(withdraw.netAmount).toFixed(2)}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">Final payout</p>
                  </div>
                  <div className="rounded-2xl bg-green-500/10 p-4">
                    <DollarSign className="size-7 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ================= Transaction Info ================= */}
            <div className="grid gap-6 px-8 lg:grid-cols-2">
              <Card className="p-0">
                <CardContent className="p-6">
                  <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                    <CreditCard className="size-5 text-primary" />
                    Transaction Info
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Withdraw ID</span>
                      <span className="font-mono text-sm font-medium">{withdraw.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="size-4 text-muted-foreground" />
                        <span className="font-medium">{withdraw.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={cn(statusStyles[withdraw.status] || "")}>
                        <span
                          className={cn(
                            "mr-1.5 h-2 w-2 rounded-full",
                            statusDotStyles[withdraw.status] || "bg-gray-500"
                          )}
                        />
                        {getStatusLabel(withdraw.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>{formatDate(withdraw.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Updated</span>
                      <span>{formatDate(withdraw.updatedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-0">
                <CardContent className="p-6">
                  <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                    <Building2 className="size-5 text-primary" />
                    Stripe Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Transfer ID</span>
                      <span className="font-mono text-sm font-medium">
                        {withdraw.stripeTransferId || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payout ID</span>
                      <span className="font-mono text-sm font-medium">
                        {withdraw.stripePayoutId || "N/A"}
                      </span>
                    </div>
                    {withdraw.failureReason && (
                      <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3">
                        <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-700">Failure Reason</p>
                          <p className="text-sm text-red-600">{withdraw.failureReason}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ================= Footer ================= */}
        <div className="shrink-0 border-t bg-muted/20 px-8 py-5">
          <div className="flex text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div>
                <span className="font-medium text-foreground">User:</span>{" "}
                {withdraw.user.fullName}
              </div>
              <div>
                <span className="font-medium text-foreground">Requested:</span>{" "}
                {formatDate(withdraw.createdAt)}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="font-medium text-foreground">Status:</span>{" "}
                {getStatusLabel(withdraw.status)}
              </div>
              <div>
                <span className="font-medium text-foreground">Currency:</span>{" "}
                {withdraw.currency.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}