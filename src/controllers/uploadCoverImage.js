const fs = require("fs");

const uploadCoverImage = async (req, res, gameId) => {
  try {
    const image = req.file;
    const currentPath = image.path;

    const oldName = image.originalname.split(".")[0];
    const newPath = currentPath.replace(oldName, gameId);

    await fs.promises.rename(currentPath, newPath);

    res.status(200).send("Upload cover image successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while upload cover image!");
  }
};

module.exports = uploadCoverImage;
