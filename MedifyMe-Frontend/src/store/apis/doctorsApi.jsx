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
    fetchPatients: builder.query({
      query: (id) => ({
        url: "/patients",
        params: { id },
        method: "GET",
      }),
    }),
    acceptPatients: builder.mutation({
      query: (detail) => ({
        url: "/accept",
        method: "POST",
        body: detail,
      }),
    }),
  }),
});

export const {
  useDLoginMutation,
  useFetchPatientsQuery,
  useAcceptPatientsMutation,
} = doctorApi;
export { doctorApi };
