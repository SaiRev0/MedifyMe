const express = require("express");
const router = express.Router();
const meet = require("../controllers/meet");

router.route("/get_token").get(meet.getToken);
router.route("/create_meeting").post(meet.createMeeting);

module.exports = router;
