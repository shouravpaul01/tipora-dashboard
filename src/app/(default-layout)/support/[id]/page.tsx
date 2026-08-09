"use client";

import { useParams } from "next/navigation";
import { useGetTicketByIdQuery } from "@/redux/api/supportApi";
import SkeletonLoading from "@/components/shared/SkeletonLoading";
import TicketDetailCard from "@/components/support/TicketDetailCard";
import TicketMessages from "@/components/support/TicketMessages";
import AddMessageForm from "@/components/support/AddMessageForm";


export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: ticketRes, isLoading } = useGetTicketByIdQuery(id);

  if (isLoading) return <SkeletonLoading />;

  const ticket = ticketRes?.data;

  if (!ticket) {
    return <div className="text-center py-20">Ticket not found.</div>;
  }

  return (
    <div className="space-y-6">
      <TicketDetailCard ticket={ticket} />
       <TicketMessages
        messages={ticket.messages || []}
        ticketId={id}
      />
    </div>
  );
}