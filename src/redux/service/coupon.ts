import { o2API } from "../api";

export const couponAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // create Coupon
    createCoupon: builder.mutation<
      any,
      {
        code: string;
        discount_percentage: number;
        max_usage: number;
        user_limit: number;
        start_date: string;
        end_date: string;
      }
    >({
      query: ({
        code,
        max_usage,
        user_limit,
        discount_percentage,
        start_date,
        end_date,
      }) => ({
        url: `/api/coupons`,
        method: "POST",
        body: {
          code,
          max_usage,
          user_limit,
          discount_percentage,
          start_date,
          end_date,
        },
      }),
      invalidatesTags: ["Coupon"],
    }),

    // get all Coupon
    getAllCoupon: builder.query<any, { pages: number; per_page: number }>({
      query: ({ pages, per_page }) => ({
        url: `/api/coupons?page=${pages}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),

    // update Coupon name
    updateCouponName: builder.mutation<any, { uuid: string; name: string }>({
      query: ({ uuid, name }) => ({
        url: `/api/coupons/${uuid}`,
        method: "PUT",
        body: {
          name,
        },
      }),
      invalidatesTags: ["Coupon"],
    }),

    // delete Coupon
    deleteCoupon: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/coupons/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponQuery,
  useDeleteCouponMutation,
  useUpdateCouponNameMutation,
} = couponAPI;
