import styles from "./Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useGLogin } from "../../hooks/useGLogin";
import Navbar from "../../components/Navbar/Navbar";
function Login() {
  const [role, setRole] = useState("patient");
  const { handleGoogleLogin, loginResults } = useGLogin(role);

  const loginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      handleGoogleLogin(tokenResponse);
    },
  });

  return (
    <>
      <Navbar />
      <div className={styles.grid_container}>
        <div className={styles.left_wrapper}>
          <div className={styles.card}>
            <div>
              <h2 className={styles.content_left_wrapper}>
                Manage your Health,not just your Records
              </h2>
            </div>
            <img src="Group 9424.png" alt="" className={styles.img2} />
          </div>
        </div>
        <div className={styles.right_wrapper}>
          <h4 className={styles.login_content}>
            Verify Yourself to Proceed Further
          </h4>
          <div className={styles.for_inline}>
            <label className={styles.patients_input} htmlFor="role">
              I am a:
            </label>
            <select
              className={styles.input_text1}
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option className={styles.usertype} value="patient">
                Patient
              </option>
              <option className={styles.usertype} value="doctor">
                Doctor
              </option>
            </select>

            <button
              className={styles.google_login_b}
              disabled={loginResults.isLoading}
              onClick={() => loginHandler()}
            >
              <span className={styles.google_p}>
                {loginResults.isLoading
                  ? "Logging in..."
                  : "Sign in with google"}
              </span>
            </button>

            <div className={styles.login_lowerpart}>
              <img src="login.svg" alt="" className={styles.img3} />
              <p className={styles.login_lower_content}>
                First time users will be asked a few questions by our AI Powered
                Chatbot to begin their journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
