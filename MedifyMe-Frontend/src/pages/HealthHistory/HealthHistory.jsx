import Navbar from "../../components/Navbar/Navbar";
import styles from "./HealthHistory.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchHealthHistoryQuery } from "../../store";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function HealthHistory() {
  const patient = useSelector((state) => {
    return state.patient;
  });

  const {
    data: rawData,
    error: rawError,
    isFetching,
    refetch,
  } = useFetchHealthHistoryQuery(patient.id);

  const data = useMemo(() => rawData, [rawData]);
  const error = useMemo(() => rawError, [rawError]);

  const [selectedVisit, setSelectedVisit] = useState(data?.visits?.[0] ?? null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && selectedVisit === null) {
      setSelectedVisit(data.visits[0]);
    }
  }, [navigate, patient.isLoggedIn, data, selectedVisit]);

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

  let content;

  if (data) {
    content = data.visits.map((visit, index) => {
      return (
        <div
          key={index}
          className={styles.doc2}
          onClick={() => setSelectedVisit(visit)}
        >
          <img src="doc.png" />
          <div>
            <div className={styles.t2}>Doctor</div>
            <div className={styles.t3}>{visit.doctorName}</div>
          </div>
          <div className={styles.date}>&#128197; {visit.date}</div>
        </div>
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className={styles.box}>
        <div className={styles.history}>
          <div className={styles.d1}>
            <img src={data.photo} />
            <ul>
              <li>Name : &nbsp;&nbsp;{data.name}</li>
              <li>Gender : &nbsp;&nbsp;{data.gender}</li>
              <li>Age : &nbsp;&nbsp;{data.age}</li>
            </ul>
            <ul>
              <li>Allergies : &nbsp;&nbsp;{data.allergies}</li>
              <li>Other Conditions : &nbsp;&nbsp;{data.otherConditions}</li>
              <li>Weight : &nbsp;&nbsp;{data.weight} kg</li>
            </ul>
            <ul>
              <li>Medications : &nbsp;&nbsp;{data.medications}</li>
              <li>Height : &nbsp;&nbsp;{data.height} cm</li>
            </ul>
          </div>
          <div className={styles.d2}>
            <ul>
              <li>Overview : &nbsp;&nbsp;{data.overview}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.docvisit}>
        <div className={styles.t1}>Doctors Visits</div>
        <div className={styles.docs}>{content}</div>
      </div>
      <div className={styles.button}>
        <Link to="/healthHistoryForm">
          <div className={styles.b}>Create New Record</div>
        </Link>
      </div>
      {selectedVisit && (
        <div className={styles.infobox}>
          <div className={styles.title}>
            <div className={styles.title1}>{selectedVisit.doctorName}</div>
            <div className={styles.title2}>{selectedVisit.date}</div>
          </div>
          <div className={styles.boxes}>
            <div className={styles.doccomments}>
              <div className={styles.doccommentst}>Doctors Comments</div>
              <div className={styles.comments}>
                {selectedVisit.doctorComments}
              </div>
            </div>
            <div className={styles.doccomments}>
              <div className={styles.doccommentst}>Patient Comments</div>
              <div className={styles.comments}>
                {selectedVisit.patientComments}
              </div>
            </div>
            <div className={styles.uploadedImg}>
              <div className={styles.documentst}>Uploaded Documents</div>
              <div className={styles.centerimgs}>
                <div className={styles.imgGrid}>
                  {selectedVisit.fileUrl.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={image}
                        className={styles.imgThumb}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HealthHistory;
