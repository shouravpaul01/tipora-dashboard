"use client";

import { format } from "date-fns";
import { Eye, Users, ArrowRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";

interface Tip {
  id: string;
  senderId: string;
  totalAmount: number;
  currency: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phone: string;
    photo: string | null;
  };
  recipients: {
    id: string;
    receiverId: string;
    amount: number;
    netAmount: number;
    status: string;
    receiver: {
      id: string;
      firstName: string;
      lastName: string;
      fullName: string;
      email: string | null;
      phone: string;
      photo: string | null;
    };
  }[];
  transaction?: {
    id: string;
    paymentMethodId: string;
    amount: number;
    stripeFee: number;
    netAmount: number;
    currency: string;
    status: string;
    createdAt: string;
  };
}

interface TipTableProps {
  tips: Tip[];
  loading?: boolean;
  onViewDetails: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  COMPLETED:
    "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",
  PENDING:
    "border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400",
  FAILED:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
  REFUNDED:
    "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-900 dark:bg-slate-950 dark:text-slate-400",
};

const statusDotStyles: Record<string, string> = {
  COMPLETED: "bg-emerald-500",
  PENDING: "bg-yellow-500",
  FAILED: "bg-red-500",
  REFUNDED: "bg-slate-500",
};

export function TipTable({
  tips,
  loading,
  onViewDetails,
}: TipTableProps) {
  const initials = (firstName?: string, lastName?: string) =>
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
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[260px]">Sender</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tips.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No tips found
              </TableCell>
            </TableRow>
          )}

          {tips.map((tip) => (
            <TableRow
              key={tip.id}
              className="transition-colors hover:bg-muted/40"
            >
              {/* Sender */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 border">
                    <AvatarImage src={tip.sender.photo || ""} />
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                      {initials(tip.sender.firstName, tip.sender.lastName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h4 className="font-semibold leading-none">
                      {tip.sender.fullName}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {tip.sender.phone}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Recipients */}
              <TableCell>
                <div className="space-y-2">
                  {tip.recipients.length === 0 ? (
                    <span className="text-sm text-muted-foreground">
                      No recipients
                    </span>
                  ) : (
                    tip.recipients.slice(0, 2).map((recipient) => (
                      <div
                        key={recipient.id}
                        className="flex items-center gap-2"
                      >
                        <Avatar className="size-7 border">
                          <AvatarImage
                            src={recipient.receiver.photo || ""}
                          />
                          <AvatarFallback className="bg-muted text-xs">
                            {initials(
                              recipient.receiver.firstName,
                              recipient.receiver.lastName
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {recipient.receiver.fullName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${Number(recipient.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {tip.recipients.length > 2 && (
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-muted">
                        <Users className="size-3.5 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +{tip.recipients.length - 2} more
                      </p>
                    </div>
                  )}
                </div>
              </TableCell>

              {/* Amount */}
              <TableCell>
                <div className="space-y-1">
                  <p className="text-lg font-bold">
                    ${Number(tip.totalAmount).toFixed(2)}
                  </p>
                  <p className="text-xs uppercase text-muted-foreground">
                    {tip.currency}
                  </p>
                </div>
              </TableCell>

              {/* Transaction */}
              <TableCell>
                {tip.transaction ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      ${Number(tip.transaction.netAmount).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fee: ${Number(tip.transaction.stripeFee).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {tip.transaction.id.slice(-8)}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No transaction
                  </span>
                )}
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge className={cn(statusStyles[tip.status] || "")}>
                  <span
                    className={cn(
                      "mr-1.5 h-2 w-2 rounded-full",
                      statusDotStyles[tip.status] || "bg-gray-500"
                    )}
                  />
                  {getStatusLabel(tip.status)}
                </Badge>
              </TableCell>

              {/* Date */}
              <TableCell>
                <div>
                  <p className="font-medium">{formatDate(tip?.createdAt)}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(tip.createdAt, "hh:mm a")}
                  </p>
                </div>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => onViewDetails(tip.id)}
                >
                  <Eye className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}