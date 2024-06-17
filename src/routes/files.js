"use strict";

const express = require("express");
let multipart = require("connect-multiparty");

const { catcher } = require("../utils/catcher");
const { ensureAuth } = require("../middleware/authenticated");
const { 
    saveFile,
    getFile,
    removeFile,
 } = require("../controllers/files");

const md_upload = multipart({ uploadDir: "./uploads" });
const api = express.Router();

api.post('/file/:prospectId/:fileName', [ensureAuth, md_upload], catcher(saveFile));
api.get('/file/:file', [ensureAuth], catcher(getFile));
api.delete('/file/:id', [ensureAuth], catcher(removeFile));

module.exports = api;
