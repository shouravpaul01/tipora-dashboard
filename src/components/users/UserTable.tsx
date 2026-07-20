"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Eye, Mail, Phone, CheckCircle2, XCircle, Loader2 } from "lucide-react";

import { User } from "@/type";

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
import { Switch } from "@/components/ui/switch";
import { formatDate } from "@/utils/formatDate";

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onStatusChange: (
    userId: string,
    status: "ACTIVE" | "BLOCKED"
  ) => void;

  onViewDetails: (id: string) => void;
}

export function UserTable({
  users,
  onStatusChange,
  onViewDetails,
}: UserTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const initials = (firstName?: string, lastName?: string) =>
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();



  const handleStatus = async (user: User) => {
    const status = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    setLoadingId(user.id);

    try {
      await onStatusChange(user.id, status);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[260px]">User</TableHead>

            <TableHead>Contact</TableHead>

            <TableHead>Wallet</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Joined</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          )}

          {users.map((user) => (
            <TableRow
              key={user.id}
              className="transition-colors hover:bg-muted/40"
            >
              {/* User */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 border">
                    <AvatarImage src={user.photo || ""} />

                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                      {initials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h4 className="font-semibold leading-none">
                      {user.fullName}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      ID: {user.id.slice(-8)}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Contact */}
              <TableCell>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />

                    <span>{user.email || "No Email"}</span>

                    {user.isEmailVerified ? (
                      <CheckCircle2 className="size-4 text-green-500" />
                    ) : (
                      <XCircle className="size-4 text-red-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-muted-foreground" />

                    <span>{user.phone}</span>

                    {user.isPhoneVerified ? (
                      <CheckCircle2 className="size-4 text-green-500" />
                    ) : (
                      <XCircle className="size-4 text-red-500" />
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Wallet */}
              <TableCell>
                {user.wallet ? (
                  <div className="space-y-1">
                    <p className="font-semibold">
                      ${Number(user.wallet.availableBalance).toFixed(2)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Earned ${Number(user.wallet.totalEarned).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No wallet
                  </span>
                )}
              </TableCell>

              {/* Status */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={user.status === "ACTIVE"}
                    disabled={loadingId === user.id}
                    onCheckedChange={() => handleStatus(user)}
                  />

                  {loadingId === user.id ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : (
                    <Badge
                      className={
                        user.status === "ACTIVE"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
                          : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                      }
                    >
                      <span
                        className={`mr-1.5 h-2 w-2 rounded-full ${
                          user.status === "ACTIVE"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />
                      {user.status === "ACTIVE" ? "Active" : "Blocked"}
                    </Badge>
                  )}
                </div>
              </TableCell>

              {/* Joined */}
              <TableCell>
                <div>
                  <p className="font-medium">{formatDate(user?.createdAt)}</p>

                  <p className="text-xs text-muted-foreground">
                    {user.auth?.lastLoginAt
                      ? `Last Login ${formatDate(user.auth.lastLoginAt)}`
                      : "Never logged in"}
                  </p>
                </div>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <Button
  variant="outline"
  size="sm"
  onClick={() => onViewDetails(user.id)}
>
  <Eye className="mr-2 size-4" />

</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
