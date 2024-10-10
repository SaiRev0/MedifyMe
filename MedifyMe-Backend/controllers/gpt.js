const axios = require("axios");

module.exports.chatGPT = async (req, res) => {
  const { messages } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching chat completions:", error);
    res.status(500).json({ error: "Failed to fetch chat completions" });
  }
};
