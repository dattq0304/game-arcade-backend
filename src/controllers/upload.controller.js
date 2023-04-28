const JSZip = require("jszip");
const fs = require("fs");
const unzipper = require("unzipper");
const path = require("path");

const { GameModel } = require("../models");

const storagePath = process.env.PATH_TO_STORAGE;
const sourceCodeStoragePath = path.join(storagePath, "source-code");

// Upload the info
const uploadInfo = (req, res) => {
  GameModel.create({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    control: req.body.control,
    creator_id: "643ba6009bc9f67e3bef8dc3",
    active: false,
    create_date: new Date().toISOString(),
    modified_date: new Date().toISOString(),
    type: req.body.type,
    path: req.body.type === "Iframe link" ? req.body.link : "",
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Upload info failed! Error message: ${err.message}`);
    });
};

// Upload the source code
const uploadSourceCode = async (req, res) => {
  try {
    const id = req.params.id;
    const zipFilePath = req.file.path;

    await extractZipFile(zipFilePath, id);
    await fs.unlinkSync(zipFilePath);
    res.status(200).send("Upload source code successfully!");
  } catch (error) {
    await fs.unlinkSync(req.file.path);

    console.error(error);
    res.status(500).send("Error while upload and extract file!");
  }
};

const extractZipFile = async (zipFilePath, id) => {
  const buffer = fs.readFileSync(zipFilePath);
  const zip = await JSZip.loadAsync(buffer);

  await updateZipFileNames(zip, id);
  await saveZipFile(zip, zipFilePath);
  await unzipFile(zipFilePath, sourceCodeStoragePath);
};

const updateZipFileNames = async (zip, id) => {
  const zipFiles = zip.file(/.*/);
  zipFiles.forEach((file) => {
    const oldFileName = file.name.slice(file.name.indexOf("/"));
    const newName = `${id}/${oldFileName}`;
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
const uploadCoverImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.file;
    const currentPath = image.path;

    const oldName = image.originalname.split(".")[0];
    const newPath = currentPath.replace(oldName, id);
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
