const axios = require("axios");
const Patient = require("../models/patient");
const Visit = require("../models/visit");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let projectId = "our-forest-380314"; // Get this from Google Cloud
let keyFilename = "medifyme.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("medifyme-storage"); // Get this from Google Cloud -> Storage

// React Login
module.exports.login = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { googleAccessToken, role } = req.body;
  axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    })
    .then(async (response) => {
      const email = response.data.email;
      const photo = response.data.picture;

      const foundPatient = await Patient.findOne({ email });
      if (!foundPatient) {
        res.status(212).json({
          status: 212,
          email,
          photo,
          token: googleAccessToken,
          role,
        });
      } else {
        res.status(200).json({
          foundPatient,
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

//React Register
module.exports.register = async (req, res, next) => {
  try {
    const name = req.body.data.name;
    const email = req.body.data.email;
    const photo = req.body.data.photo;
    const age = req.body.data.age;
    const gender = req.body.data.gender;
    const height = req.body.data.height;
    const weight = req.body.data.weight;
    const allergies = req.body.data.allergies;
    const otherConditions = req.body.data.otherConditions;
    const medications = req.body.data.medications;
    const overview = req.body.data.overview;
    const token = req.body.data.token;

    if (
      !age &&
      !gender &&
      !height &&
      !weight &&
      !allergies &&
      !photo &&
      !name &&
      !email &&
      !otherConditions &&
      !medications &&
      !overview &&
      !token
    ) {
      res.status(400).json({ message: "Something Went Wrong", status: 400 });
    } else {
      const patient = new Patient({
        token,
        name,
        email,
        age,
        photo,
        gender,
        height,
        weight,
        allergies,
        otherConditions,
        medications,
        overview,
      });
      await patient.save();
      res
        .status(200)
        .json({ message: "Registered Successfully", patient, status: 200 });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong", status: 400 });
  }
};

module.exports.healthHistory = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json("No patient id provided");
    }
    const { id } = req.query;
    const foundPatient = await Patient.findById(id).populate("visits");
    res.status(200).json(foundPatient);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};

module.exports.healthHistoryForm = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json("No patient id provided");
    }

    const { id } = req.query;
    const foundPatient = await Patient.findById(id);

    const fileUrls = [];

    for (const file of req.files) {
      const extension = path.extname(file.originalname);
      const newName = `${path.basename(
        file.originalname,
        extension
      )}-${uuidv4()}${extension}`;
      file.originalname = newName;

      const blob = bucket.file(newName);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        console.log(`File ${newName} uploaded successfully`);
      });
      blobStream.end(file.buffer);

      fileUrls.push(`https://storage.googleapis.com/${bucket.name}/${newName}`);
    }

    const visit = new Visit({
      date: req.body.date,
      doctorComments: req.body.doctorComments,
      patientComments: req.body.patientComments,
      doctorName: req.body.doctorName,
      patient: id,
      fileUrl: fileUrls,
    });

    await visit.save();
    const visitId = visit._id.toString();
    foundPatient.visits.push(visitId);
    await foundPatient.save();

    res.status(200).json(visit);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};

module.exports.visits = async (req, res) => {
  try {
    const { id } = req.query;
    const visit = await Visit.findById(id);
    // console.log(visit);
    res.status(200).json(visit);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};
