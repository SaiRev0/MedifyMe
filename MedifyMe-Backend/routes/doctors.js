const express = require("express");
const router = express.Router();
const doctors = require("../controllers/doctors");
const catchAsync = require("../utils/catchAsync");

router.route("/login").post(catchAsync(doctors.dLogin));

module.exports = router;
