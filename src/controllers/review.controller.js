const { ReviewModel } = require("../models");

const getReviews = (req, res) => {
  try {
    ReviewModel.find({ game_id: req.params.id }).sort({ date: -1 })
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
    const existingReview = await ReviewModel.findOne({
      game_id: gameId,
      user_id: userId
    });
    if (existingReview) {
      const data = await ReviewModel.findOneAndUpdate({
        game_id: gameId,
        user_id: userId
      }, {
        star: req.body.star,
        content: req.body.content,
        date: new Date().toISOString(),
      });
      res.status(200).send({
        data: data,
        type: "update"
      });
    } else {
      const data = await ReviewModel.create({
        game_id: gameId,
        user_id: userId,
        star: req.body.star,
        content: req.body.content,
        date: new Date().toISOString(),
      });
      res.status(200).send({
        data: data,
        type: "create"
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteReview = async (req, res) => {
  try {
    const gameId = req.params.id;
    const userId = req.userId;
    console.log(userId, gameId);
    const result = await ReviewModel.findOneAndDelete({
      user_id: userId,
      game_id: gameId
    });
    console.log(result);
    res.status(200).send("Delete suscces");
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTopRated = async (req, res) => {
  try {
    const result = await ReviewModel.aggregate([
      { $match: { star: { $exists: true }, content: { $ne: null } } },
      {
        $group: {
          _id: "$game_id",
          totalStars: { $sum: "$star" },
          totalReviews: { $sum: 1 },
        },
      },
      { $match: { totalReviews: { $gt: 0 } } },
      {
        $addFields: {
          avgStar: { $divide: ["$totalStars", "$totalReviews"] },
        },
      },
      { $sort: { avgStar: -1 } },
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getReviews,
  postReview,
  getTopRated,
  deleteReview
};