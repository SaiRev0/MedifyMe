import Navbar from "../Navbar/Navbar";
import styles from "./Error404.module.css";

function Error404() {

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.left}>
            <h1>404</h1>
            <h2>Sorry, the page you are <br/>looking for could not be found</h2>
        </div>
        <div className={styles.right}>
            <img src="/doctor-illustration.webp"></img>
        </div>
      </div>
    </>
  );
}

export default Error404;
