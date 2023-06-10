const { CommentModel } = require("../models");

const getGameComments = (req, res) => {
  try {
    CommentModel.find({ game_id: req.params.id })
      .then((comment) => {
        res.status(200).send(comment);
      })
  } catch (err) {
    res.status(500).send(err);
  }
};

const postComment = (req, res) => {
  try {
    const gameId = req.params.id;
    const userId = req.userId;
    const content = req.body.content;

    CommentModel.create({
      game_id: gameId,
      user_id: userId,
      create_date: new Date().toISOString(),
      content: content
    })
      .then((data) => {
        res.status(200).send(data);
      })
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteComment = (req, res) => {
  const id = req.params.id;
  try {
    CommentModel.findByIdAndDelete(id)
      .then((data) => {
        res.status(200).send(data);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getGameComments,
  postComment,
  deleteComment
}