const AppError = require("../utils/AppError");
const logger = require("../services/logger");

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details[0].message,
      errorCode: 1,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.errorCode).json({
      type: "AppError",
      details: error.message || "Unkown error details",
    });
  }

  return res.status(500).send({
    type: "Unknown",
    details: error.message || "Unkown error details",
  });
};

module.exports = errorHandler;
