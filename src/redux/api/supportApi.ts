import { baseApi } from "@/redux/api/baseApi";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ─────────────────────────────────────────────
    // Create Ticket
    // ─────────────────────────────────────────────
    createTicket: builder.mutation({
      query: (formData: FormData) => ({
        url: "/support",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Support"],
    }),

    // ─────────────────────────────────────────────
    // Get My Tickets
    // ─────────────────────────────────────────────
    getMyTickets: builder.query({
      query: (params) => ({
        url: "/support/my-tickets",
        method: "GET",
        params,
      }),
      providesTags: ["Support"],
    }),

    // ─────────────────────────────────────────────
    // Get All Tickets - Admin
    // ─────────────────────────────────────────────

    getAllTickets: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, value as string);
            }
          });
        }

        return {
          url: "/support",
          method: "GET",
          params,
        };
      },
      providesTags: ["Support"],
    }),
    // ─────────────────────────────────────────────
    // Get Single Ticket
    // ─────────────────────────────────────────────
    getTicketById: builder.query({
      query: (ticketId: string) => ({
        url: `/support/${ticketId}`,
        method: "GET",
      }),
      providesTags: ["Support"],
    }),

    // ─────────────────────────────────────────────
    // Assign Ticket - Admin
    // ─────────────────────────────────────────────
    assignTicket: builder.mutation({
      query: ({ ticketId, data }: { ticketId: string; data: unknown }) => ({
        url: `/support/${ticketId}/assign`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Support"],
    }),

    // ─────────────────────────────────────────────
    // Add Message / Internal Note
    // ─────────────────────────────────────────────
    addMessage: builder.mutation({
      query: ({
        ticketId,
        formData,
      }: {
        ticketId: string;
        formData: FormData;
      }) => ({
        url: `/support/${ticketId}/messages`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Support"],
    }),

    // ─────────────────────────────────────────────
    // Update Ticket Status - Admin
    // ─────────────────────────────────────────────
    updateTicketStatus: builder.mutation({
      query: ({ ticketId, data }: { ticketId: string; data: unknown }) => ({
        url: `/support/${ticketId}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Support"],
    }),
    updateSupportTicketPriority: builder.mutation({
      query: ({ ticketId, priority }) => ({
        url: `/support/${ticketId}/priority`,
        method: "PATCH",
        body: {
          priority,
        },
      }),
      invalidatesTags: (_result, _error, { ticketId }) => [
        "Support",
        { type: "Support", id: ticketId },
      ],
    }),

    // ─────────────────────────────────────────────
    // Reopen Ticket - User
    // ─────────────────────────────────────────────
    reopenTicket: builder.mutation({
      query: (ticketId: string) => ({
        url: `/support/${ticketId}/reopen`,
        method: "PATCH",
      }),
      invalidatesTags: ["Support"],
    }),

    // ─────────────────────────────────────────────
    // Rate Ticket - User
    // ─────────────────────────────────────────────
    rateTicket: builder.mutation({
      query: ({ ticketId, data }: { ticketId: string; data: unknown }) => ({
        url: `/support/${ticketId}/rate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Support"],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
  useGetAllTicketsQuery,
  useGetTicketByIdQuery,
  useAssignTicketMutation,
  useUpdateSupportTicketPriorityMutation,
  useAddMessageMutation,
  useUpdateTicketStatusMutation,
  useReopenTicketMutation,
  useRateTicketMutation,
} = supportApi;
