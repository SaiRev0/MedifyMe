import { useState } from "react";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function useChatGPT({ content, InitialMessage }) {
  const systemMessage = {
    role: "system",
    content: content,
  };

  const [messages, setMessages] = useState([
    {
      message: InitialMessage,
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    // Call backend API instead of OpenAI API
    const backendResponse = await fetch(`${SERVER_URL}/gpt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await backendResponse.json();

    setMessages([
      ...chatMessages,
      {
        message: data.choices[0].message.content,
        sender: "ChatGPT",
      },
    ]);
  }

  return { messages, handleSend };
}

export default useChatGPT;
