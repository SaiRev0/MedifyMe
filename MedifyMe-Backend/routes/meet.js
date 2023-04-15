const express = require("express");
const router = express.Router();
const meet = require("../controllers/meet");

router.route("/get_token").get(meet.getToken);

module.exports = router;
