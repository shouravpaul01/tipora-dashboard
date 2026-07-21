"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface DashboardRecentUsersProps {
  users: {
    id: string;
    fullName: string;
    email: string;
    photo: string | null;
    status: string;
    totalEarned: number;
    availableBalance: number;
    lastLoginAt: Date | null;
    createdAt: Date;
  }[];
}

export function DashboardRecentUsers({
  users,
}: DashboardRecentUsersProps) {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    const first = parts[0]?.charAt(0) ?? "";
    const last = parts[parts.length - 1]?.charAt(0) ?? "";
    return (first + last).toUpperCase();
  };

  return (
    <Card className=" shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Users</CardTitle>
        <Link href="/users">
          <Button   className="gap-2">
            View All
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead>User</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No recent users
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <TableRow key={user.id} className="transition-colors hover:bg-muted/40">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border">
                      <AvatarImage src={user.photo || ""} />
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold leading-none">
                        {user.fullName}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.email || "No email"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-green-600">
                      ${Number(user.availableBalance).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Earned: ${Number(user.totalEarned).toFixed(2)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "ACTIVE"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-red-200 bg-red-50 text-red-700"
                    }
                  >
                    <span
                      className={`mr-1.5 h-2 w-2 rounded-full ${
                        user.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.lastLoginAt
                        ? `Last login ${formatDate(user.lastLoginAt)}`
                        : "Never logged in"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}