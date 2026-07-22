import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * ===========================
     * User Summary
     * GET /users/summary
     * ===========================
     */
    getUserSummary: builder.query({
      query: () => ({
        url: "/users/summary",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    /**
     * ===========================
     * Get All Users
     * GET /users
     * ===========================
     */
    getAllUsers: builder.query({
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
          url: "/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["User"],
    }),

    /**
     * ===========================
     * Get Single User
     * GET /users/:id
     * ===========================
     */
    getSingleUser: builder.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    /**
     * ===========================
     * Update User Status
     * PATCH /users/:id/status
     * ===========================
     */
    updateUserStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserSummaryQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserStatusMutation,
} = userApi;
