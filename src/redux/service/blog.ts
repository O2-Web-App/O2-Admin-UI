import { o2API } from "../api";

export const blogAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all blog
    getAllBlog: builder.query<any, { page: number; per_page: number }>({
      query: ({ page, per_page }) => ({
        url: `/api/blogs/getBlogs?page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    // get top 10 blog
    getTop10Blog: builder.query({
      query: () => ({
        url: `/api/blogs/topTen`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    // disable blog
    disableBlog: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/blogs/toggle-block/${uuid}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blog"],
    }),

    // confirmAward
    confirmBlogAward: builder.mutation<
      any,
      { uuid: string; award_type: string; award_rank: string }
    >({
      query: ({ uuid, award_rank, award_type }) => ({
        url: `/api/blogs/${uuid}/award`,
        method: "POST",
        body: { award_rank, award_type },
      }),
      invalidatesTags: ["Blog"],
    }),

    // public blog
    publicBlog: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/blogs/${uuid}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetTop10BlogQuery,
  useDisableBlogMutation,
  useConfirmBlogAwardMutation,
  usePublicBlogMutation,
} = blogAPI;
