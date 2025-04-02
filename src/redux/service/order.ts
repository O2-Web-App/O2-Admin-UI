import { o2API } from "../api";

export const orderAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getOrderByWeekly: builder.query<
      any,
      {
        page?: number;
        per_page?: number;
        started_date?: string;
        end_date?: string;
      }
    >({
      query: ({ page, per_page, started_date, end_date } = {}) => {
        const params = new URLSearchParams();

        if (started_date) params.append("start_date", started_date);
        if (end_date) params.append("end_date", end_date);
        if (page) params.append("page", page.toString());
        if (per_page) params.append("per_page", per_page.toString());

        return {
          url: `/api/orders/date-range?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),

    // get order detail by uuid
    getOrderDetailByUuid: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/orders/${uuid}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // update confrim status
    updateOrderStatus: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/orders/${uuid}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderByWeeklyQuery,
  useGetOrderDetailByUuidQuery,
  useUpdateOrderStatusMutation,
} = orderAPI;
