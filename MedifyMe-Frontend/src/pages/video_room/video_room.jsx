import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./video_room.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { getToken, createMeeting } from "../../api";
import ReactPlayer from "react-player";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={props.participantId}>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"200px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const [clicked, setClicked] = useState(false);
  const [webcam, setWebcam] = useState(false);
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const handleClick = () => {
    toggleMic();
    setClicked(!clicked);
  };

  const handleWebcam = () => {
    toggleWebcam();
    setWebcam(!webcam);
  };

  return (
    <div className={styles.buttons}>
      <button onClick={() => leave()} className={styles.leavebutton}>
        <img src="/hangup.webp" className={styles.leaveimg} />
      </button>
      <button
        className={`${styles.myButton} ${
          clicked ? styles.clicked : styles.default
        }`}
        onClick={handleClick}
      >
        <img
          src={`${clicked ? "/micoff.webp" : "/micon.webp"}`}
          className={styles.webimg}
        />
      </button>
      <button
        onClick={handleWebcam}
        className={`${styles.webbutton} ${
          clicked ? styles.clickedweb : styles.defaultweb
        }`}
      >
        <img
          src={`${webcam ? "/webcamoff.webp" : "/webcam.webp"}`}
          className={styles.webimg}
        />
      </button>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <div>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [token, setToken] = useState(null);

  const getMeetingAndToken = async (id) => {
    const token = await getToken();
    setToken(token);
    const meetingId = id == null ? await createMeeting({ token }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Medifyme",
      }}
      token={token}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

function video_room() {
  return (
    <>
      <Navbar />
      <div className={styles.grid_container}>
        <div className={styles.left_wrapper}>
          <div className={styles.t1}>History</div>
          <div className={styles.docs}>
            <div className={styles.doc1}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
          </div>
          <div className={styles.button}>
            <a href="">
              <div className={styles.b}>Create New Record</div>
            </a>
          </div>
          <div className={styles.t1}>Doctors Suggestions</div>
          <div className={styles.docsu}>
            <div className={styles.doc1}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
            <div className={styles.doc2}>
              <img src="doc.webp" />
              <div>
                <div className={styles.t2}>Dentist</div>
                <div className={styles.t3}>Dr. Roman Reigns</div>
              </div>
              <div className={styles.date}>&#128197; 20Jan 2023</div>
            </div>
          </div>
        </div>
        <div className={styles.right_wrapper}>
          <App />
        </div>
      </div>
    </>
  );
}

export default video_room;
