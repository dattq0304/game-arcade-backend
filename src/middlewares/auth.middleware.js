const { GameModel } = require("../models");
const { UserModel } = require('../models');

const getUser = async (id) => {
  const projection = { password: 0 };
  try {
    const data = await UserModel.findById(id, projection);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getGameInfo = async (id) => {
  try {
    const data = await GameModel.findById(id);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const auth = async (req, res, next) => {
  const user = await getUser(req.userId);
  const game = await getGameInfo(req.params.id);

  if (game.creator_id === user._id || user.role === 'admin') {
    next();
  }
  else return res.status(401).send('Not available!');
};

module.exports = auth;