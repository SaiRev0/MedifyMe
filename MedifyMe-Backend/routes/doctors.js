const express = require("express");
const router = express.Router();
const doctors = require("../controllers/doctors");
const catchAsync = require("../utils/catchAsync");

router.route("/login").post(catchAsync(doctors.dLogin));

router.route("/patients").get(doctors.getPatient);

module.exports = router;
