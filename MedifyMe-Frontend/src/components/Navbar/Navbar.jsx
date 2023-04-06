import { Link, useLocation } from "react-router-dom";
import Brand from "../../assets/Brand.svg";
import styles from "./Navbar.module.css";
import Account from "../../assets/account.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const patient = useSelector((state) => {
    return state.patient;
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
                location.pathname === "/health_history" ? styles.active : ""
              }
            >
              <Link to="/health_history">Health History</Link>
            </li>
            <li
              className={
                location.pathname === "/prescription" ? styles.active : ""
              }
            >
              <Link to="/prescription">Prescriptions</Link>
            </li>
            <li className={location.pathname === "/test" ? styles.active : ""}>
              <Link to="/test">Tests & Reports</Link>
            </li>
            <li className={location.pathname === "/video" ? styles.active : ""}>
              <Link to="/video">Video Chat</Link>
            </li>
            <li>
              <div className={styles.appointment}>
                <Link style={{ color: "black" }} to="/appointment">
                  Appointment
                </Link>
              </div>
            </li>
            <li>
              <div className={styles.signIn}>
                <img alt="account" src={Account} />
                {!patient.isLoggedIn ? (
                  <Link to="/login">Sign In</Link>
                ) : (
                  <Link to="/settings/account">Account</Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
