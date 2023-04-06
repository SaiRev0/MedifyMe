// import React from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSelector } from "react-redux";
// const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// import axios from "axios";

// function randomID(len) {
//   let result = "";
//   if (result) return result;
//   var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// async function generateToken(userID) {
//   try {
//     const response = await axios.get(`${SERVER_URL}/room`, {
//       params: {
//         userId: userID,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// function RoomPage() {
//   const patient = useSelector((state) => {
//     return state.patient;
//   });

//   const roomID = randomID(5);
//   const myMeeting = async (element) => {
//     const appId = 575089151;
//     const userID = patient.id;
//     const userName = patient.name;
//     const token = await generateToken(userID);
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//       appId,
//       token,
//       roomID,
//       userID,
//       userName
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: "Personal link",
//           url:
//             window.location.origin +
//             window.location.pathname +
//             "?roomID=" +
//             roomID,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.GroupCall,
//       },
//     });
//   };
//   return (
//     <div>
//       <div ref={myMeeting} />
//     </div>
//   );
// }

// export default RoomPage;
