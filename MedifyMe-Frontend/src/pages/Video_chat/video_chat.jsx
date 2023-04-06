// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
// import styles from "./video_chat.module.css";

// function Video_chat() {
//   const [roomcode, setRoomcode] = useState("");
//   const navigate = useNavigate();
//   const handleformSubmit = (e) => {
//     e.preventDefault();
//     navigate(`/video_chat/${roomcode}`);
//   };
//   return (
//     <>
//       <Navbar />
//       <div className={styles.video}>
//         <form className={styles.form} onSubmit={handleformSubmit}>
//           <div>
//             <label for="name">Enter Room Code</label>
//             <input
//               type="text"
//               id="name"
//               value={roomcode}
//               onChange={(e) => setRoomcode(e.target.value)}
//               placeholder="Enter Room Code"
//               required
//             />
//             <button type="submit">Join Room</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Video_chat;
