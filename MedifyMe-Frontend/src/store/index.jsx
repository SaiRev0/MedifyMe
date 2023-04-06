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

const store = configureStore({
  reducer: {
    patient: patientReducer,
    [patientApi.reducerPath]: patientApi.reducer,
    doctor: doctorReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(doctorApi.middleware);
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
  useHealthFormMutation,
  useFetchVisitsQuery,
} from "./apis/patientsApi";

export { useDLoginMutation } from "./apis/doctorsApi";
