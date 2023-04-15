import styles from "./Manage_doctors.module.css";
import useLogout from "../../hooks/useLogout";
import {
  useRequestDoctorMutation,
  useFetchHealthHistoryQuery,
} from "../../store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function Manage_doctors() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { handleLogout } = useLogout();

  const patient = useSelector((state) => {
    return state.patient;
  });

  useEffect(() => {
    if (!patient.isLoggedIn) {
      navigate("/login");
      toast.error("Please login to continue");
    }
  }, [navigate, patient.isLoggedIn]);

  const { data, error, isFetching } = useFetchHealthHistoryQuery(patient.id);

  const [form, formResults] = useRequestDoctorMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex pattern
    if (!emailPattern.test(email)) {
      toast.error("Invalid email"); // Show an error toast if the email is invalid
      return;
    }

    const loadingToastId = toast.info("Submitting request...");

    const send = {
      doctorEmail: email,
      id: patient.id,
    };
    try {
      const { data } = await form(send);
      if (data.status === 212) {
        toast.update(loadingToastId, {
          type: "warning",
          render: data.message,
        });
      } else if (data.status === 200) {
        toast.update(loadingToastId, {
          type: "success",
          render: "Request sent successfully",
        });
      }
      setEmail(""); // Reset the email input field to an empty string
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.right_wrapper}>
      <div className={styles.logout}>
        <button onClick={handleLogout} className={styles.logout_link}>
          Logout
        </button>
      </div>
      <div className={styles.doctor_history}>
        <p className={`${styles.doctor_history_content} ${styles.firstdoc}`}>
          Doctor History
        </p>
      </div>
      {data &&
        data.doctors &&
        data.doctors.map((doctor, index) => (
          <div className={styles.doctor} key={index}>
            <p className={styles.doctor_name}>
              {index + 1} {doctor.name}
            </p>
          </div>
        ))}
      <div className={styles.doctor_history}>
        <p className={styles.doctor_history_content}>Add New Doctors</p>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className={styles.add_text_doctor} htmlFor="email">
          Doctor Email:
        </label>
        <input
          className={styles.add_doctor_name}
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles.submit_button}>Submit</button>
      </form>
    </div>
  );
}

export default Manage_doctors;
