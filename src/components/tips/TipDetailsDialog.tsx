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
  CreditCard,
  Users,
  ArrowRight,
  Building2,
  AlertCircle,
} from "lucide-react";

import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";

interface TipDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tip: any | null;
}

const statusStyles: Record<string, string> = {
  COMPLETED:
    "border border-emerald-200 bg-emerald-50 text-emerald-700",
  PENDING:
    "border border-yellow-200 bg-yellow-50 text-yellow-700",
  FAILED:
    "border border-red-200 bg-red-50 text-red-700",
  REFUNDED:
    "border border-slate-200 bg-slate-50 text-slate-700",
};

const statusDotStyles: Record<string, string> = {
  COMPLETED: "bg-emerald-500",
  PENDING: "bg-yellow-500",
  FAILED: "bg-red-500",
  REFUNDED: "bg-slate-500",
};

export function TipDetailsDialog({
  open,
  onOpenChange,
  tip,
}: TipDetailsDialogProps) {
  if (!tip) return null;

  const getInitials = (firstName?: string, lastName?: string) =>
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      COMPLETED: "Completed",
      PENDING: "Pending",
      FAILED: "Failed",
      REFUNDED: "Refunded",
    };
    return labels[status] || status;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl! !p-0 h-[90vh] overflow-hidden flex flex-col rounded-3xl">
        <DialogHeader>
          {/* ================= Header ================= */}
          <div className="relative overflow-hidden border-b bg-gradient-to-r from-primary/5 via-background to-primary/10 px-8 py-8">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  {/* Sender Avatar */}
                  <div className="flex items-center gap-3">
                    <Avatar className="size-20 border-4 border-background shadow-xl">
                      <AvatarImage src={tip.sender.photo || ""} />
                      <AvatarFallback className="bg-primary text-2xl font-bold text-white">
                        {getInitials(tip.sender.firstName, tip.sender.lastName)}
                      </AvatarFallback>
                    </Avatar>

                    <ArrowRight className="size-6 text-muted-foreground" />

                    {/* Recipients Avatars */}
                    <div className="flex -space-x-3">
                      {tip.recipients.slice(0, 3).map((recipient: any) => (
                        <Avatar
                          key={recipient.id}
                          className="size-16 border-4 border-background shadow-xl"
                        >
                          <AvatarImage
                            src={recipient.receiver.photo || ""}
                          />
                          <AvatarFallback className="bg-muted text-lg font-bold">
                            {getInitials(
                              recipient.receiver.firstName,
                              recipient.receiver.lastName
                            )}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {tip.recipients.length > 3 && (
                        <div className="flex size-16 items-center justify-center rounded-full border-4 border-background bg-muted shadow-xl">
                          <span className="text-sm font-bold text-muted-foreground">
                            +{tip.recipients.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Tip Details
                    </h2>
                    <Badge className={cn("px-3 py-1", statusStyles[tip.status] || "")}>
                      <span
                        className={cn(
                          "mr-1.5 h-2 w-2 rounded-full",
                          statusDotStyles[tip.status] || "bg-gray-500"
                        )}
                      />
                      {getStatusLabel(tip.status)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Transaction ID:         {tip.transaction.stripePaymentIntentId || "N/A"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-4xl font-bold text-primary">
                  ${Number(tip.totalAmount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-8 py-5">
            {/* ================= Sender & Recipients Cards ================= */}
            <div className="grid gap-5 px-8 lg:grid-cols-2">
              {/* Sender Card */}
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Users className="size-5 text-primary" />
                    Sender
                  </h3>

                  <div className="flex items-center gap-4">
                    <Avatar className="size-16 border">
                      <AvatarImage src={tip.sender.photo || ""} />
                      <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                        {getInitials(tip.sender.firstName, tip.sender.lastName)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">
                        {tip.sender.fullName}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4" />
                        <span>{tip.sender.email || "No Email"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="size-4" />
                        <span>{tip.sender.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recipients Card */}
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Users className="size-5 text-primary" />
                    Recipients ({tip.recipients.length})
                  </h3>

                  <div className="space-y-4">
                    {tip.recipients.map((recipient: any) => (
                      <div
                        key={recipient.id}
                        className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border">
                            <AvatarImage
                              src={recipient.receiver.photo || ""}
                            />
                            <AvatarFallback className="bg-muted text-sm">
                              {getInitials(
                                recipient.receiver.firstName,
                                recipient.receiver.lastName
                              )}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">
                              {recipient.receiver.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {recipient.receiver.email || recipient.receiver.phone}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ${Number(recipient.amount).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Net: ${Number(recipient.netAmount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ================= Financial Details ================= */}
            <div className="grid gap-5 px-8 md:grid-cols-2 xl:grid-cols-4">
              <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <h3 className="mt-2 text-3xl font-bold">
                      ${Number(tip.totalAmount).toFixed(2)}
                    </h3>
                    <p className="mt-2 text-xs uppercase text-muted-foreground">
                      {tip.currency}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-4">
                    <DollarSign className="size-7 text-primary" />
                  </div>
                </CardContent>
              </Card>

              {tip.transaction && (
                <>
                  <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Stripe Fee</p>
                        <h3 className="mt-2 text-3xl font-bold">
                          ${Number(tip.transaction.stripeFee).toFixed(2)}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Processing fee
                        </p>
                      </div>
                      <div className="rounded-2xl bg-red-500/10 p-4">
                        <CreditCard className="size-7 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Net Amount</p>
                        <h3 className="mt-2 text-3xl font-bold">
                          ${Number(tip.transaction.netAmount).toFixed(2)}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          After fees
                        </p>
                      </div>
                      <div className="rounded-2xl bg-green-500/10 p-4">
                        <DollarSign className="size-7 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg p-0">
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Payment Method
                        </p>
                        <h3 className="mt-2 text-3xl font-bold">
                          {tip.transaction.paymentMethodId ? "Stripe" : "N/A"}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {tip.transaction.stripePaymentIntentId
                            ? `PI: ${tip.transaction.stripePaymentIntentId.slice(-8)}`
                            : "No payment intent"}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-blue-500/10 p-4">
                        <Building2 className="size-7 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* ================= Transaction Details ================= */}
            {tip.transaction && (
              <div className="grid gap-6 px-8 lg:grid-cols-2">
                <Card className="p-0">
                  <CardContent className="p-6">
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                      <CreditCard className="size-5 text-primary" />
                      Transaction Info
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-mono text-sm font-medium">
                                  {tip.transaction.stripePaymentIntentId || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge className={cn(statusStyles[tip.transaction.status] || "")}>
                          <span
                            className={cn(
                              "mr-1.5 h-2 w-2 rounded-full",
                              statusDotStyles[tip.transaction.status] || "bg-gray-500"
                            )}
                          />
                          {getStatusLabel(tip.transaction.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-semibold">
                          ${Number(tip.transaction.amount).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Currency</span>
                        <span className="uppercase">{tip.transaction.currency}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span>{formatDate(tip.transaction.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-0">
                  <CardContent className="p-6">
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                      <Building2 className="size-5 text-primary" />
                      Payment Details
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Stripe Payment Intent
                        </span>
                        <span className="font-mono text-sm font-medium">
                          {tip.transaction.stripePaymentIntentId || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Stripe Charge ID
                        </span>
                        <span className="font-mono text-sm font-medium">
                          {tip.transaction.stripeChargeId || "N/A"}
                        </span>
                      </div>

                      {/* <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Apple Pay
                        </span>
                        <span>
                          {tip.transaction.applePayTransactionId ? (
                            <CheckCircle2 className="size-4 text-green-500" />
                          ) : (
                            <XCircle className="size-4 text-muted-foreground" />
                          )}
                        </span>
                      </div> */}

                      {tip.transaction.refundedAt && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Refunded At</span>
                          <span className="text-red-600">
                            {formatDate(tip.transaction.refundedAt)}
                          </span>
                        </div>
                      )}

                      {tip.transaction.failureReason && (
                        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3">
                          <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-700">
                              Failure Reason
                            </p>
                            <p className="text-sm text-red-600">
                              {tip.transaction.failureReason}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ================= Message ================= */}
            {tip.message && (
              <div className="px-8">
                <Card className="p-0">
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">Message</h3>
                    <p className="text-muted-foreground">{tip.message}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* ================= Footer ================= */}
        <div className="shrink-0 border-t bg-muted/20 px-8 py-5">
          <div className="flex text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              {/* <div>
                <span className="font-medium text-foreground">Tip ID:</span>{" "}
                {tip.id}
              </div> */}
              <div>
                <span className="font-medium text-foreground">Tips Date:</span>{" "}
                {formatDate(tip.createdAt)}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="font-medium text-foreground">Status:</span>{" "}
                {getStatusLabel(tip.status)}
              </div>
              <div>
                <span className="font-medium text-foreground">Currency:</span>{" "}
                {tip.currency.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}