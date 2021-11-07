"use strict";
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

async function signInValidator(req, res, next) {
  const headers = req.headers.authorization.split(" ");
  if (headers[0] !== "Basic") {
    next("WRONG Authorization headers");
  } else {
    const dePass = base64.decode(headers[1]);
    const [username, password] = dePass.split(":");
    const user = await User.findOne({ username });
    if (!user) {
      next("WRONG username / password");
    } else {
      const truthy = await bcrypt.compare(password, user.password);
      if (truthy) {
        next();
      } else {
        next("WRONG username / password");
      }
    }
  }
}

module.exports = signInValidator;
