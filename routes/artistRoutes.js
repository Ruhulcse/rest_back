const express = require("express");
const router = express.Router();
const { uploadFile, getFiles } = require("../controllers/artistController");
const multer = require('multer');
//Multer configuration 
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/upload").post(upload.single('menufile'), uploadFile);
router.get("/getfile", getFiles);

module.exports = router;
