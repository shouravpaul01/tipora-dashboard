import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import {
  logout,
  updateAccessToken,
} from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not set");
}

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

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult: any = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: {
          refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.success) {
      const accessToken = refreshResult.data.data.accessToken;

      api.dispatch(
        updateAccessToken({
          accessToken,
        })
      );

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "User",
   
  ],

  endpoints: () => ({}),
});