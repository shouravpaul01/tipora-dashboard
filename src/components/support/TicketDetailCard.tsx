"use client";

import { useState } from "react";
import {
  User,
  UserCog,
  Mail,
  Phone,
  Calendar,
  Tag,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";

import {
  useUpdateSupportTicketPriorityMutation,
  useUpdateTicketStatusMutation,
} from "@/redux/api/supportApi";
import { getStatusLabel, statusStyles } from "@/constant";

interface Ticket {
  id: string;
  ticketNumber: string;
  creatorType: string;
  userId: string | null;

  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;

  subject: string;
  description: string;
  category: string;

  priority: string;
  status: string;

  createdAt: string;
  updatedAt: string;

  resolvedAt: string | null;
  closedAt: string | null;

  user?: {
    fullName: string;
    email: string;
    phone: string;
    photo: string | null;
  };

  assignedTo?: {
    fullName: string;
    photo: string | null;
  } | null;
}





export default function TicketDetailCard({
  ticket,
}: {
  ticket: Ticket;
}) {
  const requester =
    ticket.creatorType === "USER" ? ticket.user : null;

  const isGuest = ticket.creatorType === "GUEST";

  const [updatePriority, { isLoading: priorityUpdating }] =
    useUpdateSupportTicketPriorityMutation();

  const [updateStatus, { isLoading: statusUpdating }] =
    useUpdateTicketStatusMutation();

  const handlePriorityChange = async (priority: string) => {
    if (priority === ticket.priority) return;

    try {
      await updatePriority({
        ticketId: ticket.id,
        priority,
      }).unwrap();

      toast.success("Ticket priority updated successfully");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update ticket priority",
      );
    }
  };

  const handleStatusChange = async (status: string) => {
    if (status === ticket.status) return;

    try {
      await updateStatus({
        ticketId: ticket.id,
        data: {
          status,
        },
      }).unwrap();

      toast.success("Ticket status updated successfully");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update ticket status",
      );
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      {/* Header */}
      <CardHeader className="border-b bg-muted/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {ticket.ticketNumber}
              </span>

              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  statusStyles[ticket.status],
                )}
              >
                {getStatusLabel(ticket.status)}
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  statusStyles[ticket.priority],
                )}
              >
                {getStatusLabel(ticket.priority)}
              </Badge>
            </div>

            <CardTitle className="text-xl">
              {ticket.subject}
            </CardTitle>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status */}
            <Select
              value={ticket.status}
              onValueChange={handleStatusChange}
              disabled={statusUpdating}
            >
              <SelectTrigger className="w-[150px] bg-background">
                {statusUpdating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Status" />
                )}
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="OPEN">
                  Open
                </SelectItem>

                <SelectItem value="IN_PROGRESS">
                  In Progress
                </SelectItem>

                <SelectItem value="RESOLVED">
                  Resolved
                </SelectItem>

                <SelectItem value="CLOSED">
                  Closed
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Priority */}
            <Select
              value={ticket.priority}
              onValueChange={handlePriorityChange}
              disabled={priorityUpdating}
            >
              <SelectTrigger className="w-[140px] bg-background">
                {priorityUpdating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Priority" />
                )}
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="LOW">
                  Low
                </SelectItem>

                <SelectItem value="MEDIUM">
                  Medium
                </SelectItem>

                <SelectItem value="HIGH">
                  High
                </SelectItem>

                <SelectItem value="URGENT">
                  Urgent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Description */}
        <div>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Description
          </h4>

          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="whitespace-pre-wrap text-sm leading-6">
              {ticket.description}
            </p>
          </div>
        </div>

        {/* Requester + Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Requester */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Requester
            </h4>

            {isGuest ? (
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <UserCog className="size-5 text-primary" />
                </div>

                <div className="space-y-1">
                  <p className="font-medium">
                    {ticket.guestName || "Guest User"}
                  </p>

                  {ticket.guestEmail && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="size-3.5" />
                      <span>{ticket.guestEmail}</span>
                    </div>
                  )}

                  {ticket.guestPhone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-3.5" />
                      <span>{ticket.guestPhone}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : requester ? (
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border">
                  <AvatarImage
                    src={requester.photo || ""}
                    alt={requester.fullName}
                  />

                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {requester.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <p className="font-medium">
                    {requester.fullName}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-3.5" />
                    <span>{requester.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-3.5" />
                    <span>{requester.phone}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Requester information unavailable.
              </p>
            )}
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Details
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />

                <span className="text-muted-foreground">
                  Created:
                </span>

                <span>
                  {formatDate(ticket.createdAt as any)}
                </span>
              </div>

              {ticket.resolvedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-green-600" />

                  <span className="text-muted-foreground">
                    Resolved:
                  </span>

                  <span>
                    {formatDate(ticket.resolvedAt as any)}
                  </span>
                </div>
              )}

              {ticket.closedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-slate-600" />

                  <span className="text-muted-foreground">
                    Closed:
                  </span>

                  <span>
                    {formatDate(ticket.closedAt as any)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />

                <span className="text-muted-foreground">
                  Last updated:
                </span>

                <span>
                  {formatDate(ticket.updatedAt as any)}
                </span>
              </div>

              {ticket.assignedTo && (
                <div className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage
                      src={ticket.assignedTo.photo || ""}
                    />

                    <AvatarFallback className="text-[10px]">
                      {ticket.assignedTo.fullName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-muted-foreground">
                    Assigned to:
                  </span>

                  <span className="font-medium">
                    {ticket.assignedTo.fullName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}