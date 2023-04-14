const jwt = require("jsonwebtoken");

module.exports.getToken = async (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "10m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"],
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
};
