import Navbar from "../../components/Navbar/Navbar";
import styles from "./Prescription_form.module.css";
import { useEffect, useState } from "react";
import { usePrescriptionFormMutation } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import useFileUploader from "../../hooks/useFileUploader";

function Home() {
  const navigate = useNavigate();
  const [medication, setMedication] = useState("");
  const [prescriptionComments, setPrescriptionComments] = useState("");
  const [date, setDate] = useState("");

  const patient = useSelector((state) => {
    return state.patient;
  });

  const [files, handleFileChange] = useFileUploader(4);

  const [form, formResults] = usePrescriptionFormMutation();
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
    formData.append("date", date);
    formData.append("medication", medication);
    formData.append("prescriptionComments", prescriptionComments);
    formData.append("id", patient.id);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await form(formData);
      navigate("/prescription");
    } catch (error) {
      console.error(error);
      toast.error("Error adding prescription");
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
          <h1 className={styles.header}>Add A Prescription</h1>
          <label
            className={styles.text_health}
            htmlFor="doctor-medicines"
            required
          >
            Medications
          </label>
          <textarea
            id="doctor-medicines"
            name="doctor-medicines"
            className={styles.comments}
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          ></textarea>

          <label className={styles.text_health} htmlFor="doctor-comments">
            Prescription Comments:
          </label>
          <textarea
            id="doctor-comments"
            name="doctor-comments"
            className={styles.comments}
            value={prescriptionComments}
            onChange={(e) => setPrescriptionComments(e.target.value)}
          ></textarea>

          <label className={styles.text_health} htmlFor="date">
            Date:
          </label>
          <input
            className={styles.health_input}
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className={styles.upload_box}>
          <div className={styles.upload_file}>
            <label className={styles.upload} htmlFor="file-upload">
              <img src="/Cloud_Upload.webp"></img>
              <span>Upload Documents</span>
            </label>
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
          <div className={styles.numfiles}>{files.length} files selected</div>
          </div>
          
                   
          <div className={styles.submit_btn}>
            <button className={styles.submit_button} type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Home;
