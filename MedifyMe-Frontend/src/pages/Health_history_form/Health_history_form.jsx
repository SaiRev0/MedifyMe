import Navbar from "../../components/Navbar/Navbar";
import styles from "./Health_history_form.module.css";
import { useEffect, useState } from "react";
import { useHealthFormMutation } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import useFileUploader from "../../hooks/useFileUploader";

function Health_history_form() {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [doctorComments, setDoctorComments] = useState("");
  const [patientComments, setPatientComments] = useState("");

  const patient = useSelector((state) => {
    return state.patient;
  });

  const [files, handleFileChange] = useFileUploader({
    maxFileCount: 6,
  });

  const [form, formResults] = useHealthFormMutation();
  const isLoading = formResults.isLoading;

  useEffect(() => {
    if (!patient.isLoggedIn) {
      navigate("/login");
      toast.error("Please login to continue");
    }
  }, [navigate, patient.isLoggedIn]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("doctorName", doctorName);
    formData.append("date", date);
    formData.append("doctorComments", doctorComments);
    formData.append("patientComments", patientComments);
    formData.append("id", patient.id);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await form(formData);
      navigate("/health_history");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.health_history}>
        <form
          onSubmit={handleSubmit}
          className={styles.health_history_form}
          encType="multipart/form-data"
        >
          <h1 className={styles.header}>Health History Record</h1>



          <div className={styles.input_field}>
            <div>
              <label className={styles.docter_name} htmlFor="doctor-name">
                Doctor Name:
              </label>
              <input
                className={styles.health_input}
                type="text"
                id="doctor-name"
                name="doctor-name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.datediv} htmlFor="date">
                Date:
              </label>
              <input  
                className={styles.health_input_date}
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.text_health} htmlFor="doctor-comments">
                Doctor Comments:
              </label>
              <textarea
                value={doctorComments}
                onChange={(e) => setDoctorComments(e.target.value)}
                id="doctor-comments"
                name="doctor-comments"
                className={styles.comments}
              ></textarea>
            </div>
            <div className={styles.text_patient_comments}>
              <label className={styles.text_health} htmlFor="patient-comments">
                Patient Comments:
              </label>
              <textarea
                value={patientComments}
                onChange={(e) => setPatientComments(e.target.value)}
                id="patient-comments"
                name="patient-comments"
                className={styles.comments}
              ></textarea>
            </div>
          </div>
          <div className={styles.input_field_upload}>
            <div className={styles.upload_file}>
              <label className={styles.upload} htmlFor="file-upload">
                <img src="/Cloud_Upload.webp"></img>
                <span>Upload Documents</span>
              </label>
            </div>
            <div className={styles.numfiles}>{files.length} files selected</div>
            <input
              className={styles.health_file}
              type="file"
              id="file-upload"
              name="file-upload"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf"
              multiple
            />
          </div>
          <div className={styles.submit_btn}>
            <button className={styles.submit_button} type="submit">
              Add Record
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Health_history_form;
