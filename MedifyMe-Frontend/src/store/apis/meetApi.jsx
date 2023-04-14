import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const meetApi = createApi({
  reducerPath: "meetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/meet`,
  }),
  endpoints: (builder) => ({
    fetchToken: builder.query({
      query: (id) => ({
        url: "/get_token",
        params: { id },
        method: "GET",
      }),
    }),
    createMeeting: builder.mutation({
      query: (formData) => ({
        url: "/create_meeting",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useFetchTokenQuery, useCreateMeetingMutation } = meetApi;
export { meetApi };
