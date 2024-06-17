"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const secret = process.env.SECRET_KEY || "N0t4l3S3cr3t";

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };

  return jwt.encode(payload, secret);
};
