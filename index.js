"use strict";

require("dotenv").config();
const moment = require("moment");

const app = require("./src/app");
const connectDb = require("./src/config/connect-db");
const logger = require("./src/services/logger");

const port = process.env.API_PORT | 8000;
const conn = connectDb();

conn
  .authenticate()
  .then(() => {
    console.log("Connection to DB has been established succesfully.");
    app.listen(port, function () {
      console.log("App running on port: " + port);
      console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    });
  })
  .catch((err) => {
    logger.error(err);
    throw new Error(err);
  });
