const axios = require("axios");
const Doctor = require("../models/doctor");

module.exports.dLogin = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { googleAccessToken, role } = req.body;
  axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    })
    .then(async (response) => {
      const name = response.data.name;
      const email = response.data.email;
      const photo = response.data.picture;

      const foundDoctor = await Doctor.findOne({ email });
      if (!foundDoctor) {
        const doctor = new Doctor({
          email,
          photo,
          token: googleAccessToken,
          name,
        });
        await doctor.save();
        res.status(212).json({
          status: 212,
          doctor,
        });
      } else {
        res.status(200).json({
          foundDoctor,
          status: 200,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Invalid access token!!!!", status: 400 });
    });
  // }
};
