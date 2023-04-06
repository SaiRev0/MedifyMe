import styles from "./Settings.module.css";
import Navbar from "../../components/Navbar/Navbar";
import AccountCard from "../../components/AccountCard/AccountCard";

function Settings(props) {
  return (
    <>
      <Navbar />
      <div className={styles.grid_container}>
        <AccountCard />
        <div className={styles.right_wrapper}>{props.children}</div>
      </div>
    </>
  );
}

export default Settings;
