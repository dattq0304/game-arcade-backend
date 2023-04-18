const JSZip = require("jszip");
const fs = require("fs");
const unzipper = require("unzipper");
const path = require("path");

const GameSchema = require("../models/game");

const port = process.env.PORT;
const storagePath = process.env.PATH_TO_STORAGE;
const sourceCodeStoragePath = path.join(storagePath, "source-code");

// Upload the info
const uploadInfo = (req, res) => {
  try {
    console.log(req.body.name);
    console.log(req.body.category);
    console.log(req.body.description);
    console.log(req.body.control);

    GameSchema.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      control: req.body.control,
      creator_id: "643ba6009bc9f67e3bef8dc3",
      active: false,
      create_date: new Date().toISOString(),
      modified_date: new Date().toISOString(),
      type: "HTML5",
      path: "",
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => {
        res.status(500).json("Error creating game");
      });

    res.status(200).send("Upload info successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Upload info failed!");
  }
};

// Upload the source code
const uploadSourceCode = async (req, res, gameId) => {
  try {
    const zipFilePath = req.file.path;

    await extractZipFile(zipFilePath, gameId);
    await fs.unlinkSync(zipFilePath);

    const gameUrl = `http://localhost:${port}/api/game/${gameId}/index.html`;
    res.status(200).send(gameUrl);
  } catch (error) {
    await fs.unlinkSync(req.file.path);

    console.error(error);
    res.status(500).send("Error while upload and extract file!");
  }
};

const extractZipFile = async (zipFilePath, gameId) => {
  const buffer = fs.readFileSync(zipFilePath);
  const zip = await JSZip.loadAsync(buffer);

  await updateZipFileNames(zip, gameId);
  await saveZipFile(zip, zipFilePath);
  await unzipFile(zipFilePath, sourceCodeStoragePath);
};

const updateZipFileNames = async (zip, gameId) => {
  const zipFiles = zip.file(/.*/);
  zipFiles.forEach((file) => {
    const oldFileName = file.name.slice(file.name.indexOf("/"));
    const newName = `${gameId}/${oldFileName}`;
    zip.file(newName, file.async("uint8array"));
    zip.remove(file.name);
  });
};

const saveZipFile = async (zip, zipFilePath) => {
  const updatedZip = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(zipFilePath, updatedZip);
};

const unzipFile = async (zipFilePath, storagePath) => {
  const extract = fs
    .createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: storagePath }));

  await new Promise((resolve, reject) => {
    extract.on("error", reject);
    extract.on("finish", resolve);
  });
};

// Upload the cover image
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

module.exports = {
  uploadInfo,
  uploadSourceCode,
  uploadCoverImage,
};
