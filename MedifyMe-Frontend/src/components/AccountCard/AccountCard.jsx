import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./AccountCard.module.css";

function AccountCard() {
  const location = useLocation();
  const patient = useSelector((state) => {
    return state.patient;
  });

  const customId = () => {
    const smallRandomId = patient.id.substring(0, 8);
    const prefixCode = patient.role === "patient" ? "PA" : "DR";
    const Id = `${prefixCode}: #${smallRandomId.toUpperCase()}`;
    return Id;
  };

  return (
    <div className={styles.left_wrapper}>
      <div className={styles.card}>
        <img src={patient.photo} alt="profile" className={styles.img} />
        <div className={styles.list}>
          <h2 className={styles.id}>{`${customId()}`}</h2>
          <p className={styles.margin_top}>
            <Link
              className={
                location.pathname === "/settings/account"
                  ? styles.selected
                  : styles.default
              }
              to="/settings/account"
            >
              General Settings
            </Link>
          </p>
          <p className={styles.margin_top}>
            <Link
              className={
                location.pathname === "/settings/manage_doctors"
                  ? styles.selected
                  : styles.default
              }
              to="/settings/manage_doctors"
            >
              Manage Doctor
            </Link>
          </p>
          <p className={styles.margin_top}>
            <Link
              className={
                location.pathname === "/settings/payment"
                  ? styles.selected
                  : styles.default
              }
              to="/settings/payment"
            >
              Payment Settings
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
