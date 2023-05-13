const express = require("express");

const { gameFilesMiddleware, checkToken, authMiddleware, checkAdminMiddleware } = require('../src/middlewares');
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
router.get("/", checkToken, checkAdminMiddleware, gameController.getAllGameInfo);

router.put("/info/:id", gameController.updateGameInfo);
router.put("/source-code/:id", gameController.updateGameFiles);
router.put("/cover-image/:id", gameController.updateGameCoverImage);
router.put('/state', gameController.setGameState);

router.delete("/:id", checkToken, authMiddleware, gameController.deleteGameById);

module.exports = router;
