"use strict";
const moment = require("moment");

const info = (message) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
    console.log(
      `${moment().format("DD/MM/YYYY HH:mm:ss")} [INFO] ~ message:`,
      message
    );
  }
};

const error = (message) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
    console.error(
      `${moment().format("DD/MM/YYYY HH:mm:ss")} [ERROR] ~ message:`,
      message
    );
  }
};

const warn = (message) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
    console.warn(
      `${moment().format("DD/MM/YYYY HH:mm:ss")} [WARN] ~ message:`,
      message
    );
  }
};

const debug = (message) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
    console.log(
      `${moment().format("DD/MM/YYYY HH:mm:ss")} [DEBUG] ~ message:`,
      message
    );
  }
};

module.exports = {
  info,
  error,
  warn,
  debug,
};
