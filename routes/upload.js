const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const multer = require("multer");

const upload = require("../src/middlewares/upload");
const uploadController = require("../src/controllers/upload");

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
