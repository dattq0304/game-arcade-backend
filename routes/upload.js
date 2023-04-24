const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const upload = require("../src/middlewares/upload");
const uploadController = require("../src/controllers/upload");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/upload.html"));
});

router.post("/info", multer().fields([]), uploadController.uploadInfo);

router.post(
  "/source-code/:id",
  upload("source-code").single("source-code"),
  uploadController.uploadSourceCode
);

router.post(
  "/cover-image/:id",
  upload("cover-image").single("cover-image"),
  uploadController.uploadCoverImage
);

module.exports = router;
