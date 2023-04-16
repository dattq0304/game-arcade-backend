const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const storagePath = process.env.PATH_TO_STORAGE;
const sourceCodeStoragePath = path.join(storagePath, "source-code");

router.get("/:gameId/index.html", (req, res) => {
  const gameId = req.params.gameId;
  const gameFilePath = path.join(sourceCodeStoragePath, gameId, "index.html");

  if (fs.existsSync(gameFilePath)) {
    router.use(
      `/${gameId}`,
      express.static(path.join(sourceCodeStoragePath, gameId), { index: false })
    );
    res.sendFile(gameFilePath);
  } else {
    res.status(404).send("Game not found");
  }
});

module.exports = router;
