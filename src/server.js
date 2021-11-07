"use strict";

const express = require("express");
const app = express();
require("dotenv").config();

const router = require("./auth/routes/user.route");
const notFoundHandler = require("./auth/middleware/404");
const errorHandler = require("./auth/middleware/500");
const userValidator = require("./auth/middleware/signin.validator");
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/signin", userValidator, router.signIn);
app.use("/signup", router.signUp);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to express home! 🏡 ");
});

// this is a global middleware
app.use("*", notFoundHandler);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

module.exports = {
  app,
  start,
};
