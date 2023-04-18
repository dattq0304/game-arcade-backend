const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const multer = require("multer");

const upload = require("../src/middlewares/upload");
const uploadController = require("../src/controllers/upload");

let gameId;

router.post("/info", multer().fields([]), uploadController.uploadInfo);

router.post(
  "/source-code",
  upload("source-code").single("source-code"),
  (req, res) => {
    gameId = new ObjectId().toString();
    uploadController.uploadSourceCode(req, res, gameId);
  }
);

router.post(
  "/cover-image",
  upload("cover-image").single("cover-image"),
  (req, res) => {
    uploadController.uploadCoverImage(req, res, gameId);
  }
);

module.exports = router;
