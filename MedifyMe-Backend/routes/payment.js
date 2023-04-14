const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment");

router.route("/create_payment_intent").post(payment.createPayment);

module.exports = router;
