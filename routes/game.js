const express = require("express");
const router = express.Router();

const gameFilesStatic = require("../src/middlewares/gameFilesStatic");
const gameController = require("../src/controllers/game");

router.get("/new", gameController.getNewGames);
router.get("/random", gameController.getRandomGames);
router.get("/category/:category", gameController.getGamesByCategory);
router.get("/creator/:id", gameController.getGamesByCreator);
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
