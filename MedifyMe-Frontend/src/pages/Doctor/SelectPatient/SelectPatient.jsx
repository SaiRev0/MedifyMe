import styles from "./SelectPatient.module.css";
import Navbar from "../../../components/Navbar/Navbar";
function SelectPatient() {
  return (
    <>
      <Navbar />
      <div className={styles.grid_container}>
        <img
          src="../../../../public/doctor-illustration.svg"
          alt="doctor image"
          className={styles.left_wrapper}
        ></img>
        <div className={styles.right_wrapper}>
          <div className={styles.doctor_history}>
            <p className={styles.doctor_history_content}>Dr. Amit Trivedi</p>
          </div>
          <div className={styles.row}>
            <div className={styles.add_doctor_info}>
              <label className={styles.add_text_doctor} htmlFor="email">
                Active Patient:
              </label>
              <select className={styles.add_doctor_name} id="name" name="name">
                <option>Rachael Green</option>
                <option>Chandler Bing</option>
                <option>Ross Geller</option>
                <option>Joey Tribiiani</option>
                <option>Pheobe Buffay</option>
                <option>Monica Geller</option>
              </select>
              <button className={styles.select_btn} type="submit">
                Select
              </button>
            </div>

            <div className={styles.add_patients}>
              <p className={styles.add_patients_p}>Add Patients</p>
              <label className={styles.add_text_doctor} htmlFor="email">
                Patient Id:
              </label>
              <input
                className={styles.add_patient_id}
                type="ID"
                id="ID"
                name="patient_id"
                required
              />
              <button className={styles.submit_btn} type="submit">
                Submit
              </button>
            </div>

            <div className={styles.doctor_history}>
              <p className={styles.add_patients_p}>Patient Requests</p>
            </div>
            <div className={styles.patient_grid}>
              <div className={styles.patient}>
                <p className={styles.patient_name}>
                  &nbsp;&nbsp;&nbsp;1. Joey Tribbiani
                </p>
                <p className={styles.patient_id}>#IN2839TRN</p>
                <p className={styles.friend_requests}>
                  <button className={styles.ignorebtn}>Ignore</button>
                  <button className={styles.acceptbtn}>Accept</button>
                </p>
              </div>
              <div className={styles.patient}>
                <p className={styles.patient_name}>
                  &nbsp;&nbsp;&nbsp;2. Rachael Green
                </p>
                <p className={styles.patient_id}>#PK9741QSL</p>
                <p className={styles.friend_requests}>
                  <button className={styles.ignorebtn}>Ignore</button>
                  <button className={styles.acceptbtn}>Accept</button>
                </p>
              </div>
              <div className={styles.patient}>
                <p className={styles.patient_name}>
                  &nbsp;&nbsp;&nbsp;3. Pheobe Buffay
                </p>
                <p className={styles.patient_id}>#IU1029WED</p>
                <p className={styles.friend_requests}>
                  <button className={styles.ignorebtn}>Ignore</button>
                  <button className={styles.acceptbtn}>Accept</button>
                </p>
              </div>
              <button className={styles.viewbtn}>View All</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPatient;
