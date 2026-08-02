"use client";

import { Eye, Zap, Clock } from "lucide-react";

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
import { getInitials, getStatusLabel, statusDotStyles, statusStyles } from "@/constant";

interface Withdraw {
  id: string;
  userId: string;
  walletId: string;
  type: string;
  amount: number;
  platformFee: number;
  stripeFee: number;
  netAmount: number;
  currency: string;
  stripeTransferId: string;
  stripePayoutId: string | null;
  status: string;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phone: string;
    photo: string | null;
  };
  wallet: {
    id: string;
    availableBalance: number;
    totalEarned: number;
    totalWithdrawn: number;
    currency: string;
  };
}

interface WithdrawTableProps {
  withdraws: Withdraw[];
  loading?: boolean;
  onViewDetails: (id: string) => void;
}



const typeStyles: Record<string, { label: string; icon: any; className: string }> = {
  INSTANT: { label: "Instant", icon: Zap, className: "text-amber-600" },
  STANDARD: { label: "Standard", icon: Clock, className: "text-slate-600" },
};

export function WithdrawTable({
  withdraws,
  loading,
  onViewDetails,
}: WithdrawTableProps) {
  

  

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[260px]">User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Fees</TableHead>
            <TableHead>Net Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {withdraws.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-32 text-center text-muted-foreground"
              >
                No withdrawals found
              </TableCell>
            </TableRow>
          )}

          {withdraws.map((withdraw) => {
            const typeInfo = typeStyles[withdraw.type] || typeStyles.STANDARD;
            const TypeIcon = typeInfo.icon;

            return (
              <TableRow
                key={withdraw.id}
                className="transition-colors hover:bg-muted/40"
              >
                {/* User */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11 border">
                      <AvatarImage src={withdraw.user.photo || ""} />
                      <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                        {getInitials(withdraw.user.firstName, withdraw.user.lastName)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h4 className="font-semibold leading-none">
                        {withdraw.user.fullName}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {withdraw.user.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell>
                  <div>
                    <p className="text-lg font-bold">
                      ${Number(withdraw.amount).toFixed(2)}
                    </p>
                    <p className="text-xs uppercase text-muted-foreground">
                      {withdraw.currency}
                    </p>
                  </div>
                </TableCell>

                {/* Fees */}
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">Platform:</span>
                      <span className="font-medium">${Number(withdraw.platformFee).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">Stripe:</span>
                      <span className="font-medium">${Number(withdraw.stripeFee).toFixed(2)}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Net Amount */}
                <TableCell>
                  <p className="text-lg font-bold text-green-600">
                    ${Number(withdraw.netAmount).toFixed(2)}
                  </p>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TypeIcon className={cn("size-4", typeInfo.className)} />
                    <span className="text-sm font-medium">{typeInfo.label}</span>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge className={cn(statusStyles[withdraw.status] || "")}>
                    <span
                      className={cn(
                        "mr-1.5 h-2 w-2 rounded-full",
                        statusDotStyles[withdraw.status] || "bg-gray-500"
                      )}
                    />
                    {getStatusLabel(withdraw.status)}
                  </Badge>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <div>
                    <p className="font-medium">{formatDate(withdraw.createdAt as any)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(withdraw.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => onViewDetails(withdraw.id)}
                  >
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}