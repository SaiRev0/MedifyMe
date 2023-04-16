import styles from "./SelectPatient.module.css";
import NavbarD from "../../../components/Doctor/NavbarD/NavbarD";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFetchPatientsQuery } from "../../../store";
import { useAcceptPatientsMutation } from "../../../store";
import Loading from "../../../components/Loading/Loading";
import { useCookies } from "react-cookie";
function SelectPatient() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["doctor"]);

  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const { data, error, isFetching, refetch } = useFetchPatientsQuery(doctor.id);
  const [accept, acceptResults] = useAcceptPatientsMutation();

  const acceptRequest = async (request) => {
    await accept({ id: request._id });
    if (!acceptResults.error && !acceptResults.isFetching) {
      refetch();
    }
  };
  const ignoreRequest = (request) => {};

  const selectPatientHandler = (e) => {
    e.preventDefault();
    const patientID = e.target.patient.value;
    if (patientID !== "") {
      setCookie(
        "doctor",
        { selectedPatient: patientID },
        { path: "/", sameSite: "strict" }
      );
      navigate("/doctor/patient_health_history");
      toast.success("Patient selected");
    } else if (patientID === "") {
      toast.error("Please select a patient");
    }
  };

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <NavbarD />
      <div className={styles.grid_container}>
        <img
          src="../doctor-illustration.webp"
          alt="doctor image"
          className={styles.left_wrapper}
        ></img>
        <div className={styles.right_wrapper}>
          <div className={styles.doctor_history}>
            <p className={styles.doctor_history_content}>Dr. {doctor.name}</p>
          </div>
          <div className={styles.row}>
            <form
              onSubmit={selectPatientHandler}
              className={styles.add_doctor_info}
            >
              <label className={styles.add_text_doctor} htmlFor="patient">
                Active Patient:
              </label>
              <select
                className={styles.add_doctor_name}
                id="patient"
                name="patient"
                defaultValue={cookies.doctor?.selectedPatient}
              >
                <option value="">Please Select a Patient</option>
                {data.patients.map((patient, index) => (
                  <option key={index} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              <button className={styles.select_btn} type="submit">
                Select
              </button>
            </form>

            <div className={styles.add_patients}>
              <p className={styles.add_patients_p}>Add Patients</p>
              <label className={styles.add_text_doctor} htmlFor="email">
                Patient Email:
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
              {data.requests.length > 0 ? (
                data.requests.slice(0, 4).map((request, index) => (
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
                ))
              ) : (
                <p className={styles.no_requests}>No Pending Request</p>
              )}
              {data.requests.length > 4 && (
                <button className={styles.viewbtn}>View All</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPatient;
