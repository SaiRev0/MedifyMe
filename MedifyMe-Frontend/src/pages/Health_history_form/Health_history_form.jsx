import Navbar from "../../components/Navbar/Navbar";
import styles from "./Health_history_form.module.css";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useHealthFormMutation } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

function Health_history_form() {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [doctorComments, setDoctorComments] = useState("");
  const [patientComments, setPatientComments] = useState("");
  const [files, setFiles] = useState([]);

  const patient = useSelector((state) => {
    return state.patient;
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

  const handleFileChange = (event) => {
    const files = event.target.files;
    const validFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const maxFileSizeMB = 5;
    const maxFileCount = 10;

    if (files.length > maxFileCount) {
      toast.error(`You can upload up to ${maxFileCount} files`);
      event.target.value = null;
    }

    let filteredFiles = Array.from(files).filter((file) => {
      const isValidFileType = validFileTypes.includes(file.type);
      const isUnderMaxFileSize = file.size <= maxFileSize;
      if (!isValidFileType) {
        toast.error(
          `File type ${file.type} is not allowed. Please upload only JPG, JPEG, PNG, or PDF files. Your file will not be saved`
        );
      } else if (!isUnderMaxFileSize) {
        toast.error(
          `File ${file.name} is too large. Please upload files that are smaller than ${maxFileSizeMB} MB. Your file will not be saved`
        );
      } else {
        return true;
      }
      return false;
    });

    if (filteredFiles.length > maxFileCount) {
      toast.error(
        `You can upload up to ${maxFileCount} files. Only the first ${maxFileCount} files will be saved.`
      );
      filteredFiles = filteredFiles.slice(0, maxFileCount);
    }

    setFiles(filteredFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("doctorName", doctorName);
    formData.append("date", date);
    formData.append("doctorComments", doctorComments);
    formData.append("patientComments", patientComments);
    formData.append("id", patient.id);

    let totalFileSize = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      totalFileSize += file.size;
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. It will not be saved`);
        files.splice(i, 1);
        i--; // Decrement the loop index to account for the removed file
      }
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await form(formData);
      navigate("/health_history");
    } catch (error) {
      console.error(error);
    }
    // console.log(typeof date);
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
              <label  className={styles.datediv} htmlFor="date">
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
              </div>
            <div className={styles.input_field}>
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
              <label className={styles.upload} htmlFor="file-upload"><img src="/Cloud_Upload.png"></img><span>Upload Documents</span></label>
              </div>
              <input
                className={styles.health_file}
                type="file"
                id="file-upload"
                name="file-upload"
                onChange={(e) => handleFileChange(e)}
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
