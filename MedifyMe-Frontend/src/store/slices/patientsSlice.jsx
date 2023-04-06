import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    isLoggedIn: false,
    token: null,
    id: null,
    role: null,
    name: " ",
    email: " ",
    photo: " ",
    age: " ",
    gender: " ",
    height: " ",
    weight: " ",
    allergies: " ",
    otherConditions: " ",
    medications: " ",
    overview: " ",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.role = action.payload.role;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.allergies = action.payload.allergies;
      state.otherConditions = action.payload.otherConditions;
      state.medications = action.payload.medications;
      state.overview = action.payload.overview;
    },
    logoutSuccess: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.id = null;
      state.name = null;
      state.email = null;
      state.photo = null;
      state.role = null;
      state.age = null;
      state.gender = null;
      state.height = null;
      state.weight = null;
      state.allergies = null;
      state.otherConditions = null;
      state.medications = null;
      state.overview = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = patientSlice.actions;
export const patientReducer = patientSlice.reducer;
