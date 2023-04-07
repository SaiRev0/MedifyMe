import styles from "./Manage_doctors.module.css";
import useLogout from "../../hooks/useLogout";
import { useRequestDoctorMutation } from "../../store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Manage_doctors() {
  const [email, setEmail] = useState("");
  const { handleLogout } = useLogout();
  const patient = useSelector((state) => {
    return state.patient;
  });

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

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>1. Dr Karen Davis</p>
        <p className={styles.doctor_contact}>03/07/2023 to 24/07/2023</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>2. Dr John Smith</p>
        <p className={styles.doctor_contact}>03/07/2023 to 24/07/2023</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>3.Dr. Maria Gonzalez</p>
        <p className={styles.doctor_contact}>03/07/2023 to 24/07/2023</p>
      </div>
      <div className={styles.doctor}>
        <p className={styles.doctor_name}>3.Dr. Maria Gonzalez</p>
        <p className={styles.doctor_contact}>03/07/2023 to 24/07/2023</p>
      </div>

      <div className={styles.doctor_history}>
        <p className={styles.doctor_history_content}>Current Doctor</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>3.Dr. Maria Gonzalez</p>
        <p className={styles.doctor_contact}>03/07/2023 to 24/07/2023</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>3.Dr. Maria Gonzalez</p>
        <p className={styles.doctor_contact}>03/07/2023 to 24/07/2023</p>
      </div>

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
