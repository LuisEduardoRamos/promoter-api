'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

const AppError = require('../utils/AppError');
const { INCOMPLETE_REQUEST, UNAUTHORIZED } = require('../constants/errorCodes');

const secret = process.env.SECRET_KEY || 'N0t4l3S3cr3t';
let payload;

exports.ensureAuth = function (req, res, next) {
  if (!req.headers.auth) {
    throw new AppError(INCOMPLETE_REQUEST, 'Token required');
  }

  let token = req.headers.auth.replace(/['"]+/g, '');

  try {
    payload = jwt.decode(token, secret);
    if (payload <= moment().unix())
      throw new AppError(UNAUTHORIZED, 'Token expired');
  } catch (ex) {
    throw new AppError(UNAUTHORIZED, 'Token unauthorized');
  }

  req.user = payload;
  next();
};
