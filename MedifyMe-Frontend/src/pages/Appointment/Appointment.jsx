import Navbar from "../../components/Navbar/Navbar";
import styles from "./Appointment.module.css";
import AccountCard from "../../components/AccountCard/AccountCard";

function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.grid_container}>
        <div className={styles.left_wrapper}>
          <div className={styles.t1}>History</div>
          <div className={styles.docs}>
            <div className={styles.doc1}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
          </div>
          <div className={styles.button}>
            <a href="">
              <div className={styles.b}>Create New Record</div>
            </a>
          </div>
          <div className={styles.t1}>Doctors Suggestions</div>
          <div className={styles.docsu}>
            <div className={styles.doc1}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.png" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
          </div>
        </div>
        <div className={styles.right_wrapper}>
          <div className={styles.doctors_identity}>
            <div className={styles.grid_container2}>
              <img className={styles.img} src="image 7.png" alt="" />
              <div className={styles.doctors_identity_content}>
                <p className={styles.doctors_identity_content1}>John Wilson</p>
                <p className={styles.doctors_identity_content2}>Physician</p>
                <p className={styles.doctors_identity_content3}>
                  Time : 4:00pm -5:00pm
                </p>
              </div>
            </div>
          </div>
          <div className={styles.appointment_1}>
            <p className={styles.appointment_fee_text}>Appointment Fee</p>
            <p className={styles.appointment_fee}>₹ 500</p>
          </div>
          <div className={styles.appointment_2}>
            <p className={styles.admin_fee_text}>Admin Fee</p>
            <p className={styles.admin_fee}>₹ 500</p>
          </div>
          <div className={styles.appointment_3}>
            <p className={styles.total_fee_text}>Total Fee</p>
            <p className={styles.total_fee}>₹ 500</p>
          </div>
          <div className={styles.coupon}>
            <span className={styles.enter_coupon}>
              Enter Coupon : <span className={styles.coup}>MEDIFYME100</span>
            </span>
            <a href="">
              <div className={styles.coupon_button}>Apply coupon</div>
            </a>
          </div>
          <a href="">
            <div className={styles.pay}>Pay ₹550</div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
