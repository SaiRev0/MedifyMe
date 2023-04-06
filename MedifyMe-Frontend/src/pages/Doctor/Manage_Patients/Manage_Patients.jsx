import styles from "./Manage_Patients.module.css";
import AccountCard from "../../../components/AccountCard/AccountCard";
import Navbar from "../../../components/Navbar/Navbar";

function Doctor() {
  return (    <>
  <Navbar />
  <div className={styles.grid_container}>
    <AccountCard />
    <div className={styles.right_wrapper}>
      <div className={styles.logout}>
        <a className={styles.logout_link} href="">
          Logout
        </a>
      </div>
      <div className={styles.doctor_history}>
        <p className={styles.doctor_history_content}>Current Patients <button className={styles.viewbtn}>View All</button></p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}> &nbsp; &nbsp;Name</p>
        <p className={styles.doctor_contact}>Last Appointment</p>
      </div>
      <div className={styles.doctor}>
        <p className={styles.doctor_name}>1. Monica Geller</p>
        <p className={styles.doctor_contact}>06/07/2023</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>2. Ross Geller</p>
        <p className={styles.doctor_contact}>04/07/2023</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>3. Chandler Bing</p>
        <p className={styles.doctor_contact}>03/07/2023</p>
      </div>


      <div className={styles.doctor_history}>
        <p className={styles.doctor_history_content}>Patient Requests <button className={styles.viewbtn}>View All</button></p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>&nbsp;&nbsp;&nbsp;Name</p>
        <p className={styles.doctor_contact}>Id</p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>1. Joey Tribbiani</p>
        <p className={styles.doctor_contact}>#IN2839TRN</p>
        <p className={styles.doctor_contact}><button className={styles.ignorebtn}>Ignore</button><button className={styles.acceptbtn}>Accept</button></p>
      </div>

      <div className={styles.doctor}>
        <p className={styles.doctor_name}>2. Rachael Green</p>
        <p className={styles.doctor_contact}>#PK9741QSL</p>
        <p className={styles.doctor_contact}><button className={styles.ignorebtn}>Ignore</button><button className={styles.acceptbtn}>Accept</button></p>
      </div>
    </div>
  </div>
</>)
}

export default Doctor;
  