"use client";

import { Eye, User, UserCog } from "lucide-react";

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
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  ticketNumber: string;
  creatorType: string;
  userId: string | null;
  guestName: string | null;
  guestEmail: string | null;
  subject: string;
  status: string;
  priority: string;
  category: string;
  lastMessageAt: string;
  unreadByAgent: boolean;
  user?: {
    fullName: string;
    email: string;
    photo: string | null;
  };
  _count: {
    messages: number;
  };
}

interface TicketTableProps {
  tickets: Ticket[];
  loading?: boolean;
  onViewTicket: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  OPEN: "border-blue-200 bg-blue-50 text-blue-700",
  IN_PROGRESS: "border-yellow-200 bg-yellow-50 text-yellow-700",
  RESOLVED: "border-green-200 bg-green-50 text-green-700",
  CLOSED: "border-slate-200 bg-slate-50 text-slate-700",
};

const priorityStyles: Record<string, string> = {
  LOW: "border-slate-200 bg-slate-50 text-slate-700",
  MEDIUM: "border-yellow-200 bg-yellow-50 text-yellow-700",
  HIGH: "border-orange-200 bg-orange-50 text-orange-700",
  URGENT: "border-red-200 bg-red-50 text-red-700",
};

export function TicketTable({ tickets, loading, onViewTicket }: TicketTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Ticket</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No tickets found
              </TableCell>
            </TableRow>
          )}
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} className="transition-colors hover:bg-muted/40">
              <TableCell>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold">
                      {ticket.ticketNumber}
                    </span>
                    {ticket.unreadByAgent && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium truncate max-w-[220px]">
                    {ticket.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(ticket.lastMessageAt as any)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {ticket.creatorType === "USER" && ticket.user ? (
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{ticket.user.fullName}</p>
                      <p className="text-xs text-muted-foreground">{ticket.user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserCog className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{ticket.guestName}</p>
                      <p className="text-xs text-muted-foreground">{ticket.guestEmail}</p>
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm capitalize">
                  {ticket.category.replace("_", " ").toLowerCase()}
                </span>
              </TableCell>
              <TableCell>
                <Badge className={cn(priorityStyles[ticket.priority] || "")}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn(statusStyles[ticket.status] || "")}>
                  {ticket.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">{ticket._count.messages}</span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => onViewTicket(ticket.id)}
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