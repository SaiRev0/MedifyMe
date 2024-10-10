const express = require("express");
const router = express.Router();
const gpt = require("../controllers/gpt");

router.route("/").post(gpt.chatGPT);
module.exports = router;
