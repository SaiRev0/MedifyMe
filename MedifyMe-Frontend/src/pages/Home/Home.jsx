import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./home.module.css";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.herosection}>
        <div className={styles.img1}>
          <img src="img1.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.content1}>CARING FOR LIFE</div>
          <div className={styles.content2}>
            Paving the Way <br></br> for Medical Excellence
          </div>
          <Link to="/health_history">
            <div className={styles.content3}>Get Started</div>
          </Link>
        </div>
        <div className={styles.group}>
          <img src="Group.png" />
        </div>
        <div className={styles.button}>
          <Link to="/health_history">
            <div className={styles.b1}>
              Check your Health History
              <img src="history.svg" />
            </div>
          </Link>
          <Link to="/">
            <div className={styles.b2}>
              Have queries? Ask Here
              <img src="query.svg" />
            </div>
          </Link>
          <Link to="/appointment">
            <div className={styles.b3}>
              Book an Appointment
              <img src="appointment.svg" />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.lp1}>Welcome to Medifyme</div>
      <div className={styles.lp2}>
        An AI Powered Platform for Managing Health Records
      </div>
      <div className={styles.lp3}>
        Discover a better way to manage your health records. MedifyMe helps
        <br></br> you manage your healthcare needs easily and efficiently.
        <br></br>
        Simplify your healthcare management today.
      </div>
      <div className={styles.landImage}>
        <img src="LandImage.png" />
      </div>
      <div className={styles.lp4}>Care you can believe in</div>
      <div className={styles.lp5}>Our Services</div>
      <div className={styles.lp6}>
        Facilitating Seamless Transtitions for Patients and Doctors
      </div>
      <div className={styles.lp7}>
        <ul>
          <li>Personalised Virtual Assitant</li>
          <li>Store all your records</li>
          <li>Make appointments directly</li>
        </ul>
        <ul>
          <li>Save Prescriptions and Test Reports</li>
          <li>Info About Medicine dosage and intake</li>
          <li>Easier communication with your Doctors</li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Home;
