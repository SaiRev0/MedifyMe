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

module.exports.getPatient = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json("No doctor id provided");
    }
    const { id } = req.body;
    const foundDoctor = await Doctor.findById(id)
      .populate("patients")
      .populate("requests");
    res.status(200).json(foundDoctor);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong", status: 400 });
  }
};
