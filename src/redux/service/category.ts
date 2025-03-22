import { o2API } from "../api";

export const categoryAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all category
    getAllCategories: builder.query({
      query: () => ({
        url: `api/categories`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // delete category by uuid
    deleteCategory: builder.mutation({
      query: (uuid: string) => ({
        url: `api/categories/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // create category
    createCategory: builder.mutation({
      query: (name: any) => ({
        url: `api/categories`,
        method: "POST",
        body: name,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categoryAPI;
