const fs = require("fs");
const path = require("path");
const {
  INVALID_SUBSCRIPTION,
  NOT_FOUND,
  INCOMPLETE_REQUEST,
  UNIQUE_ERROR,
} = require("../constants/errorCodes");
const File = require("../models/File");
const AppError = require("../utils/AppError");
const logger = require("../services/logger");
const { ensureId } = require("../utils");

const saveFile = async (req, res) => {
  const document = req.files.document;
  const { prospectId, fileName } = req.params;

  if (!document) {
    throw new AppError(INCOMPLETE_REQUEST, "Missing document");
  }

  if (!prospectId) {
    throw new AppError(INCOMPLETE_REQUEST, "Missing prospect id");
  }

  const file_name = document.path.split("/").pop();
  const file_ext = file_name.split(".").pop();

  if (!["png", "jpg", "jpeg", "pdf"].includes(file_ext)) {
    throw new AppError(INVALID_SUBSCRIPTION, "Invalid extension");
  }
  const { fileSaved, error } = await insertFile({
    path: file_name,
    name: fileName || file_name,
    prospect_id: prospectId,
  });

  if (error) {
    logger.error(error);
    throw new AppError(UNIQUE_ERROR, error || associateError);
  }

  logger.info(`${fileName} saved`);
  return res.status(200).send({
    status: 200,
    message: "file saved",
    body: { fileSaved: fileSaved },
  });
};

const getFile = (req, res) => {
  const file = req.params.file;
  const path_file = `./uploads/${file}`;
  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      throw new AppError(NOT_FOUND, "File not found");
    }
  });
};

const removeFile = async (req, res) => {
  const { id } = ensureId(req.params);
  const file = await File.findOne({ where: { id: id } });
  if (!file) {
    throw new AppError(NOT_FOUND, "File not found");
  }
  const docFile = `./uploads/${file.path}`;
  await file.destroy();
  fs.unlinkSync(docFile);
  res.status(200).json({ message: "File deleted" });
};

const insertFile = async (file) => {
  const newFile = new File({
    ...file,
  });

  try {
    const fileSaved = await newFile.save();
    return { fileSaved, error: null };
  } catch (err) {
    return { fileSaved: null, error: err };
  }
};

const getFiles = (id) => {
  const files = File.findAll({ where: { prospect_id: id } });
  return files;
};

module.exports = {
  saveFile,
  getFiles,
  getFile,
  removeFile,
};
