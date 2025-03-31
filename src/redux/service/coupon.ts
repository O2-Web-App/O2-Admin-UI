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
        image: string;
      }
    >({
      query: ({
        code,
        max_usage,
        user_limit,
        discount_percentage,
        start_date,
        end_date,
        image,
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
          image,
        },
      }),
      invalidatesTags: ["Coupon"],
    }),

    // get all Coupon
    getAllCoupon: builder.query<any, { page: number; per_page: number }>({
      query: ({ page, per_page }) => ({
        url: `/api/coupons?page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),

    // update Coupon
    updateCoupon: builder.mutation<
      any,
      {
        uuid: string;
        code: string;
        discount_percentage: number;
        max_usage: number;
        user_limit: number;
        start_date: string;
        end_date: string;
      }
    >({
      query: ({
        uuid,
        code,
        discount_percentage,
        end_date,
        max_usage,
        start_date,
        user_limit,
      }) => ({
        url: `/api/coupons/${uuid}`,
        method: "PUT",
        body: {
          code,
          discount_percentage,
          end_date,
          max_usage,
          start_date,
          user_limit,
        },
      }),
      invalidatesTags: ["Coupon"],
    }),

    // update status Coupon
    updateCouponStatus: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/coupons/${uuid}/toggle-status`,
        method: "PATCH",
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
  useUpdateCouponMutation,
  useUpdateCouponStatusMutation,
} = couponAPI;
