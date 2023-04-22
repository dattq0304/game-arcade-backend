const express = require("express");
const router = express.Router();

const gameFilesStatic = require("../src/middlewares/gameFilesStatic");
const gameController = require("../src/controllers/game");

router.get(
  "/:id/index.html",
  (req, res, next) => {
    gameFilesStatic(req, router);
    next();
  },
  gameController.getRunGameFile
);
router.get("/:id", gameController.getGameInfo);
router.get("/", gameController.getAllGameInfo);

router.put("/:id", gameController.updateGame);

router.delete("/:id", gameController.deleteGameById);

module.exports = router;
