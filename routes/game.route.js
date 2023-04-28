const express = require("express");

const { gameFilesMiddleware } = require('../src/middlewares');
const { gameController } = require('../src/controllers');

const router = express.Router();

router.get("/new", gameController.getNewGames);
router.get("/random", gameController.getRandomGames);
router.get("/category/:category", gameController.getGamesByCategory);
router.get("/creator/:id", gameController.getGamesByCreator);
router.get("/image/:id", gameController.getCoverImage);
router.get(
  "/:id/index.html",
  (req, res, next) => {
    gameFilesMiddleware(req, router);
    next();
  },
  gameController.getRunGameFile
);
router.get("/:id", gameController.getGameInfo);
router.get("/", gameController.getAllGameInfo);

router.put("/:id", gameController.updateGame);

router.delete("/:id", gameController.deleteGameById);

module.exports = router;
