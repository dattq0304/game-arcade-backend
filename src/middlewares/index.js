const uploadMiddleware = require("./upload.middleware");
const authMiddleware = require("./auth.middleware");
const gameFilesMiddleware = require("./gameFiles.middleware");

module.exports = {
  uploadMiddleware,
  authMiddleware,
  gameFilesMiddleware
};
