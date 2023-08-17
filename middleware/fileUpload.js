const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = __dirname + "/../public/files/";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, "menu" + "." + file.mimetype.split("/")[1]);
  },
});

module.exports.upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 200,
    fileSize: 1024 * 1024 * 150,
  },
}).single("menufile");
