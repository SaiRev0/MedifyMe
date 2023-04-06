import styles from "./Register.module.css";
import useChatGPT from "../../hooks/useChatGPT";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../store";
import { useCookies } from "react-cookie";
import { loginSuccess, logoutSuccess } from "../../store";
import registerData from "../../assets/RegisterData.json";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, handleSend } = useChatGPT({
    InitialMessage: registerData.InitialMessage,
    content: registerData.content,
  });
  const [register, registerResults] = useRegisterMutation();
  const [cookies, setCookie] = useCookies(["patient"]);
  const lastElement = messages[messages.length - 1];

  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  const patient = useSelector((state) => {
    return state.patient;
  });

  useEffect(() => {
    messageListRef.current.lastChild.scrollIntoView();
    inputRef.current.focus();

    if (lastElement.message.includes("{")) {
      const reqMsg = lastElement.message;
      let init = reqMsg.indexOf("{");
      let fin = reqMsg.indexOf("}");
      let json = reqMsg.substr(init, fin - init + 1);
      const jsonObject = JSON.parse(json);
      messages.pop();

      async function doRegister() {
        let finalData = {
          name: jsonObject.name,
          email: cookies.patient.email,
          photo: cookies.patient.photo,
          age: jsonObject.age,
          gender: jsonObject.gender,
          height: jsonObject.height,
          weight: jsonObject.weight,
          allergies: jsonObject.allergies,
          otherConditions: jsonObject.otherConditions,
          medications: jsonObject.medications,
          overview: jsonObject.overview,
          token: cookies.patient.token,
        };
        try {
          const { data } = await register(finalData);

          dispatch(
            loginSuccess({
              token: data.patient.token,
              id: data.patient._id,
              email: data.patient.email,
              photo: data.patient.photo,
              role: "patient",
              name: data.patient.name,
              age: data.patient.age,
              gender: data.patient.gender,
              height: data.patient.height,
              weight: data.patient.weight,
              allergies: data.patient.allergies,
              otherConditions: data.patient.otherConditions,
              medications: data.patient.medications,
              overview: data.patient.overview,
            })
          );
          setCookie(
            role,
            {
              token: data.patient.token,
              id: data.patient._id,
              email: data.patient.email,
              photo: data.patient.photo,
              role: "patient",
              name: data.patient.name,
              age: data.patient.age,
              gender: data.patient.gender,
              height: data.patient.height,
              weight: data.patient.weight,
              allergies: data.patient.allergies,
              otherConditions: data.patient.otherConditions,
              medications: data.patient.medications,
              overview: data.patient.overview,
            },
            { path: "/", sameSite: "strict" }
          );
        } catch (error) {
          console.error(error);
        }
      }

      doRegister();
    }

    if (!patient.isLoggedIn) {
      navigate("/login");
    }
    if (
      patient.isLoggedIn &&
      registerResults.data &&
      registerResults.data.status === 200
    ) {
      navigate("/");
      toast.success("Welcome");
    }

    if (
      patient.isLoggedIn &&
      registerResults.data &&
      registerResults.data.status === 400
    ) {
      navigate("/login");
      toast.warn(registerResults.data.message);
    }
  }, [navigate, registerResults.data, patient.isLoggedIn, messages]);

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    handleSend(inputValue);
    inputRef.current.value = "";
  };

  return (
    <div className={styles.chatContainer}>
      <Navbar />
      <div className={styles.title}>Tell us about yourself</div>
      <div className={styles.messageList} ref={messageListRef}>
        {messages.map((message, i) => (
          <div
            key={i}
            className={`${
              message.sender === "ChatGPT" ? styles.incoming : styles.outgoing
            }`}
          >
            <div className={styles.messageText}>{message.message}</div>
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          placeholder="Enter your message here"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend(e.target.value);
              e.target.value = "";
            }
          }}
          ref={inputRef}
        />
        <button onClick={handleButtonClick} className={styles.button}>
          <img src="image8.svg" />
        </button>
      </div>
    </div>
  );
}

export default Register;
