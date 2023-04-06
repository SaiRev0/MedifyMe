import { useState } from "react";
import { Link } from "react-router-dom";
// import { ReactComponent as Hamburger } from './hamburger.svg'
// import { ReactComponent as Brand } from './logo.svg'
import styles from "./Footer.module.css";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  const handleShowFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <div className={styles.footer}>
      <div></div>
      <div className={styles.footer_1}>
        <p className={styles.text_1}>
          MEDIFY<span className={styles.text_2}>ME</span>
        </p>
        <p className={styles.text_3}>Paving the Way for Medical Excellence</p>
      </div>
      <div className={styles.footer_2}>
        <p className={styles.text_4}>Important Links</p>
        <ul className={styles.text_5}>
          <li>Appointment</li>
          <li>Health History</li>
          <li>Prescription</li>
          <li>Test & Reports</li>
        </ul>
      </div>
      <div className={styles.footer_3}>
        <p className={styles.text_6}>Contact Us</p>
        <a className={styles.contact_1} href="/">
          Call: (+91) 7870658888
        </a>
        <p className={styles.address}>
          <span className={styles.addressSpan}>Address:</span> Near Hyderbad
          gate Varanasi
        </p>
      </div>
      <div className={styles.footer_4}>
        <p className={styles.text_7}>Contact For Sales</p>
        <form action="">
          <input className={styles.input} type="text" />
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
