const API_BASE_URL = "https://api.videosdk.live";
// const VIDEOSDK_TOKEN = import.meta.env.VITE_VIDEOSDK_TOKEN;
const API_AUTH_URL = import.meta.env.VITE_SERVER_URL;

export const getToken = async () => {
  if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result ? result.roomId === roomId : false;
};
