import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./home.module.css";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import NavbarD from "../../components/Doctor/NavbarD/NavbarD";
import { useRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Home() {
  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const patient = useSelector((state) => {
    return state.patient;
  });

  const [imagesInView, setImagesInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImagesInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.9 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [imagesInView]);

  return (
    <>
      {doctor.isLoggedIn && !patient.isLoggedIn ? <NavbarD /> : <Navbar />}
      <div className={styles.herosection}>
        <div className={styles.img1}>
          <LazyLoadImage src="img1.webp" />
        </div>
        <div className={styles.content}>
          <TypeAnimation
            sequence={[
              "CARING FOR LIFE",
              1000,
              "CARING FOR YOU",
              1000,
              "CARING FOR HEALTH",
              1000,
              "CARING FOR FUTURE",
              1000,
            ]}
            speed={0}
            repeat={Infinity}
          />
          <div className={styles.content2}>
            Paving the Way <br></br> for Medical Excellence
          </div>
          <Link to="/health_history">
            <div className={styles.content3}>Get Started</div>
          </Link>
        </div>
        <div className={styles.group}>
          <LazyLoadImage src="Group.webp" />
        </div>
        <div className={styles.button}>
          <Link to="/health_history">
            <div className={styles.b1}>
              Check your Health History
              <LazyLoadImage src="history.webp" />
            </div>
          </Link>
          <Link to="/">
            <div className={styles.b2}>
              Have queries? Ask Here
              <LazyLoadImage src="query.webp" />
            </div>
          </Link>
          <Link to="/appointment">
            <div className={styles.b3}>
              Book an Appointment
              <LazyLoadImage src="appointment.webp" />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.lowerSection}>
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
          <div ref={sectionRef} className={styles.cardGroups}>
            <div className={styles.cardGroup}>
              <div
                className={`${styles.bigCard} ${styles.card} ${
                  imagesInView ? styles.animateCard1 : ""
                }`}
              ></div>

              <div
                className={`${styles.bigCard} ${styles.card} ${
                  imagesInView ? styles.animateCard2 : ""
                }`}
              ></div>

              <div
                className={`${styles.bigCard} ${styles.card} ${
                  imagesInView ? styles.animateCard3 : ""
                }`}
              ></div>

              <div
                className={`${styles.bigCard} ${styles.card} ${
                  imagesInView ? styles.animateCard4 : ""
                }`}
              ></div>
            </div>
          </div>
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
      </div>
      <div className={styles.featuredServices}>
        <h2>Featured Services</h2>
        <div className={styles.servicesList}>
          <div className={styles.service}>
            <LazyLoadImage opacity src="service1.webp" alt="Service 1" />
            <h4>Virtual Consultations</h4>
            <p>Get medical advice from the comfort of your home.</p>
          </div>
          <div className={styles.service}>
            <LazyLoadImage opacity src="service2.webp" alt="Service 2" />
            <h4>Health Monitoring</h4>
            <p>
              Track your health progress and get personalized recommendations.
            </p>
          </div>
          <div className={styles.service}>
            <LazyLoadImage opacity src="service3.webp" alt="Service 3" />
            <h4>Health Records</h4>
            <p>
              Store all your health records in one place and access them
              anytime.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
