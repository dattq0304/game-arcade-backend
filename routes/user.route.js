const express = require("express");
const path = require("path");

const { userController } = require("../src/controllers");
const { checkToken, authMiddleware, checkAdminMiddleware } = require("../src/middlewares");

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

router.get('/auth', checkToken, (req, res) => {
  res.status(200).send(req.userId);
})

router.get('/image/:q', userController.getUserProfileImage);
router.put('/image/:id', checkToken, userController.changeUserProfileImage);

// authMiddleware
router.put('/update/username', userController.updateUsername);
router.put('/update/email', userController.updateEmail);
router.put('/update/password', userController.updatePassword);

router.get('/all', checkToken, checkAdminMiddleware, userController.getAllUsers);

router.get('/', userController.getUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;

