const API_AUTH_URL = import.meta.env.VITE_SERVER_URL;
const API_BASE_URL = import.meta.env.VITE_MEET_URL;

export const getToken = async () => {
  if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/meet/get-token`, {
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
