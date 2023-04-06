const express = require("express");
const router = express.Router();
const gpt = require("../controllers/gpt");

router.route("/").get(gpt.renderYo).post(gpt.prompt);
module.exports = router;
