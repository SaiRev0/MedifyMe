const axios = require("axios");
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Visit = require("../models/visit");
const Request = require("../models/request");
const Prescription = require("../models/prescription");
const Test = require("../models/test");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const FormData = require("form-data");

const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadFile = (file, OCR) => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const resourceType = fileExtension === ".pdf" ? "raw" : "image";

    cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: "MedifyMe" },
      async (error, result) => {
        if (error) {
          console.error(`Cloudinary upload failed: ${error.message}`, error);
          return reject(new Error("Cloudinary upload failed"));
        }
        const fileUrl = result.secure_url;

        if (OCR && resourceType === "image") {
          const ocrApiKey = process.env.OCR_API_KEY;
          const formData = new FormData();
          formData.append("url", fileUrl);
          formData.append("OCREngine", 5);
          formData.append("filetype", "PNG");

          const config = {
            headers: {
              apikey: ocrApiKey,
              "Content-Type": "image/png",
            },
          };
          try {
            const response = await axios.post(
              "https://api.ocr.space/parse/image",
              formData,
              config
            );
            const ocrText = response.data.ParsedResults[0].ParsedText;
            const content = `Please analyze the plain text obtained via OCR from an image of a prescription. The text is: ${ocrText} Provide the dosage, precautions, and pointers for each medicine listed. Additionally, include a section on Medicine General Information that highlights the potential condition the combination of medicines may indicate. Finally, offer 2-3 general health suggestions and facts related to the conditions that these medicines may cure. Send the output in HTML format, only using the tags <p>, <h3> <ul> and <li>. Do not use any inverted commas or /n`;
            const { data } = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              temperature: 0.5,
              messages: [{ role: "user", content }],
            });
            const gptResults = data.choices[0].message.content;
            const result = {
              url: fileUrl,
              ocr: gptResults,
            };
            resolve(result);
          } catch (err) {
            console.error(`OCR request failed: ${err.message}`, err);
            reject(new Error("OCR request failed"));
          }
        } else {
          resolve(fileUrl);
        }
      }
    ).end(file.buffer); // Ensure the file buffer is sent here
  });
};




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
module.exports.register = async (req, res) => {
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
    const foundPatient = await Patient.findById(id)
      .populate("visits")
      .populate("doctors");
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
    const { id } = req.body;
    const foundPatient = await Patient.findById(id);
    const fileUrls = [];
    for (const file of req.files) {
      const fileUrl = await uploadFile(file, false);
      fileUrls.push(fileUrl);
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

module.exports.prescription = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json("No patient id provided");
    }
    const { id } = req.query;
    const foundPatient = await Patient.findById(id).populate("prescriptions");
    res.status(200).json(foundPatient);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};

module.exports.prescriptionForm = async (req, res) => {
  

  try {
    if (!req.body.id) {
      console.error("No patient id provided in request");
      return res.status(400).json("No patient id provided");
    }

    if (!req.files || req.files.length === 0) {
      console.error("No files provided in request");
      return res.status(400).json("No files provided");
    }

    const { id } = req.body;
    const foundPatient = await Patient.findById(id);
    if (!foundPatient) {
      return res.status(404).json("Patient not found");
    }

    // Upload files, preserving `url` and `ocr` if present
    const fileResults = await Promise.all(req.files.map(async (file) => {
      const fileData = await uploadFile(file, true); // Set OCR to true if you want OCR data
      return { url: fileData.url, ocr: fileData.ocr || null }; // Ensure each entry is { url, ocr }
    }));

    // Create and save prescription
    const prescription = new Prescription({
      date: req.body.date,
      medications: req.body.medications,
      prescriptionComments: req.body.prescriptionComments,
      patient: id,
      files: fileResults, // Structured as expected by the model
    });

    await prescription.save();

    // Add the new prescription ID to the patient's record
    foundPatient.prescriptions.push(prescription._id.toString());
    await foundPatient.save();

    res.status(200).json(prescription);

  } catch (err) {
    console.error("Error in prescriptionForm:", err);
    res.status(400).json("Something Went Wrong!");
  }
};




module.exports.test = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json("No patient id provided");
    }
    const { id } = req.query;
    const foundPatient = await Patient.findById(id).populate("tests");
    res.status(200).json(foundPatient);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};

module.exports.testForm = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json("No patient id provided");
    }
    const { id } = req.body;
    const foundPatient = await Patient.findById(id);
    const fileResults = [];

    for (const file of req.files) {
      const ocrResult = await uploadFile(file, true);
      fileResults.push(ocrResult);
    }

    const test = new Test({
      date: req.body.date,
      testName: req.body.testName,
      testComments: req.body.testComments,
      patient: id,
      files: fileResults,
    });

    await test.save();
    const testId = test._id.toString();
    foundPatient.tests.push(testId);
    await foundPatient.save();

    res.status(200).json(test);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
  const fileUrls = [];

  for (const file of req.files) {
    await uploadFile(file, fileUrls);
  }
};

module.exports.visits = async (req, res) => {
  try {
    const { id } = req.query;
    const visit = await Visit.findById(id);
    res.status(200).json(visit);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};

module.exports.requestDoctor = async (req, res) => {
  try {
    if (!req.body.id) {
      return res
        .status(212)
        .json({ message: "No patient id provided", status: 212 });
    }
    const { id } = req.body;
    const foundPatient = await Patient.findById(id).populate("requests");
    const email = req.body.doctorEmail;
    const foundDoctor = await Doctor.findOne({ email });
    if (!foundDoctor) {
      return res.status(212).json({ message: "Doctor Not Found", status: 212 });
    }
    const alreadyRequested = foundPatient.requests.some((request) => {
      return request.doctor.toString() === foundDoctor._id.toString();
    });
    if (alreadyRequested) {
      return res
        .status(212)
        .json({ message: "Already Requested", status: 212 });
    }
    if (foundDoctor.patients.includes(id)) {
      return res
        .status(212)
        .json({ message: "Already a Patient", status: 212 });
    }
    const request = new Request({
      patient: id,
      doctor: foundDoctor._id,
      patientName: foundPatient.name,
    });

    await request.save();
    const requestId = request._id;

    foundPatient.requests.push(requestId);
    await foundPatient.save();
    foundDoctor.requests.push(requestId);
    await foundDoctor.save();

    res.status(200).json({ request, status: 200 });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong!");
  }
};
