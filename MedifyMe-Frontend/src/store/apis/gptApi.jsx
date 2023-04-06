import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_SERVER_URL;

const gptApi = createApi({
  reducerPath: "gptAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:6969/gpt`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (token) => ({
        url: "/data",
        method: "POST",
        body: { googleAccessToken: token },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = patientApi;
export { patientApi };
