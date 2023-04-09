import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess, doctorLogoutSuccess } from "../store";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patientCookies, setPatientCookie, removePatientCookie] = useCookies([
    "patient",
  ]);
  const [doctorCookies, setDoctorCookie, removeDoctorCookie] = useCookies([
    "doctor",
  ]);

  const patient = useSelector((state) => {
    return state.patient;
  });
  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const handleLogout = () => {
    if (patient.isLoggedIn) {
      dispatch(logoutSuccess());
      removePatientCookie("patient", { path: "/", sameSite: "strict" });
      toast.info("See You Soon!!");
      navigate("/");
    }
    if (doctor.isLoggedIn) {
      dispatch(doctorLogoutSuccess());
      removeDoctorCookie("doctor", { path: "/", sameSite: "strict" });
      toast.info("See You Soon!!");
      navigate("/");
    }
  };
  return { handleLogout };
}

export default useLogout;
