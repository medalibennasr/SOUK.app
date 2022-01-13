const express = require("express");
const mongoose = require("mongoose");
const { register, login } = require("../controllers/authController");

const Router = express.Router();
Router.post("/register", register);
 Router.post("/login", login);

module.exports = Router;
