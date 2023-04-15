import Navbar from "../../components/Navbar/Navbar";
import styles from "./Prescription.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchPrescriptionQuery } from "../../store";
import Loading from "../../components/Loading/Loading";
import DocumentPreview from "../../components/DocumentPreview/DocumentPreview";

function Prescription() {
  const navigate = useNavigate();

  const patient = useSelector((state) => {
    return state.patient;
  });

  const {
    data: rawData,
    error: rawError,
    isFetching,
    refetch,
  } = useFetchPrescriptionQuery(patient.id);

  const data = useMemo(() => rawData, [rawData]);
  const error = useMemo(() => rawError, [rawError]);

  const [selectedPrescription, setSelectedPrescription] = useState(
    data?.prescriptions?.[0] ?? null
  );

  useEffect(() => {
    if (data && selectedPrescription === null) {
      setSelectedPrescription(data.prescriptions[0]);
    }
  }, [data, selectedPrescription]);

  useEffect(() => {
    if (!patient.isLoggedIn) {
      navigate("/login");
      toast.error("Please login to continue");
    }
    refetch();
  }, [navigate, patient.isLoggedIn]);

  if (isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.PreH}>
        <div className={styles.t1}>Prescription History</div>
        <div className={styles.docs}>
          {data &&
            data.prescriptions &&
            data.prescriptions.map((prescription, index) => (
              <div
                className={
                  selectedPrescription !== prescription
                    ? styles.doc1
                    : styles.selected
                }
                key={index}
                onClick={() => setSelectedPrescription(prescription)}
              >
                <div className={styles.date}>{prescription.date}</div>
              </div>
            ))}
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
        <div className={styles.cont}>
          <div className={styles.leftcont}>
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
            <li>
              Lipitor (atorvastatin) - usually taken once daily with or without
              food, with dosages ranging from 10mg to 80mg depending on the
              individual's cholesterol levels and medical history.
            </li>
          </ol>
          </div>
          <div className={styles.photo}>
            <div className={styles.uploadedImg}>
              <div className={styles.documentst}>Uploaded Documents</div>
              <div className={styles.centerimgs}>
                <div className={styles.imgGrid}>
                  {selectedPrescription &&
                    selectedPrescription.files.map((eachFile, index) => (
                      <div key={index}>
                        <DocumentPreview fileUrl={eachFile.url} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescription;
