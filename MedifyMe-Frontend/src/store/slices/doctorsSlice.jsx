import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    isLoggedIn: false,
    token: null,
    id: null,
    role: null,
    name: " ",
    email: " ",
    photo: " ",
  },
  reducers: {
    doctorLoginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.role = action.payload.role;
    },
    doctorLogoutSuccess: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.id = null;
      state.name = null;
      state.email = null;
      state.photo = null;
      state.role = null;
    },
  },
});

export const { doctorLoginSuccess, doctorLogoutSuccess } = doctorSlice.actions;
export const doctorReducer = doctorSlice.reducer;
