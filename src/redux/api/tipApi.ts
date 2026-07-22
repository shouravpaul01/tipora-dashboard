import { baseApi } from "./baseApi";

export const tipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Admin
     */

    // Tip Summary
    getTipSummary: builder.query({
      query: () => ({
        url: "/tips/summary",
        method: "GET",
      }),
      providesTags: ["Tip"],
    }),
    // All Tips
    getAllTips: builder.query({
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
          url: "/tips",
          method: "GET",
          params,
        };
      },
      providesTags: ["Tip"],
    }),

    // Single Tip
    getSingleTip: builder.query({
      query: (id: string) => ({
        url: `/tips/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Tip", id }],
    }),
  }),
});

export const {
  useGetTipSummaryQuery,
  useGetAllTipsQuery,
  useGetSingleTipQuery,
} = tipApi;
