import { baseApi } from "@/redux/api/baseApi";

export const withdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard summary
    getWithdrawSummary: builder.query({
      query: () => ({
        url: "/withdraw/summary",
        method: "GET",
      }),
      providesTags: ["Withdraw"],
    }),

    // Get all withdraw requests (supports query params)

    getAllWithdraws: builder.query({
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
          url: "/withdraw",
          method: "GET",
          params,
        };
      },
      providesTags: ["Withdraw"],
    }),
    // Get single withdraw details
    getSingleWithdraw: builder.query({
      query: (id: string) => ({
        url: `/withdraw/${id}`,
        method: "GET",
      }),
      providesTags: ["Withdraw"],
    }),
  }),
});

export const {
  useGetWithdrawSummaryQuery,
  useGetAllWithdrawsQuery,
  useGetSingleWithdrawQuery,
} = withdrawApi;
