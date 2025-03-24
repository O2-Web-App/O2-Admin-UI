import { get } from "http";
import { o2API } from "../api";

export const userAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getAllUser: builder.query<any, { pages: number; per_page: number }>({
      query: ({ pages, per_page }) => ({
        url: `api/users?page=${pages}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // get user by uuid
    getUserByUuid: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/users/${uuid}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // block and unblock user by uuid
    createBlockUserByUuid: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/users/block/${uuid}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    // get curret user
    getCurrentUser: builder.query({
      query: () => ({
        url: `api/users/current-user`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserByUuidQuery,
  useCreateBlockUserByUuidMutation,
  useGetCurrentUserQuery,
} = userAPI;
