const express = require("express");
const router = express.Router();
const { mailSent } = require("../controllers/artistController");
router.route("/mail_sent").post(mailSent);

module.exports = router;
