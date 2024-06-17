"use strict";

const express = require("express");

const { catcher } = require("../utils/catcher");
const { ensureAuth } = require("../middleware/authenticated");
const {
  createProspect,
  getProspect,
  updateProspect,
  getProspects,
} = require("../controllers/prospects");

const api = express.Router();

api.post("/prospect", [ensureAuth], catcher(createProspect));
api.get("/prospect/:id", [ensureAuth], catcher(getProspect));
api.put("/prospect/:id", [ensureAuth], catcher(updateProspect));
api.get("/prospects", [ensureAuth], catcher(getProspects));

module.exports = api;
