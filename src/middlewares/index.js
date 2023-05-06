const checkToken = require('./checkToken.middleware');
const authMiddleware = require("./auth.middleware");
const checkAdminMiddleware = require("./checkAdmin.middleware");
const gameFilesMiddleware = require("./gameFiles.middleware");
const uploadMiddleware = require("./upload.middleware");

module.exports = {
  checkToken,
  authMiddleware,
  checkAdminMiddleware,
  gameFilesMiddleware,
  uploadMiddleware,
};
