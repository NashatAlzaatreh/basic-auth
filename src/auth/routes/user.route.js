"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const Users = require("../models/index");

router.post("/signup", signUp);
router.post("/signin", signIn);

async function signUp(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("req.body.password", req.body.password);
    const checkUser = await Users.findOne({ username: req.body.username });
    if (checkUser) {
      next("user already exist");
      return;
    }
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error Creating User");
  }
}

async function signIn(req, res) {
  try {
    const headers = req.headers.authorization.split(" ");
    const decodedPass = base64.decode(headers[1]);
    const [username, password] = decodedPass.split(":");
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error("Invalid User");
    }
  } catch (error) {
    res.status(403).send("Invalid Login");
  }
}

module.exports = {
  signIn,
  signUp,
};
