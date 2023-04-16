const express = require("express");

const homeRouter = require("./home");
const gameRouter = require("./game");
const uploadRouter = require("./upload");

const router = express.Router();

router.use("/", homeRouter);
router.use("/game", gameRouter);
router.use("/upload", uploadRouter);
// app.use("/user", userRouter);

module.exports = router;
