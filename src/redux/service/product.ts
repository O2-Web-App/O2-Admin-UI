import { o2API } from "../api";

export const productAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getAllProduct: builder.query({
      query: () => ({
        url: `/api/products`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductQuery } = productAPI;
