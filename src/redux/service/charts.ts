import { o2API } from "../api";

export const chartAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getChartUser: builder.query({
      query: () => ({
        url: `/api/admin/dashboard-stats`,
        method: "GET",
      }),
    }),

    // get all count
    getChartCount: builder.query({
      query: () => ({
        url: `/api/admin/statistics`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetChartUserQuery, useGetChartCountQuery } = chartAPI;
