"use client";

import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { getStatusLabel, statusStyles } from "@/constant";

interface Revenue {
  id: string;
  source: string;
  amount: number;
  currency: string;
  referenceId: string;
  referenceType: string;
  createdAt: string;
}

interface PlatformRevenueTableProps {
  revenues: Revenue[];
  loading?: boolean;
  onViewDetails: (id: string) => void;
}




export function PlatformRevenueTable({
  revenues,
  loading,
  onViewDetails,
}: PlatformRevenueTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Revenue ID</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {revenues.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No revenue records found
              </TableCell>
            </TableRow>
          )}

          {revenues.map((rev) => (
            <TableRow
              key={rev.id}
              className="transition-colors hover:bg-muted/40"
            >
              {/* ID */}
              <TableCell>
                <span className="font-mono text-sm font-medium">
                  {rev.id.slice(-8)}
                </span>
              </TableCell>

              {/* Source */}
              <TableCell>
                <Badge className={statusStyles[rev.source] || statusStyles.OTHER}>
                  {getStatusLabel(rev.source) || rev.source}
                </Badge>
              </TableCell>

              {/* Amount */}
              <TableCell>
                <div>
                  <p className="text-lg font-bold text-green-600">
                    ${Number(rev.amount).toFixed(2)}
                  </p>
                  <p className="text-xs uppercase text-muted-foreground">
                    {rev.currency}
                  </p>
                </div>
              </TableCell>

              {/* Reference */}
              <TableCell>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {rev.referenceId.slice(-8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rev.referenceType}
                  </p>
                </div>
              </TableCell>

              {/* Date */}
              <TableCell>
                <p className="font-medium">{formatDate(rev.createdAt as any)}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(rev.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => onViewDetails(rev.id)}
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