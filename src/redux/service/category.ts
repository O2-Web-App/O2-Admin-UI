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

    getCategoryByUuid: builder.query<
      any,
      { uuid: string; pages: number; per_page: number }
    >({
      query: ({ uuid, pages, per_page }) => ({
        url: `api/categories/${uuid}?page=${pages}&per_page=${per_page}`,
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

    // create SubCategory
    createSubCategory: builder.mutation<
      any,
      { name: string; parent_uuid: string }
    >({
      query: ({ name, parent_uuid }) => ({
        url: `api/categories/subcategories`,
        method: "POST",
        body: { name, parent_uuid },
      }),
      invalidatesTags: ["Category"],
    }),

    // update category name
    updateCategoryNameByUuid: builder.mutation<
      any,
      { name: string; uuid: string }
    >({
      query: ({ name, uuid }) => ({
        url: `api/categories/${uuid}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useGetCategoryByUuidQuery,
  useCreateSubCategoryMutation,
  useUpdateCategoryNameByUuidMutation,
} = categoryAPI;
