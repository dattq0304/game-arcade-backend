const express = require("express");
const multer = require("multer");
const path = require("path");

const { uploadMiddleware } = require("../src/middlewares");
const { uploadController } = require("../src/controllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/upload.html"));
});

router.post("/info", multer().fields([]), uploadController.uploadInfo);

router.post(
  "/source-code/:id",
  uploadMiddleware("source-code").single("source-code"),
  uploadController.uploadSourceCode
);

router.post(
  "/cover-image/:id",
  uploadMiddleware("cover-image").single("cover-image"),
  uploadController.uploadCoverImage
);

module.exports = router;
