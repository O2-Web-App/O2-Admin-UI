import { o2API } from "../api";

export const orderAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getOrderByWeekly: builder.query<
      any,
      { page: number; per_page: number; started_date: string; end_date: string }
    >({
      query: ({ page, per_page, started_date, end_date }) => ({
        url: `/api/orders/date-range?start_date=${started_date}&end_date=${end_date}?page=${page}&per_page=${per_page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrderByWeeklyQuery } = orderAPI;
