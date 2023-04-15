import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./AccountCardD.module.css";

function AccountCardD() {
  const location = useLocation();
  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const customId = () => {
    if (doctor.id) {
      const smallRandomId = doctor.id.substring(0, 8);
      const Id = `DR #${smallRandomId.toUpperCase()}`;
      return Id;
    }
  };

  return (
    <div className={styles.left_wrapper}>
      <div className={styles.card}>
        <img src={doctor.photo} alt="profile" className={styles.img} />
        <div className={styles.list}>
          <h2 className={styles.id}>{`${customId()}`}</h2>
          <p className={styles.margin_top}>
            <Link
              className={
                location.pathname === "/doctor/settings/account"
                  ? styles.selected
                  : styles.default
              }
              to="/doctor/settings/account"
            >
              General Settings
            </Link>
          </p>
          <p className={styles.margin_top}>
            <Link
              className={
                location.pathname === "/doctor/settings/manage_patients"
                  ? styles.selected
                  : styles.default
              }
              to="/doctor/settings/manage_patients"
            >
              Manage Patients
            </Link>
          </p>
          <p className={styles.margin_top}>
            <Link
              className={
                location.pathname === "/doctor/settings/payment"
                  ? styles.selected
                  : styles.default
              }
              to="/doctor/settings/payment"
            >
              Payment Settings
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountCardD;
