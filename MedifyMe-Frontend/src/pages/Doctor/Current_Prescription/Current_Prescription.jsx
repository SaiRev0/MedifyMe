import NavbarD from "../../../components/Doctor/NavbarD/NavbarD";
import styles from "./Current_Prescription.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Prescription() {
  const navigate = useNavigate();

  const patient = useSelector((state) => {
    return state.patient;
  });

  const [isEditable, setIsEditable] = useState(false);

  const makeEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <>
      <NavbarD />
      <div className={styles.PreH}>
        <div className={styles.t1}>Prescription History</div>
        <div className={styles.docs}>
          <div className={styles.doc1}>
            <div className={styles.date}>20 Jan 2023</div>
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
                Amoxicillin: <div className={styles.d}>x1/day</div>
              </li>
              <li>
                Benzocaine: <div className={styles.d}>x1/day</div>
              </li>
              <li>
                Ibuprofen: <div className={styles.d}>x1/day</div>
              </li>
              <li>
                hlorhexidine mouthwash: <div className={styles.d}>x1/day</div>
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
          <div className={styles.left_cont}></div>
          <div className={styles.right_cont}>
            <div className={styles.photo}>
              <img src="../PrescribtionImage.webp" />
            </div>
          </div>
        </div>
        <div className={styles.down_cont}>
          <div className={styles.leftd_cont}>
            <h3>Edit Dosage and Instructions</h3>
            <button
              onClick={makeEditable}
              className={
                !isEditable ? styles.edit_btn : styles.edit_btn_clicked
              }
            >
              <img src="/EDIT.webp" />
            </button>
            <div className={styles.edit_dosage}>
              <textarea
                rows="5"
                cols="40"
                type="text"
                name="textarea"
                defaultValue="1.Lipitor (atorvastatin) - usually taken once daily with or without food, with dosages ranging from 10mg to 80mg depending on the individual's cholesterol levels and medical history. 2.Zoloft (sertraline) - usually taken once daily with or without food, with dosages ranging from 25mg to 200mg depending on the individual's condition and response to the medication. 3.Flonase (fluticasone) - usually taken once daily, with dosage depending on the individual's age and severity of symptoms. 4.Metformin - usually taken with meals, with dosage depending on the individual's blood sugar levels and medical history."
                required
                readOnly={!isEditable}
              />
            </div>
          </div>
          <div className={styles.rightd_cont}>
            <h3>Ayukumi AI Report</h3>
            <div className={styles.ayukumi_report}>
              1.&nbsp;Lipitor (atorvastatin) - usually taken once daily with or
              without food, with dosages ranging from 10mg to 80mg depending on
              the individual's cholesterol levels and medical history.
              <br /> 2.&nbsp;Zoloft (sertraline) - usually taken once daily with
              or without food, with dosages ranging from 25mg to 200mg depending
              on the individual's condition and response to the medication.
              <br /> 3.&nbsp;Flonase (fluticasone) - usually taken once daily,
              with dosage depending on the individual's age and severity of
              symptoms.
              <br /> 4.&nbsp;Metformin - usually taken with meals, with dosage
              depending on the individual's blood sugar levels and medical
              history.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescription;
