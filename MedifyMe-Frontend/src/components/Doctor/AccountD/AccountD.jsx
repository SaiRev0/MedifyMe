import styles from "./AccountD.module.css";
import useLogout from "../../../hooks/useLogout";
import { useSelector } from "react-redux";

function AccountD() {
  const { handleLogout } = useLogout();
  const doctor = useSelector((state) => {
    return state.doctor;
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.right_wrapper}>
      <div className={styles.logout}>
        <button onClick={handleLogout} className={styles.logout_link}>
          Logout
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <div className={styles.row}>
          <label className={styles.color1} htmlFor="profile-pic">
            <span>Profile Picture:</span>
            <img src="../../Frame 21.webp" className={styles.profile_img}></img>
            <span className={styles.span}>&nbsp;Upload Image</span>
          </label>
          <input
            className={styles.input_profile}
            type="file"
            id="profile-pic"
            name="profile-pic"
          />
        </div>

        <div className={styles.row}>
          <label className={styles.color} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.input_text}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            defaultValue={doctor.name}
          />
        </div>
        <div className={styles.row_sex_age}>
          <label className={styles.color} htmlFor="gender">
            Gender:
          </label>
          <select
            className={styles.input_text_row_sex}
            id="gender"
            name="gender"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className={styles.color} htmlFor="age">
            Age:
          </label>
          <input
            className={styles.input_text_row_age}
            type="text"
            id="age"
            name="age"
            placeholder="Age"
            required
          />
        </div>

        <div className={styles.row}>
          <label className={styles.color} htmlFor="email">
            Email address:
          </label>
          <input
            className={styles.input_text}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={doctor.email}
            required
          />
        </div>

        <div className={styles.row}>
          <label className={styles.color} htmlFor="mobile">
            Mobile number:
          </label>
          <input
            className={styles.input_text}
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter to Save"
            required
          />
        </div>
        <button className={styles.submit_button} type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default AccountD;
