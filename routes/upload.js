const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const upload = require("../src/middlewares/upload");
const controller = require("../src/controllers");

let gameId;

router.post(
  "/source-code",
  upload("source-code").single("source-code"),
  (req, res) => {
    gameId = new ObjectId().toString();
    controller.uploadSourceCode(req, res, gameId);
  }
);

router.post(
  "/cover-image",
  upload("cover-image").single("cover-image"),
  (req, res) => {
    controller.uploadCoverImage(req, res, gameId);
  }
);

module.exports = router;
