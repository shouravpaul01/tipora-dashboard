import { Notification, NotificationType } from "@/type";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  MessageCircle,
  Ticket,
  UserCheck,
  XCircle,
  Clock,
  RotateCcw,
  Send,
  BadgeDollarSign,
  LucideIcon,
  Trash2,
} from "lucide-react";

interface NotificationConfig {
  icon: LucideIcon;
  className: string;
}

export const notificationConfig: Record<
  NotificationType,
  NotificationConfig
> = {
  [NotificationType.TIP_RECEIVED]: {
    icon: CircleDollarSign,
    className: "bg-green-100 text-green-600",
  },

  [NotificationType.TIP_SENT]: {
    icon: Send,
    className: "bg-blue-100 text-blue-600",
  },

  [NotificationType.TIP_FAILED]: {
    icon: XCircle,
    className: "bg-red-100 text-red-600",
  },

  [NotificationType.PAYMENT_METHOD_ADDED]: {
    icon: CreditCard,
    className: "bg-purple-100 text-purple-600",
  },

  [NotificationType.ACCOUNT_VERIFIED]: {
    icon: UserCheck,
    className: "bg-green-100 text-green-600",
  },

  [NotificationType.WITHDRAW_REQUESTED]: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-600",
  },

  [NotificationType.WITHDRAW_COMPLETED]: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-600",
  },

  [NotificationType.WITHDRAW_FAILED]: {
    icon: XCircle,
    className: "bg-red-100 text-red-600",
  },

  [NotificationType.GENERAL]: {
    icon: Bell,
    className: "bg-gray-100 text-gray-600",
  },

  [NotificationType.PLATFORM_FEE_EARNED]: {
    icon: BadgeDollarSign,
    className: "bg-emerald-100 text-emerald-600",
  },

  [NotificationType.TICKET_CREATED]: {
    icon: Ticket,
    className: "bg-blue-100 text-blue-600",
  },

  [NotificationType.TICKET_REPLIED]: {
    icon: MessageCircle,
    className: "bg-indigo-100 text-indigo-600",
  },

  [NotificationType.TICKET_ASSIGNED]: {
    icon: Ticket,
    className: "bg-orange-100 text-orange-600",
  },

  [NotificationType.TICKET_RESOLVED]: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-600",
  },

  [NotificationType.TICKET_CLOSED]: {
    icon: CheckCircle2,
    className: "bg-gray-100 text-gray-600",
  },

  [NotificationType.TICKET_REOPENED]: {
    icon: RotateCcw,
    className: "bg-orange-100 text-orange-600",
  },
};

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onClick,
  onDelete,
}: NotificationItemProps) => {
  const config = notificationConfig[notification.type];

  const Icon = config?.icon ?? Bell;

  return (
    <div
      className={`group relative cursor-pointer px-5 py-4 transition-colors hover:bg-muted/50 ${
        !notification.isRead ? "bg-muted/30" : ""
      }`}
      onClick={() => onClick(notification)}
    >
      <div className="flex gap-3">
        {/* Notification Icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            config?.className ?? "bg-muted text-muted-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`text-sm ${
                notification.isRead
                  ? "font-medium"
                  : "font-semibold"
              }`}
            >
              {notification.title}
            </h4>

            <span className="shrink-0 text-[11px] text-muted-foreground">
              {formatDistanceToNow(
                new Date(notification.createdAt),
                {
                  addSuffix: true,
                }
              )}
            </span>
          </div>

          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {notification.body}
          </p>

          {notification?.data?.ticketNumber && (
            <span className="mt-2 inline-block text-xs font-medium text-primary">
              {notification.data.ticketNumber}
            </span>
          )}
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(notification.id);
          }}
          className="absolute right-3 bottom-3 hidden h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive group-hover:flex"
          aria-label="Delete notification"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};