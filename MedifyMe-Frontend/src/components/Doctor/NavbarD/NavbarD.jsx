import { Link, useLocation } from "react-router-dom";
import Brand from "../../../assets/Brand.svg";
import styles from "./NavbarD.module.css";
import Account from "../../../assets/account.svg";
import { useSelector } from "react-redux";
import Burger from "../BurgerD/BurgerD";

const Navbar = () => {
  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div>
          <Link to="/">
            <div className={styles.logoSection}>
              <img alt="brand" src={Brand} />
              <span className={styles.brand}>
                MEDIFY<p className={styles.brandIn}>ME</p>
              </span>
            </div>
          </Link>
        </div>
        <div className={styles.nav_elements}>
          <ul>
            <li
              className={
                location.pathname === "/doctor/select_patient"
                  ? styles.active
                  : ""
              }
            >
              <Link
                to="/doctor/select_patient"
                className={styles.patients}
                style={{ color: "black" }}
              >
                Patients
              </Link>
            </li>
            <li
              className={
                location.pathname === "/doctor/patient_health_history"
                  ? styles.active
                  : ""
              }
            >
              <Link to="/doctor/patient_health_history">Health History</Link>
            </li>
            <li
              className={
                location.pathname === "/doctor/current_prescription"
                  ? styles.active
                  : ""
              }
            >
              <Link to="/doctor/current_prescription">Prescriptions</Link>
            </li>
            <li
              className={
                location.pathname === "/doctor/test_report" ? styles.active : ""
              }
            >
              <Link to="/doctor/test_report">Tests & Reports</Link>
            </li>
            <li
              className={
                location.pathname === "/doctor/patient_appointment"
                  ? styles.active
                  : ""
              }
            >
              <Link to="/doctor/patient_appointment">Appointment</Link>
            </li>
            <li>
              <div className={styles.signIn}>
                <img alt="account" src={Account} />
                {!doctor.isLoggedIn ? (
                  <Link to="/login">Sign In</Link>
                ) : (
                  <Link to="/doctor/settings/account">Account</Link>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.hamburger}><Burger patient/></div>
      </div>
    </nav>
  );
};

export default Navbar;
