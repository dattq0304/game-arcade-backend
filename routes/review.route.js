const express = require("express");
const path = require("path");

const { checkToken } = require("../src/middlewares");
const { reviewController } = require("../src/controllers");

const router = express.Router();

router.get('/:id', reviewController.getReviews);

router.post('/:id', checkToken, reviewController.postReview);

module.exports = router;