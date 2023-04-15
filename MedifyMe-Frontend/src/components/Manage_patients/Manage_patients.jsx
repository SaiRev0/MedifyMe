import styles from "./Manage_patients.module.css";

function Home() {
  return (
    <div className={styles.right_wrapper}>
      <div className={styles.logout}>
        <a className={styles.logout_link} href="">
          Logout
        </a>
      </div>

      <div className={styles.doctor_history}>
        <p className={styles.doctor_history_content}>Current Patients </p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>1. Karen Davis</p>
        <p className={styles.doctor_contact}>03/07/2023 to Present</p>
        <button className={styles.remove_btn}>Remove</button>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>2. John Smith</p>
        <p className={styles.doctor_contact}>03/07/2023 to Present</p>
        <button className={styles.remove_btn}>Remove</button>
      </div>

      <div className={styles.doctor_history}>
        <p className={styles.doctor_history_content}>Add Patients</p>
      </div>

      <div className={styles.row}>
        <div className={styles.add_doctor_info}>
          <label className={styles.add_text_doctor} htmlFor="email">
            Patient Email:
          </label>
          <input
            className={styles.add_doctor_name}
            type="name"
            id="name"
            name="name"
            required
          />
        </div>
        <button className={styles.submit_button} type="submit">
          Submit
        </button>
      </div>

      <div className={styles.down_row}>
        <div className={styles.down_left_row}>
          <p>
            <label className={styles.container}>Allow Patient Messages
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            </label>
          </p>
          <p>
          <label className={styles.container}>Automatically Update Logs
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            </label>
          </p>
          <p>
          <label className={styles.container}>Notifications
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            </label>
          </p>
          <p>
          <label className={styles.container}>Allow Patient Requests
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            </label>
          </p>
        </div>
        <div className={styles.down_right_row}>
            <img src="/Group 9420.webp"/>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
