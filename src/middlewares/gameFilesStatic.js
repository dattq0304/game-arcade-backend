const express = require("express");
const path = require("path");

const storagePath = process.env.PATH_TO_STORAGE;
const sourceCodeStoragePath = path.join(storagePath, "source-code");

const gameFilesStatic = (req, router) => {
  let id = req.params.id;
  router.use(
    `/${id}`,
    express.static(path.join(sourceCodeStoragePath, id), { index: false })
  );
};

module.exports = gameFilesStatic;
