const express = require("express");
const Movies = require("./Movies");
const Genre = require("./Genre");
const Auth = require("./Auth");

const RouterMain = express.Router();

RouterMain.use("/api/movie", Movies);
RouterMain.use("/api/genre", Genre);
RouterMain.use("/api/auth", Auth);

module.exports = RouterMain;
