"use client";

import { useState } from "react";
import {
  Paperclip,
  Reply,
  FileText,
  Clock3,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";



import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";

import AddMessageForm from "./AddMessageForm";
import EmptyState from "../shared/EmptyState";

interface Message {
  id: string;
  message: string;
  isInternalNote: boolean;
  createdAt: string;
  attachments: string[];

  sender: {
    fullName: string;
    photo: string | null;
    role: string;
  };
}

interface TicketMessagesProps {
  messages: Message[];
  ticketId: string;
}

export default function TicketMessages({
  messages,
  ticketId,
}: TicketMessagesProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden shadow-sm">
        {/* Header */}
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="size-5 text-primary" />
              </div>

              <div>
                <CardTitle className="text-lg">Conversation</CardTitle>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  {messages.length}{" "}
                  {messages.length === 1 ? "message" : "messages"}
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="gap-2"
              onClick={() => setDialogOpen(true)}
            >
              <Reply className="size-4" />
              Reply
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="p-6">
          {messages.length === 0 ? (
            <EmptyState
              icon={<MessageSquare className="size-10 text-muted-foreground" />}
              title="No Messages Yet"
              description="There are no messages in this conversation yet. Start the conversation by sending a reply to the requester."
              action={
                <Button
                  size={"lg"}
                  className="gap-2"
                  onClick={() => setDialogOpen(true)}
                >
                  {" "}
                  <Reply className="size-4" /> Send First Reply{" "}
                </Button>
              }
            />
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => {
                const isInternal = msg.isInternalNote;

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "relative flex gap-4",
                      index !== messages.length - 1 &&
                        "after:absolute after:left-5 after:top-12 after:h-[calc(100%+24px)] after:w-px after:bg-border",
                    )}
                  >
                    {/* Avatar */}
                    <div className="relative z-10 shrink-0">
                      <Avatar className="size-10 border-2 border-background shadow-sm z-40">
                        <AvatarImage
                          src={msg.sender.photo || ""}
                          alt={msg.sender.fullName}
                        />

                        <AvatarFallback
                          className={cn(
                            "font-semibold",
                            isInternal
                              ? "bg-amber-100 text-amber-700"
                              : "bg-primary/10 text-primary",
                          )}
                        >
                          {msg.sender.fullName?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Message */}
                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          "rounded-xl border p-4 ",
                          isInternal
                            ? "border-amber-200 bg-amber-50/70"
                            : "bg-gray-50",
                        )}
                      >
                        {/* Sender Header */}
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {msg.sender.fullName}
                            </span>

                            <Badge variant="secondary" className="text-[12px] border! border-gray-300" >
                              {msg.sender.role}
                            </Badge>

                            {isInternal && (
                              <Badge
                                variant="outline"
                                className="border-amber-300 bg-amber-100 text-amber-700"
                              >
                                Internal Note
                              </Badge>
                            )}
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock3 className="size-3.5" />

                            <span>{formatDate(msg.createdAt as any)}</span>
                          </div>
                        </div>

                        {/* Message Body */}
                        <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                          {msg.message}
                        </p>

                        {/* Attachments */}
                        {msg.attachments?.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                              <Paperclip className="size-3.5" />
                              Attachments ({msg.attachments.length})
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2">
                              {msg.attachments.map((url, idx) => (
                                <a
                                  key={url || idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-muted/50"
                                >
                                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                                    <FileText className="size-4 text-primary" />
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-medium group-hover:text-primary">
                                      Attachment {idx + 1}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                      Click to view
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AddMessageForm
        ticketId={ticketId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
}
