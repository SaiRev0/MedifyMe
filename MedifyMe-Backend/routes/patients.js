const express = require("express");
const router = express.Router();
const patients = require("../controllers/patients");
const catchAsync = require("../utils/catchAsync");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // No larger than 50mb, change as you need
  },
});

router.route("/login").post(catchAsync(patients.login));
router.route("/register").post(catchAsync(patients.register));
router
  .route("/health_history")
  .get(patients.healthHistory)
  .post(multer.array("files"), patients.healthHistoryForm);

router.route("/visits").get(patients.visits);

module.exports = router;
