import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // Verify Registration OTP
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Verify Reset OTP
    verifyResetOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Change Password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;