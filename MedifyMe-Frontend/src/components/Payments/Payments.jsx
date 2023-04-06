import styles from "./Payments.module.css";
import useLogout from "../../hooks/useLogout";

function Payments() {
  const { handleLogout } = useLogout();

  return (
    <div className={styles.right_wrapper}>
      <div className={styles.logout}>
        <button onClick={handleLogout} className={styles.logout_link}>
          Logout
        </button>
      </div>
      <img
        className={styles.img_payment}
        src="../image 4.png"
        alt="payment"
        width="500"
        height="600"
      />
      <div className={styles.payments_content}>No Payments to show!</div>
    </div>
  );
}

export default Payments;
