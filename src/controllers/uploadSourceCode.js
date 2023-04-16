const JSZip = require("jszip");
const fs = require("fs");
const unzipper = require("unzipper");
const path = require("path");

const port = process.env.PORT;
const storagePath = process.env.PATH_TO_STORAGE;
const sourceCodeStoragePath = path.join(storagePath, "source-code");

const uploadSourceCode = async (req, res, gameId) => {
  try {
    const zipFilePath = req.file.path;

    await extractZipFile(zipFilePath, gameId);
    await deleteZipFile(zipFilePath);

    const gameUrl = `http://localhost:${port}/game/${gameId}/index.html`;
    res.status(200).send(gameUrl);
  } catch (error) {
    await deleteZipFile(zipFilePath);

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

const deleteZipFile = async (zipFilePath) => {
  fs.unlinkSync(zipFilePath);
};

module.exports = uploadSourceCode;
