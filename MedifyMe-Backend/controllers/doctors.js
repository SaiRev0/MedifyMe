const axios = require("axios");
const Doctor = require("../models/doctor");
const Request = require("../models/request");
const Patient = require("../models/patient");

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
    if (!req.query.id) {
      return res.status(400).json("No doctor id provided");
    }
    const { id } = req.query;
    const foundDoctor = await Doctor.findById(id)
      .populate("patients")
      .populate("requests");
    res.status(200).json(foundDoctor);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong", status: 400 });
  }
};

module.exports.acceptRequest = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json("No Patient Id Found");
    }
    const { id } = req.body;
    const foundRequest = await Request.findById(id);
    if (!foundRequest) {
      return res.status(400).json("No Request Found");
    }
    const foundDoctor = await Doctor.findById(foundRequest.doctor);
    const foundPatient = await Patient.findById(foundRequest.patient);

    if (!foundRequest.isAccepted) {
      const doctorIndex = foundDoctor.requests.indexOf(foundRequest._id);
      foundDoctor.requests.splice(doctorIndex, 1);
      const patientIndex = foundPatient.requests.indexOf(foundRequest._id);
      foundPatient.requests.splice(patientIndex, 1);
      foundDoctor.patients.push(foundPatient._id);
      foundPatient.doctors.push(foundDoctor._id);
      await Request.findByIdAndDelete(id);
      await foundDoctor.save();
      await foundPatient.save();
      return res.status(200).json("Request Accepted");
    } else {
      return res.status(400).json("Already Accepted");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong", status: 400 });
  }
};
