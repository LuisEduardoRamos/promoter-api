"use strict";

require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = (config = {}) => {
  let connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      logging: false,
      ...config,
    }
  );

  return connection;
};
