import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Dashboard Overview (All Data)
     */
    getDashboardOverview: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    /**
     * Dashboard Cards
     */
    getDashboardCards: builder.query({
      query: () => ({
        url: "/dashboard/cards",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    /**
     * Revenue Charts
     */
    getRevenueCharts: builder.query({
      query: (params) => ({
        url: "/dashboard/revenue-charts",
        method: "GET",
        params,
      }),
      providesTags: ["Dashboard"],
    }),

    /**
     * Growth Charts
     */
    getGrowthCharts: builder.query({
      query: (params) => ({
        url: "/dashboard/growth-charts",
        method: "GET",
        params,
      }),
      providesTags: ["Dashboard"],
    }),

    /**
     * Comparison
     */
    getDashboardComparison: builder.query({
      query: () => ({
        url: "/dashboard/comparison",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    /**
     * Recent Users
     */
    getRecentUsers: builder.query({
      query: (limit = 10) => ({
        url: "/dashboard/recent-users",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetDashboardCardsQuery,
  useGetRevenueChartsQuery,
  useGetGrowthChartsQuery,
  useGetDashboardComparisonQuery,
  useGetRecentUsersQuery,
} = dashboardApi;