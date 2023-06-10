const express = require("express");

// const homeRouter = require("./home.route");
const gameRouter = require("./game.route");
const uploadRouter = require("./upload.route");
const userRouter = require("./user.route");
const reviewRouter = require("./review.route");
const commentRouter = require("./comment.route");

const router = express.Router();

// router.use("/", homeRouter);
router.use("/game", gameRouter);
router.use("/upload", uploadRouter);
router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/comment", commentRouter);

module.exports = router;
