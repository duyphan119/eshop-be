const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/imgs");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      (new Date().getTime() + "_" + file.originalname).split(" ").join("")
    );
  },
});
const upload = multer({ storage });

module.exports = upload;
