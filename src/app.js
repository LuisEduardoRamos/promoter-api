"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const errorHandler = require("./middleware/errorHandler");

const user = require("./routes/users");
const prospects = require("./routes/prospects");
const files = require("./routes/files");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "auth, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", user);
app.use("/api", prospects);
app.use("/api", files);

app.use(errorHandler);

module.exports = app;
