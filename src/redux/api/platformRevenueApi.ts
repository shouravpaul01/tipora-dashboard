import { baseApi } from "@/redux/api/baseApi";

export const platformRevenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Summary
    getPlatformRevenueSummary: builder.query({
      query: () => ({
        url: "/platform-revenue/summary",
        method: "GET",
      }),
      providesTags: ["PlatformRevenue"],
    }),

    // Get all platform revenues

    getAllPlatformRevenues: builder.query({
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
          url: "/platform-revenue",
          method: "GET",
          params,
        };
      },
      providesTags: ["PlatformRevenue"],
    }),
    // Get single platform revenue
    getSinglePlatformRevenue: builder.query({
      query: (id: string) => ({
        url: `/platform-revenue/${id}`,
        method: "GET",
      }),
      providesTags: ["PlatformRevenue"],
    }),
  }),
});

export const {
  useGetPlatformRevenueSummaryQuery,
  useGetAllPlatformRevenuesQuery,
  useGetSinglePlatformRevenueQuery,
} = platformRevenueApi;
