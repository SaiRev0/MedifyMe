import { useLoginMutation } from "../store";
import { useDLoginMutation } from "../store";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store";
import { doctorLoginSuccess } from "../store";
import { useCookies } from "react-cookie";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useGLogin(role) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies([role]);
  const [login, loginResults] = useLoginMutation();
  const [dLogin, dLoginResults] = useDLoginMutation();

  const handleGoogleLogin = useCallback(
    async (tokenResponse) => {
      try {
        let detail = {
          googleAccessToken: tokenResponse.access_token,
          role: role,
        };
        if (role === "patient") {
          const { data } = await login(detail);
          if (data && data.foundPatient && data.status === 200) {
            dispatch(
              loginSuccess({
                token: data.foundPatient.token,
                id: data.foundPatient._id,
                email: data.foundPatient.email,
                photo: data.foundPatient.photo,
                role: role,
                name: data.foundPatient.name,
                age: data.foundPatient.age,
                gender: data.foundPatient.gender,
                height: data.foundPatient.height,
                weight: data.foundPatient.weight,
                allergies: data.foundPatient.allergies,
                otherConditions: data.foundPatient.otherConditions,
                medications: data.foundPatient.medications,
                overview: data.foundPatient.overview,
              })
            );
            setCookie(
              role,
              {
                token: data.foundPatient.token,
                id: data.foundPatient._id,
                email: data.foundPatient.email,
                photo: data.foundPatient.photo,
                role: role,
                name: data.foundPatient.name,
                age: data.foundPatient.age,
                gender: data.foundPatient.gender,
                height: data.foundPatient.height,
                weight: data.foundPatient.weight,
                allergies: data.foundPatient.allergies,
                otherConditions: data.foundPatient.otherConditions,
                medications: data.foundPatient.medications,
                overview: data.foundPatient.overview,
              },
              { path: "/", sameSite: "strict" }
            );
            navigate("/");
            toast.success(`Welcome ${data.foundPatient.name}`);
          } else if (data && data.status === 212) {
            setCookie(
              role,
              {
                token: data.token,
                email: data.email,
                photo: data.photo,
                role,
              },
              { path: "/", sameSite: "strict" }
            );
            navigate("/register");
            toast.warn("Fill out these details to complete your registration");
          }
        } else if (role === "doctor") {
          console.log("roleD", role);
          const { data } = await dLogin(detail);
          if (data && data.foundDoctor && data.status === 200) {
            dispatch(
              doctorLoginSuccess({
                token: data.foundDoctor.token,
                id: data.foundDoctor._id,
                email: data.foundDoctor.email,
                photo: data.foundDoctor.photo,
                role: role,
                name: data.foundDoctor.name,
              })
            );
            setCookie(
              role,
              {
                token: data.foundDoctor.token,
                id: data.foundDoctor._id,
                email: data.foundDoctor.email,
                photo: data.foundDoctor.photo,
                role: role,
                name: data.foundDoctor.name,
              },
              { path: "/", sameSite: "strict" }
            );
            if (dLoginResults.isLoading) {
              toast.info("Loading...");
            }
            navigate("/doctor/select_patient");
            toast.success(`Welcome Dr.${data.foundDoctor.name}`);
          } else if (data && data.status === 212) {
            dispatch(
              doctorLoginSuccess({
                token: data.doctor.token,
                id: data.doctor.id,
                email: data.doctor.email,
                photo: data.doctor.photo,
                role,
                name: data.doctor.name,
              })
            );
            setCookie(
              role,
              {
                token: data.doctor.token,
                id: data.doctor.id,
                email: data.doctor.email,
                photo: data.doctor.photo,
                name: data.doctor.name,
                role: role,
              },
              { path: "/", sameSite: "strict" }
            );
            if (dLoginResults.isLoading) {
              toast.info("Loading...");
            }
            navigate("/doctor/select_patient");
            toast.success(`Welcome Dr.${data.doctor.name}`);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      dispatch,
      login,
      setCookie,
      role,
      navigate,
      dLogin,
      doctorLoginSuccess,
      loginSuccess,
    ]
  );

  return { handleGoogleLogin, loginResults };
}
