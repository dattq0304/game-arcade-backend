const express = require("express");
const path = require("path");

const { userController } = require("../src/controllers");

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});
router.post('/login', userController.login);
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});
router.post('/register', userController.register);
router.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/logout.html"));
})
router.post('/logout', userController.logout);


router.get('/', userController.getUser);

module.exports = router;

