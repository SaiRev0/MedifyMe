import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const doctorApi = createApi({
  reducerPath: "doctorAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/doctors`,
  }),
  endpoints: (builder) => ({
    dLogin: builder.mutation({
      query: (detail) => ({
        url: "/login",
        method: "POST",
        body: detail,
      }),
    }),
    dFetchHealthHistory: builder.query({
      query: (id) => ({
        url: "/health_history",
        params: { id },
        method: "GET",
      }),
    }),
    dFetchVisits: builder.query({
      query: (id) => ({
        url: "/visits",
        params: { id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDLoginMutation,
  useDFetchHealthHistoryQuery,
  useDFetchVisitsQuery,
} = doctorApi;
export { doctorApi };
