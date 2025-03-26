import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryReturnValue,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setAccessToken } from "./features/auth/authSlice";

// ✅ Fetch Base Query with Authorization Header
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_O2_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // const token = localStorage.getItem("accessToken");
    // if we have a token, let's set the authorization header
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ✅ Re-authentication logic to refresh expired token
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  // check result of each query. if it's a 401, we'll try to re-authenticate
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "refresh",
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      api.dispatch(setAccessToken(data.accessToken));
      // re-run the query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
    }
  }
  return result;
};

// ✅ Create the API service with Redux Toolkit's `createApi`
export const o2API = createApi({
  tagTypes: [
    "Users",
    "Products",
    "Category",
    "Discount",
    "Coupon",
    "userProfile",
    "Blog",
  ],
  reducerPath: "o2API",
  baseQuery: baseQueryWithReAuth, // ✅ Use the custom base query with re-authentication
  endpoints: () => ({}),
});
