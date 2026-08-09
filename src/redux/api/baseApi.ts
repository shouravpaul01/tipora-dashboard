import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import { logout, updateAccessToken } from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error?.status === 401) {
  //   const refreshResult: any = await baseQuery(
  //     {
  //       url: "/auth/refresh-token",
  //       method: "POST",
  //     },
  //     api,
  //     extraOptions,
  //   );

  //   if (refreshResult.data?.success) {
  //     api.dispatch(
  //       updateAccessToken({
  //         accessToken: refreshResult.data.data.accessToken,
  //       }),
  //     );

  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     await baseQuery(
  //       {
  //         url: "/auth/logout",
  //         method: "POST",
  //       },
  //       api,
  //       extraOptions,
  //     );

  //     api.dispatch(logout());

  //     if (typeof window !== "undefined") {
  //       window.location.href = "/login";
  //     }
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["User", "Tip", "Dashboard","Withdraw","PlatformRevenue","Support","Notifications","UnreadNotificationCount"],

  endpoints: () => ({}),
});
