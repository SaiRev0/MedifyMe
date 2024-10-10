import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const gptApi = createApi({
  reducerPath: "gptAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/gpt`,
  }),
  endpoints: (builder) => ({
    chat: builder.mutation({
      query: (message) => ({
        url: "/",
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useChatMutation } = gptApi;
export { gptApi };
