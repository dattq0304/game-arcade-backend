const multer = require("multer");
const path = require("path");

const storagePath = process.env.PATH_TO_STORAGE;

const uploadMiddleware = (folderName) => {
  const uploadStoragePath = path.join(storagePath, folderName);

  const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadStoragePath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  return multer({ storage: uploadStorage });
};

module.exports = uploadMiddleware;
