import styles from "./Chatbot.module.css";
import Navbar from "../Navbar/Navbar";
import useChatGPT from "../../hooks/useChatGPT";

function Chatbot() {
  const { messages, handleSend } = useChatGPT();
  return (
    <div className={styles.chatContainer}>
      <Navbar />
      <div className={styles.messageList}>
        {messages.map((message, i) => (
          <div
            key={i}
            className={`${styles.message} ${
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
          placeholder="Type your message here"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={() => handleSend(document.querySelector("input").value)}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
