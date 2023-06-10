const express = require("express");
const path = require("path");

const { checkToken, authMiddleware } = require("../src/middlewares");
const { commentController } = require("../src/controllers");

const router = express.Router();

router.get('/:id', commentController.getGameComments);
router.post('/:id', checkToken, commentController.postComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;