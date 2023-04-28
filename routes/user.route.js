const express = require("express");
const path = require("path");

const { userController } = require("../src/controllers");

const router = express.Router();

router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

module.exports = router;

