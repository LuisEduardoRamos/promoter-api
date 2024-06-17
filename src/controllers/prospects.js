const {
  INVALID_SUBSCRIPTION,
  NOT_FOUND,
  INCOMPLETE_REQUEST,
  UNIQUE_ERROR,
} = require("../constants/errorCodes");
const Prospect = require("../models/Prospect");
const { prospectValidator, updateProspectSchema } = require("../services/validator");
const AppError = require("../utils/AppError");
const logger = require("../services/logger");
const { ensureId } = require("../utils");
const { getFiles } = require("./files");

const createProspect = async (req, res) => {
  const { error } = prospectValidator.validate(req.body);

  if (error) {
    logger.error(error);
    throw error;
  }

  const newProspect = new Prospect({
    ...req.body,
  });

  try {
    await newProspect.save();
    logger.info(`${newProspect.name} created`);
    res.status(201).json(newProspect);
  } catch (err) {
    throw new Error(err);
  }
};

const getProspects = async (req, res) => {
  const prospects = await Prospect.findAll();
  res.status(200).json(prospects);
};

const getProspect = async (req, res) => {
  const { id } = ensureId(req.params);
  const prospect = await Prospect.findOne({ where: { id: id } });
  const files = await getFiles(id);
  if (!prospect) {
    throw new AppError(NOT_FOUND, "Prospect not found");
  }
  res.status(200).json({...prospect.dataValues, files: files});
};

const updateProspect = async (req, res) => {
  const { id } = ensureId(req.params);
  const { status } = req.body;

  const { error } = updateProspectSchema.validate(req.body);
  
  if (error) {
    logger.error(error);
    throw error;
  }

  if (!status) {
    throw new AppError(INCOMPLETE_REQUEST, "Missing status");
  }

  const prospect = await Prospect.findOne({ where: { id: id } });

  if (!prospect) {
    throw new AppError(NOT_FOUND, "Prospect not found");
  }

  const files = await getFiles(id);

  try {
    const updatedProspect = await prospect.update(req.body);
    res.status(200).json({...updatedProspect.dataValues, files: files});
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { createProspect, getProspect, updateProspect, getProspects };
