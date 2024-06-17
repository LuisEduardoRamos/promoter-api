"use strict";

const express = require("express");

const { catcher } = require("../utils/catcher");
const {
  register,
  login,
  auth
} = require("../controllers/users");
const { ensureAuth } = require("../middleware/authenticated");

const api = express.Router();

//TOOD Permissions midddleware validator
api.post("/register", catcher(register));
api.post("/login", catcher(login));
api.post("/auth", [ensureAuth], catcher(auth));

module.exports = api;
