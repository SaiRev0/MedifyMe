import styles from "./SettingsDoctor.module.css";
import NavbarD from "../../../components/Doctor/NavbarD/NavbarD";
import AccountCardD from "../../../components/Doctor/AccountCardD/AccountCardD";

function SettingsDoctor(props) {
  return (
    <>
      <NavbarD />
      <div className={styles.grid_container}>
        <AccountCardD />
        <div className={styles.right_wrapper}>{props.children}</div>
      </div>
    </>
  );
}

export default SettingsDoctor;
