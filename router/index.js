const express = require("express");
const Movies = require("./Movies");
const Genre = require("./Genre");
const Auth = require("./Auth");
const User = require("./User");

const RouterMain = express.Router();

RouterMain.use("/api/movie", Movies);
RouterMain.use("/api/genre", Genre);
RouterMain.use("/api/auth", Auth);
RouterMain.use("/api/user", User);

module.exports = RouterMain;
