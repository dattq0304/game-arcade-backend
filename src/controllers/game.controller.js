const path = require("path");
const fs = require("fs");

const { GameModel } = require("../models");

const storagePath = process.env.PATH_TO_STORAGE;
const sourceCodeStoragePath = path.join(storagePath, "source-code");
const coverImageStoragePath = path.join(storagePath, "cover-image");

// Get game info
const getGameInfo = (req, res) => {
  try {
    const id = req.params.id;

    GameModel.findById(id)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get all game info
const getAllGameInfo = (req, res) => {
  try {
    GameModel.find({})
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Set game state to active
const setGameState = async (req, res) => {
  try {
    const id = req.query.id;
    const active = req.query.active === 'true' ? true : false;

    GameModel.findByIdAndUpdate(id, {
      active: active
    })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get new games
const getNewGames = async (req, res) => {
  try {
    const size = req.query.size ? parseInt(req.query.size) : undefined;

    GameModel.find({ active: true })
      .sort({ create_date: -1 })
      .limit(size ? size : 10)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get random games
const getRandomGames = async (req, res) => {
  try {
    const size = req.query.size ? parseInt(req.query.size) : undefined;

    const games = await GameModel.aggregate([{ $match: { active: true } }, { $sample: { size: size || 10 } }]);
    res.status(200).send(games);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get games by category
const getGamesByCategory = async (req, res) => {
  try {
    const size = req.query.size ? parseInt(req.query.size) : undefined;

    const category = req.params.category;
    GameModel.find({ category: category, active: true })
      .sort({ create_date: -1 })
      .limit(size ? size : 10)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get games uploaded by creator_id
const getGamesByCreator = async (req, res) => {
  try {
    const id = req.params.id;
    GameModel.find({ creator_id: id })
      .sort({ create_date: -1 })
      .limit(50)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get cover image
const getCoverImage = (req, res) => {
  try {
    const id = req.params.id;
    const imageExtensions = ["jpg", "png", "jpeg"];
    imageExtensions.forEach((ext) => {
      const imagePath = path.join(coverImageStoragePath, id + "." + ext);
      if (fs.existsSync(imagePath)) {
        res.status(200).sendFile(imagePath);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get run game file
const getRunGameFile = (req, res) => {
  const id = req.params.id;
  const gameFilePath = path.join(sourceCodeStoragePath, id, "index.html");

  if (fs.existsSync(gameFilePath)) {
    res.status(200).sendFile(gameFilePath);
  } else {
    res.status(404).send("Game not found");
  }
};

// Delete game by id
const deleteGameById = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await GameModel.findByIdAndRemove(id);
    deleteCoverImage(response._id.toString());
    if (response.type === "HTML5") {
      deleteSourceCode(response._id.toString());
    }

    res.status(200).send("Succesful delete game");
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteCoverImage = (id) => {
  try {
    const imageExtensions = ["jpg", "png", "jpeg"];
    imageExtensions.forEach((ext) => {
      const imagePath = path.join(coverImageStoragePath, id + "." + ext);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => { });
      }
    });
  } catch (err) {
    console.log("Can not delete image", err);
  }
};

const deleteSourceCode = (id) => {
  try {
    fs.rmSync(path.join(sourceCodeStoragePath, id), {
      recursive: true,
      force: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update game
const updateGameInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const newGame = req.body;
    const oldGame = await GameModel.findById(id);
    const response = await GameModel.findByIdAndUpdate(id, {
      name: newGame.name,
      category: newGame.category,
      description: newGame.description,
      control: newGame.control,
      modified_date: new Date().toISOString(),
      type: newGame.type,
      path: newGame.type === "Iframe link" ? newGame.link : "",
    });

    // deleteCoverImage(id);
    // if (oldGame.type === "HTML5") {
    //   deleteSourceCode(id);
    // }

    res.status(200).send("Update info successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateGameFiles = async (req, res) => {
  try {
    const id = req.params.id;
    deleteSourceCode(id);

    res.status(200).send("Delete files successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateGameCoverImage = async (req, res) => {
  try {
    const id = req.params.id;
    deleteCoverImage(id);

    res.status(200).send("Delete coverimages successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getGameInfo,
  getAllGameInfo,
  getNewGames,
  getRandomGames,
  setGameState,
  getGamesByCategory,
  getGamesByCreator,
  getRunGameFile,
  getCoverImage,
  deleteGameById,
  updateGameInfo,
  updateGameFiles,
  updateGameCoverImage,
};
