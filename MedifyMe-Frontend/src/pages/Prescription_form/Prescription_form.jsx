import Navbar from "../../components/Navbar/Navbar";
import styles from "./Prescription_form.module.css";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.health_history}>
        <form className={styles.health_history_form}>
          <h1 className={styles.header}>Add A Presecription</h1>

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

          <label className={styles.text_health} htmlFor="file-upload">
            Upload Files
          </label>
          <input
            className={styles.health_file}
            type="file"
            id="file-upload"
            name="file-upload"
          />

          <label className={styles.docter_name} htmlFor="doctor-name">
            Medicines
          </label>
          <input
            className={styles.health_input}
            type="text"
            id="doctor-name"
            name="doctor-name"
            required
          />

          <label className={styles.text_health} htmlFor="doctor-comments">
            Prescription Comments:
          </label>
          <textarea id="doctor-comments" name="doctor-comments" className={styles.comments}></textarea>

          <button className={styles.submit_button} type="submit">
            Add
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Home;
