const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/artistController");
const { upload } = require("../middleware/fileUpload");
router.route("/upload").post(upload, uploadFile);

module.exports = router;
