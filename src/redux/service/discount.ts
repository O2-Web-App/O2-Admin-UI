import { o2API } from "../api";

export const discountAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // create discount
    createDiscount: builder.mutation<
      any,
      {
        name: string;
        description: string;
        discount_percentage: number;
        start_date: string;
        end_date: string;
        image: string;
      }
    >({
      query: ({
        name,
        description,
        discount_percentage,
        start_date,
        end_date,
        image,
      }) => ({
        url: `/api/discounts`,
        method: "POST",
        body: {
          name,
          description,
          discount_percentage,
          start_date,
          end_date,
          image,
        },
      }),
      invalidatesTags: ["Discount"],
    }),

    // get all discount
    getAllDiscount: builder.query<any, { pages: number; per_page: number }>({
      query: ({ pages, per_page }) => ({
        url: `/api/discounts?page=${pages}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Discount"],
    }),

    // update discount name
    updateDiscountName: builder.mutation<
      any,
      {
        uuid: string;
        name: string;
        description: string;
        discount_percentage: number;
        start_date: string;
        end_date: string;
        image: string;
      }
    >({
      query: ({
        uuid,
        name,
        description,
        discount_percentage,
        end_date,
        start_date,
        image,
      }) => ({
        url: `/api/discounts/${uuid}`,
        method: "PUT",
        body: {
          name,
          description,
          discount_percentage,
          start_date,
          end_date,
          image,
        },
      }),
      invalidatesTags: ["Discount"],
    }),

    // delete discount
    deleteDiscount: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/discounts/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Discount"],
    }),
  }),
});

export const {
  useCreateDiscountMutation,
  useGetAllDiscountQuery,
  useDeleteDiscountMutation,
  useUpdateDiscountNameMutation,
} = discountAPI;
