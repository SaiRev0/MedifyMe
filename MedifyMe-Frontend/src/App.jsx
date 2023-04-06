import Home from "./pages/Home/Home";
import Account from "./components/Account/Account";
import Payments from "./components/Payments/Payments";
import Login from "./pages/Login/Login";
import Health_history_form from "./pages/Health_history_form/Health_history_form";
import Register from "./pages/Register/Register";
import Prescription_form from "./pages/Prescription_form/Prescription_form";
import Health_history from "./pages/HealthHistory/HealthHistory";
import Manage_doctors from "./components/Manage_doctors/Manage_doctors";
import Manage_patients from "./components/Manage_patients/Manage_patients";
import Add_report from "./pages/Add_report/Add_report";
import Appointment from "./pages/Appointment/Appointment";
import Current_Prescription from "./pages/Doctor/Current_Prescription/Current_Prescription";
import Test_Report from "./pages/Doctor/Test_Report/Test_Report";
import Patient_Health_History from "./pages/Doctor/Patient_Health_History/Patient_Health_History";
import Prescription from "./pages/Prescription/Prescription";
import Test from "./pages/Test/Test";
import Settings from "./pages/Settings/Settings";
import SelectPatient from "./pages/Doctor/SelectPatient/SelectPatient";
import Video from "./pages/VideoSDK/Video";
// import RoomPage from "./pages/Rooms/Rooms";
// import Video_chat from "./pages/Video_chat/video_chat";

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./store";
import { doctorLoginSuccess } from "./store";

import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Loading from "./components/Loading/Loading";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="health_history" element={<Health_history />} />
      <Route path="healthHistoryForm" element={<Health_history_form />} />
      <Route path="prescription_form" element={<Prescription_form />} />
      <Route path="addreports" element={<Add_report />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="prescription" element={<Prescription />} />
      <Route path="test" element={<Test />} />
      <Route path="Loading" element={<Loading />} />
      <Route path="video" element={<Video />} />
      {/* settings */}
      <Route path="settings">
        <Route
          path="account"
          element={
            <Settings>
              <Account />
            </Settings>
          }
        />
        <Route
          path="manage_doctors"
          element={
            <Settings>
              <Manage_doctors />
            </Settings>
          }
        />
        <Route
          path="payment"
          element={
            <Settings>
              <Payments />
            </Settings>
          }
        />
        <Route
          path="manage_patients"
          element={
            <Settings>
              <Manage_patients />
            </Settings>
          }
        />
        <Route
          path="doc_payment_settings"
          element={
            <Settings>
              <Payments />
            </Settings>
          }
        />
      </Route>
      |{/* doctor routes */}
      <Route path="doctor">
        <Route path="select_patient" element={<SelectPatient />} />
        <Route path="current_prescription" element={<Current_Prescription />} />
        <Route path="test_report" element={<Test_Report />} />
        <Route
          path="patient_health_history"
          element={<Patient_Health_History />}
        />
      </Route>
      {/* <Route path="*" element={<Error404 />} /> */}
    </Route>
  )
);

function App() {
  const patient = useSelector((state) => {
    return state.patient;
  });

  const dispatch = useDispatch();
  const [patientCookies, setPatientCookie, removePatientCookie] = useCookies([
    "patient",
  ]);
  const [doctorCookies, setDoctorCookie, removeDoctorCookie] = useCookies([
    "doctor",
  ]);

  useEffect(() => {
    if (
      patientCookies.patient &&
      patientCookies.patient.id &&
      patientCookies.patient.token &&
      patientCookies.patient.email &&
      patientCookies.patient.photo &&
      patientCookies.patient.role &&
      patientCookies.patient.name &&
      patientCookies.patient.age &&
      patientCookies.patient.gender &&
      patientCookies.patient.height &&
      patientCookies.patient.weight &&
      patientCookies.patient.allergies &&
      patientCookies.patient.otherConditions &&
      patientCookies.patient.medications &&
      patientCookies.patient.overview
    ) {
      dispatch(
        loginSuccess({
          token: patientCookies.patient.token,
          id: patientCookies.patient.id,
          email: patientCookies.patient.email,
          photo: patientCookies.patient.photo,
          role: patientCookies.patient.role,
          name: patientCookies.patient.name,
          age: patientCookies.patient.age,
          gender: patientCookies.patient.gender,
          height: patientCookies.patient.height,
          weight: patientCookies.patient.weight,
          allergies: patientCookies.patient.allergies,
          otherConditions: patientCookies.patient.otherConditions,
          medications: patientCookies.patient.medications,
          overview: patientCookies.patient.overview,
        })
      );
    }

    if (
      doctorCookies.token &&
      doctorCookies._id &&
      doctorCookies.email &&
      doctorCookies.photo &&
      doctorCookies.role &&
      doctorCookies.name
    ) {
      dispatch(
        doctorLoginSuccess({
          token: doctorCookies.token,
          id: doctorCookies._id,
          email: doctorCookies.email,
          photo: doctorCookies.photo,
          role: doctorCookies.role,
          name: doctorCookies.name,
        })
      );
    }
  }, [patientCookies.patient, dispatch, patient.isLoggedIn, doctorCookies]);

  return <RouterProvider router={router} />;
}

export default App;
