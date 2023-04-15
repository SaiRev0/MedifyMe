import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const patientApi = createApi({
  reducerPath: "patientAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/patients`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (detail) => ({
        url: "/login",
        method: "POST",
        body: detail,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: { data },
      }),
    }),
    fetchHealthHistory: builder.query({
      query: (id) => ({
        url: "/health_history",
        params: { id },
        method: "GET",
      }),
    }),
    fetchPrescription: builder.query({
      query: (id) => ({
        url: "/prescription",
        params: { id },
        method: "GET",
      }),
    }),
    fetchTests: builder.query({
      query: (id) => ({
        url: "/tests",
        params: { id },
        method: "GET",
      }),
    }),
    fetchVisits: builder.query({
      query: (id) => ({
        url: "/visits",
        params: { id },
        method: "GET",
      }),
    }),
    healthForm: builder.mutation({
      query: (formData) => ({
        url: "/health_history",
        method: "POST",
        body: formData,
      }),
    }),
    testForm: builder.mutation({
      query: (formData) => ({
        url: "/tests",
        method: "POST",
        body: formData,
      }),
    }),
    prescriptionForm: builder.mutation({
      query: (formData) => ({
        url: "/prescription",
        method: "POST",
        body: formData,
      }),
    }),
    requestDoctor: builder.mutation({
      query: (formData) => ({
        url: "/request_doctor",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchHealthHistoryQuery,
  useFetchPrescriptionQuery,
  useFetchTestsQuery,
  useHealthFormMutation,
  usePrescriptionFormMutation,
  useTestFormMutation,
  useFetchVisitsQuery,
  useRequestDoctorMutation,
} = patientApi;
export { patientApi };
