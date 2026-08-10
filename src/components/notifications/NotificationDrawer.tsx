"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";



import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/providers/SocketProvider";
import { Notification } from "@/type";
import { NotificationSkeleton } from "./NotificationSkeleton";
import EmptyState from "../shared/EmptyState";
import { NotificationItem } from "./NotificationItem";




export default function NotificationDrawer() {
  const router = useRouter();

  const { socket } = useSocket();

  const [open, setOpen] = useState(false);
  const [realtimeUnreadCount, setRealtimeUnreadCount] =
    useState<number | null>(null);

  // Initial unread count
  const {
    data: unreadResponse,
  } = useGetUnreadCountQuery(undefined);

  // Notification list
  const {
    data: notificationResponse,
    isLoading,
    isFetching,
  } = useGetMyNotificationsQuery(
    {
      page: 1,
      limit: 10,
      sort: "-createdAt",
    },
    {
      skip: !open,
    }
  );

  const [markAsRead] =
    useMarkAsReadMutation();

  const [markAllAsRead] =
    useMarkAllAsReadMutation();

  const [deleteNotification] =
    useDeleteNotificationMutation();

  const [deleteAllNotifications] =
    useDeleteAllNotificationsMutation();

  /**
   * Initial unread count from API
   */
  const apiUnreadCount =
    unreadResponse?.data?.unreadCount ?? 0;

  /**
   * Socket unread count has priority
   */
  const unreadCount =
    realtimeUnreadCount ?? apiUnreadCount;

  /**
   * Listen for realtime unread count
   */
  useEffect(() => {
    if (!socket) return;

    const handleUnreadCount = ({
      unreadCount,
    }: {
      unreadCount: number;
    }) => {
      setRealtimeUnreadCount(unreadCount);
    };

    socket.on(
      "notification:unread-count",
      handleUnreadCount
    );

    return () => {
      socket.off(
        "notification:unread-count",
        handleUnreadCount
      );
    };
  }, [socket]);

  /**
   * Reset realtime state when API count changes
   */
  useEffect(() => {
    if (unreadResponse?.data?.unreadCount !== undefined) {
      setRealtimeUnreadCount(
        unreadResponse.data.unreadCount
      );
    }
  }, [unreadResponse]);

  const notifications =
    notificationResponse?.data ?? [];

  const handleNotificationClick = async (
    notification: Notification
  ) => {
    /**
     * Mark as read
     */
    if (!notification.isRead) {
      await markAsRead(notification.id).unwrap();
    }

    /**
     * Navigate if route exists
     */
    // if (notification.data?.route) {
    //   setOpen(false);
    //   router.push(notification.data.route);
    // }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead(undefined).unwrap();
  };

  const handleDelete = async (
    id: string
  ) => {
    await deleteNotification(id).unwrap();
  };

  const handleDeleteAll = async () => {
    await deleteAllNotifications(undefined).unwrap();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="size-6" />

          {unreadCount > 0 && (
            <span className="absolute -right-1.5 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle>
              Notifications
              {unreadCount > 0 && (
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 ms-2">
                {unreadCount} unread
              </span>
            )}
            </SheetTitle>

            
          </div>
        </SheetHeader>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between border-b px-5 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteAll}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1">
          {isLoading || isFetching ? (
            <NotificationSkeleton />
          ) : notifications.length === 0 ? (
             <EmptyState
      icon={<Bell className="h-6 w-6" />}
      title="No notifications"
      description="You're all caught up. You don't have any new notifications."
    />
          ) : (
            <div className="divide-y">
              {notifications.map(
                (notification:Notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={
                      handleNotificationClick
                    }
                    onDelete={handleDelete}
                  />
                )
              )}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}