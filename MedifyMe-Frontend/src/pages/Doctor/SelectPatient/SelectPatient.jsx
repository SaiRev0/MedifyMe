import styles from "./SelectPatient.module.css";
import NavbarD from "../../../components/Doctor/NavbarD/NavbarD";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFetchPatientsQuery } from "../../../store";
import { useAcceptPatientQuery } from "../../../store";
import Loading from "../../../components/Loading/Loading";
function SelectPatient() {
  const navigate = useNavigate();

  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const { data, error, isFetching } = useFetchPatientsQuery(doctor.id);

  const acceptRequest = (request) => {
    const {
      data: acceptData,
      error: acceptError,
      isFetching: isFetchingAccept,
    } = useAcceptPatientQuery(request._id);
    console.log(acceptData);
    // console.log(request._id);
  };
  const ignoreRequest = (request) => {};

  useEffect(() => {
    if (!doctor.isLoggedIn) {
      navigate("/login");
      toast.error("Please login to continue");
    }
  }, [navigate, doctor.isLoggedIn]);

  if (isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <NavbarD />
      <div className={styles.grid_container}>
        <img
          src="../public/doctor-illustration.svg"
          alt="doctor image"
          className={styles.left_wrapper}
        ></img>
        <div className={styles.right_wrapper}>
          <div className={styles.doctor_history}>
            <p className={styles.doctor_history_content}>Dr. {doctor.name}</p>
          </div>
          <div className={styles.row}>
            <div className={styles.add_doctor_info}>
              <label className={styles.add_text_doctor} htmlFor="email">
                Active Patient:
              </label>
              <select className={styles.add_doctor_name} id="name" name="name">
                <option>Rachael Green</option>
                <option>Chandler Bing</option>
                <option>Ross Geller</option>
                <option>Joey Tribiiani</option>
                <option>Pheobe Buffay</option>
                <option>Monica Geller</option>
              </select>
              <button className={styles.select_btn} type="submit">
                Select
              </button>
            </div>

            <div className={styles.add_patients}>
              <p className={styles.add_patients_p}>Add Patients</p>
              <label className={styles.add_text_doctor} htmlFor="email">
                Patient Id:
              </label>
              <input
                className={styles.add_patient_id}
                type="ID"
                id="ID"
                name="patient_id"
                required
              />
              <button className={styles.submit_btn} type="submit">
                Submit
              </button>
            </div>

            <div className={styles.doctor_history}>
              <p className={styles.add_patients_p}>Patient Requests</p>
            </div>
            <div className={styles.patient_grid}>
              {data.requests.map((request, index) => (
                <div key={index} className={styles.patient}>
                  <p className={styles.patient_name}>
                    &nbsp;&nbsp;&nbsp;{index + 1}. &nbsp;&nbsp;
                    {request.patientName}
                  </p>
                  <p className={styles.friend_requests}>
                    <button
                      onClick={() => ignoreRequest(request)}
                      className={styles.ignorebtn}
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => acceptRequest(request)}
                      className={styles.acceptbtn}
                    >
                      Accept
                    </button>
                  </p>
                </div>
              ))}
              <button className={styles.viewbtn}>View All</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPatient;
