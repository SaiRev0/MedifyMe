import Navbar from "../../components/Navbar/Navbar";
import styles from "./Prescription_form.module.css";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.health_history}>
        <form className={styles.health_history_form}>
          <h1 className={styles.header}>Add A Prescription</h1>
          <label className={styles.text_health} htmlFor="doctor-name">
            Medicines
          </label>
          <textarea id="doctor-medicines" name="doctor-medicines" className={styles.comments}></textarea>

          <label className={styles.text_health} htmlFor="doctor-comments">
            Prescription Comments:
          </label>
          <textarea id="doctor-comments" name="doctor-comments" className={styles.comments}></textarea>

          <label className={styles.text_health} htmlFor="date">
            Date:
          </label>
          <input
            className={styles.health_input}
            type="date"
            id="date"
            name="date"
            required
          />

          <div className={styles.upload_file}>
          <label className={styles.upload} htmlFor="file-upload"><img src="/Cloud_Upload.png"></img><span>Upload Documents</span></label>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Home;
