import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Current_Prescription.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Prescription() {
  const navigate = useNavigate();

  const patient = useSelector((state) => {
    return state.patient;
  });

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    handleSend(inputValue);
    inputRef.current.value = "";
  };

  return (
    <>
      <Navbar />
      <div className={styles.PreH}>
        <div className={styles.t1}>Prescription History</div>
        <div className={styles.docs}>
          <div className={styles.doc1}>
            <div className={styles.date}>20 Jan 2023</div>
            <div className={styles.c}>
              <img src="" />
            </div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date}>18 Jan 2023</div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date}>2 Jan 2023</div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date}>5 Dec 2022</div>
          </div>
          <div className={styles.doc1}>
            <div className={styles.date}>16 Nov 2022</div>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <Link to="/prescription_form">
          <div className={styles.b}>Create New Record</div>
        </Link>
      </div>
      <div className={styles.currMed}>
        <div className={styles.t1}>Current Medications</div>
        <div className={styles.cm}>
          <div className={styles.title}>
            <div className={styles.namet}>Name</div>
            <div className={styles.dosaget}>Dosage</div>
          </div>
          <div className={styles.con}>
            <ol>
              <li>
                Amoxicillin: <span className={styles.d}>x1/day</span>
              </li>
              <li>
                Benzocaine: <span className={styles.d}>x1/day</span>
              </li>
              <li>
                Ibuprofen: <span className={styles.d}>x1/day</span>
              </li>
              <li>
                hlorhexidine mouthwash: <span className={styles.d}>x1/day</span>
              </li>
            </ol>
          </div>
        </div>
        <div className={styles.inst}>
          <a href="">
            <div className={styles.b}>Instructions</div>
          </a>
        </div>
        <div className={styles.dinfo}>
          <ol>
            <li>
              Lipitor (atorvastatin) - usually taken once daily with or without
              food, with dosages ranging from 10mg to 80mg depending on the
              individual's cholesterol levels and medical history.
            </li>
            <li>
              Zoloft (sertraline) - usually taken once daily with or without
              food, with dosages ranging from 25mg to 200mg depending on the
              individual's condition and response to the medication.
            </li>
            <li>
              Zoloft (sertraline) - usually taken once daily with or without
              food, with dosages ranging from 25mg to 200mg depending on the
              individual's condition and response to the medication.
            </li>
          </ol>
        </div>
      </div>
      <div className={styles.currentPres}>
        <div className={styles.ct}>
          <div className={styles.ct1}>Current Prescription</div>
          <div className={styles.ct2}>20 Jan 2023</div>
        </div>
        <div className={styles.up_cont}>
          <div className={styles.left_cont}>

          </div>
          <div className={styles.right_cont}>
            <div className={styles.photo}>
              <img src="PrescribtionImage.jpg" />
            </div>
          </div>
        </div>
        <div className={styles.down_cont}>
          <div className={styles.leftd_cont}>
            <h3>Edit Dosage and Instructions</h3>
            <div className={styles.edit_dosage}>
                <textarea rows="5" cols="40" type="text" name="textarea" required readonly>
                1.&nbsp;Lipitor (atorvastatin) - usually taken once daily with or without food, with dosages ranging from 10mg to 80mg depending on the individual's cholesterol levels and medical history.
                2.&nbsp;Zoloft (sertraline) - usually taken once daily with or without food, with dosages ranging from 25mg to 200mg depending on the individual's condition and response to the medication.
                3.&nbsp;Flonase (fluticasone) - usually taken once daily, with dosage depending on the individual's age and severity of symptoms.
                4.&nbsp;Metformin - usually taken with meals, with dosage depending on the individual's blood sugar levels and medical history.
                </textarea>
            </div>
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




        
      </div>
    </>
  );
}

export default Prescription;
