"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Link2,
  Calendar,
  Hash,
  Tag,
} from "lucide-react";

import { formatDate } from "@/utils/formatDate";
import { getStatusLabel, statusStyles } from "@/constant";

interface PlatformRevenueDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revenue: any | null;
}



export function PlatformRevenueDetailsDialog({
  open,
  onOpenChange,
  revenue,
}: PlatformRevenueDetailsDialogProps) {
  if (!revenue) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl! !p-0 overflow-hidden rounded-3xl">
        <DialogHeader>
          <div className="relative overflow-hidden border-b bg-gradient-to-r from-primary/5 via-background to-primary/10 px-8 py-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={statusStyles[revenue.source] || statusStyles.OTHER}>
                  {getStatusLabel(revenue.source) || revenue.source}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Revenue Details
              </DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Transaction ID: {revenue.id}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-5xl font-bold text-green-600">
                ${Number(revenue.amount).toFixed(2)}
              </p>
              <p className="text-sm uppercase text-muted-foreground mt-1">
                {revenue.currency}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-0">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <DollarSign className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="font-semibold">
                    {getStatusLabel(revenue.source) || revenue.source}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Hash className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reference ID</p>
                  <p className="font-mono text-sm font-medium">
                    {revenue.referenceId}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Tag className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reference Type</p>
                  <p className="font-semibold">{revenue.referenceType}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Calendar className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created At</p>
                  <p className="font-semibold">{formatDate(revenue.createdAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="shrink-0 border-t bg-muted/20 px-8 py-5">
          <div className="flex text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-medium text-foreground">ID:</span>{" "}
              {revenue.id}
            </div>
            <div>
              <span className="font-medium text-foreground">Source:</span>{" "}
              {getStatusLabel(revenue.source) || revenue.source}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}