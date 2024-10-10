import { configureStore } from "@reduxjs/toolkit";
import {
  patientReducer,
  loginSuccess,
  logoutSuccess,
} from "./slices/patientsSlice";
import {
  doctorReducer,
  doctorLoginSuccess,
  doctorLogoutSuccess,
} from "./slices/doctorsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { patientApi } from "./apis/patientsApi";
import { doctorApi } from "./apis/doctorsApi";
import { gptApi } from "./apis/gptApi";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    [patientApi.reducerPath]: patientApi.reducer,
    doctor: doctorReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [gptApi.reducerPath]: gptApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(doctorApi.middleware)
      .concat(gptApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  loginSuccess,
  logoutSuccess,
  doctorLoginSuccess,
  doctorLogoutSuccess,
};

export {
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
} from "./apis/patientsApi";

export {
  useDLoginMutation,
  useFetchPatientsQuery,
  useAcceptPatientsMutation,
} from "./apis/doctorsApi";

export { useChatMutation } from "./apis/gptApi";
