import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Test_Report.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Test() {
  const patient = useSelector((state) => {
    return state.patient;
  });
  const navigate = useNavigate();

//   useEffect(() => {
//     if (!patient.isLoggedIn) {
//       navigate("/login");
//       toast.error("Please login to continue");
//     }
//   }, [navigate, patient.isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className={styles.PreH}>
        <div className={styles.t1}>Reports History</div>
        <div className={styles.docs}>
          <div className={styles.doc1}>
            <div className={styles.date1}>20 Jan 2023</div>
            <div className={styles.c}>
              <img src="" />
            </div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date1}>23july 2023</div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date1}>18feb 2023</div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date1}>19Nov 2023</div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date1}>20Dec 2023</div>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <a href="">
          <div className={styles.b}>Create New Record</div>
        </a>
      </div>

      <div className={styles.docvisit}>
        <div className={styles.t1}>Latest test taken</div>
        <div className={styles.docs2}>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Phillips</div>
            </div>
            <a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><div className={styles.date}>&#128197;20Jan 2023</div></a>
          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Gylnnei</div>
            </div>
            <a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><div className={styles.date}>&#128197;17Jan 2023</div></a>          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Brickee</div>
            </div>
            <a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><div className={styles.date}>&#128197;15Jan 2023</div></a>          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Mangle</div>
            </div>
            <a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><div className={styles.date}>&#128197;14Jan 2023</div></a>          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. B.Sicke</div>
            </div>
            <a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><div className={styles.date}>&#128197;12Jan 2023</div></a>          </div>
        </div>
      </div>

      <div className={styles.currentPres}>
        <div className={styles.ct}>
          <div className={styles.ct1}>Latest Test Report</div>
          <div className={styles.ct2}>20 Jan 2023</div>
        </div>
        <div className={styles.cont}>
          <div className={styles.left_cont}>
            <div className={styles.leftd_cont}>
                <h3>Doctor Comments</h3>
                <div className={styles.edit_dosage}>
                    <textarea rows="5" cols="40" type="text" name="textarea" required readonly>
                    1.&nbsp;Lipitor (atorvastatin) - usually taken once daily with or without food, with dosages ranging from 10mg to 80mg depending on the individual's cholesterol levels and medical history.
                    2.&nbsp;Zoloft (sertraline) - usually taken once daily with or without food, with dosages ranging from 25mg to 200mg depending on the individual's condition and response to the medication.
                    3.&nbsp;Flonase (fluticasone) - usually taken once daily, with dosage depending on the individual's age and severity of symptoms.
                    4.&nbsp;Metformin - usually taken with meals, with dosage depending on the individual's blood sugar levels and medical history.
                    </textarea>
                </div>
                <button id="Schedule" className={styles.schedule_btn}>Schedule Appointment</button>
            </div>
            <div className={styles.leftu_cont}>
                <h3>Ask for tests</h3>
                <button id="Submit" className={styles.submit_btn}>Submit</button>
            </div>

          </div>
          <div className={styles.right_cont}>
                <div className={styles.rightu_cont}>
                    <div className={styles.pdf_preview}><a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><img src="PDF.png"/><p>Blood Report</p></a></div>
                    <div className={styles.pdf_preview}><a href={"https://drive.google.com/file/d/1qwBZx5GO5dNxsUYhRXjCnp1N_zfO-irk/view?usp=share_link"} target="_blank"><img src="PDF.png"/><p>Blood Report</p></a></div>
                    
                </div>
                <div className={styles.rightd_cont}>
                    <h3>Ayukumi AI Report</h3>
                    <div className={styles.ayukumi_report}>
                        1.&nbsp;Lipitor (atorvastatin) - usually taken once daily with or without food, with dosages ranging from 10mg to 80mg depending on the individual's cholesterol levels and medical history.
                        <br/> 2.&nbsp;Zoloft (sertraline) - usually taken once daily with or without food, with dosages ranging from 25mg to 200mg depending on the individual's condition and response to the medication.
                        <br/> 3.&nbsp;Flonase (fluticasone) - usually taken once daily, with dosage depending on the individual's age and severity of symptoms.
                        <br/> 4.&nbsp;Metformin - usually taken with meals, with dosage depending on the individual's blood sugar levels and medical history.
                    </div>
                </div>
          </div>
          {/* <div className={styles.photo}>
            <img src="PrescribtionImage.jpg" />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Test;
