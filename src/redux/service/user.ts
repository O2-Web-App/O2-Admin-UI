import { o2API } from "../api";

export const userAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getAllUser: builder.query({
      query: () => ({
        url: `api/users`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserQuery } = userAPI;
