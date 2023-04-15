import Navbar from "../../components/Navbar/Navbar";
import styles from "./Test.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchPrescriptionQuery } from "../../store";
import DocumentPreview from "../../components/DocumentPreview/DocumentPreview";

function Test() {
  const patient = useSelector((state) => {
    return state.patient;
  });
  const navigate = useNavigate();

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
  }, [navigate, patient.isLoggedIn]);

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
        <Link to="/addreports">
          <div className={styles.b}>Create New Record</div>
        </Link>
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
            <div className={styles.date}>&#128197;20Jan 2023</div>
          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Gylnnei</div>
            </div>
            <div className={styles.date}>&#128197;23july 2023</div>
          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Brickee</div>
            </div>
            <div className={styles.date}>&#128197;18feb 2023</div>
          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. Mangle</div>
            </div>
            <div className={styles.date}>&#128197;19Nov 2023</div>
          </div>
          <div className={styles.doc2}>
            <img className={styles.img_size} src="doc.png" />
            <div>
              <div className={styles.t2}>Dentist</div>
              <div className={styles.t3}>Dr. B.Sicke</div>
            </div>
            <div className={styles.date}>&#128197;20Jan 2023</div>
          </div>
        </div>
      </div>

      <div className={styles.currentPres}>
        <div className={styles.ct}>
          <div className={styles.ct1}>Test Report</div>
          <div className={styles.ct2}>20 Jan 2023</div>
        </div>
        <div className={styles.cont}>
          <div className={styles.accordian}>
            <ul>
              <li>
                Amit's normal blood test report indicates a healthy immune
                system and proper organ function.
              </li>
              <li>
                Regular check-ups and blood tests are important for detecting
                potential health issues early on.
              </li>
              <li>
                A balanced diet and exercise routine can help maintain optimal
                blood test results. It's important to consult with a healthcare
                professional to fully understand the implications of blood test
                results.
              </li>
              <li>
                It's important to consult with a healthcare professional to
                fully understand the implications of blood test results.
              </li>
            </ul>
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

export default Test;
