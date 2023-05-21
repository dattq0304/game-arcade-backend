const { ReviewModel } = require("../models");

const getReviews = (req, res) => {
  try {
    ReviewModel.find({ game_id: req.params.id })
      .then((review) => {
        res.status(200).send(review);
      })
  } catch (err) {
    res.status(500).send(err);
  }
};

const postReview = async (req, res) => {
  try {
    const gameId = req.params.id;
    const userId = req.userId;
    if (req.query.like === 'null') {
      ReviewModel.findOneAndDelete({
        game_id: gameId,
        user_id: userId
      })
        .then(data => {
          res.status(200).send(data);
        })
    }
    else {
      let data;
      const existingReview = await ReviewModel.findOne({
        game_id: gameId,
        user_id: userId
      });
      if (existingReview) {
        data = await ReviewModel.findOneAndUpdate({
          game_id: gameId,
          user_id: userId
        }, {
          like: req.query.like === 'true' ? true : false,
          date: new Date().toISOString(),
        })
      } else {
        data = await ReviewModel.create({
          game_id: gameId,
          user_id: userId,
          like: req.query.like === 'true' ? true : false,
          date: new Date().toISOString(),
        })
      }
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getReviews,
  postReview
};