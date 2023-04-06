import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["patient"]);

  const patient = useSelector((state) => {
    return state.patient;
  });
  const handleLogout = () => {
    if (patient.isLoggedIn) {
      dispatch(logoutSuccess());
      removeCookie("patient", { path: "/" });
      toast.info("See You Soon!!");
      navigate("/");
    }
    if (!patient.isLoggedIn) {
      navigate("/login");
    }
  };
  return { handleLogout };
}

export default useLogout;
