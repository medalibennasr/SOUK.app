const express = require("express");
const mongoose = require("mongoose");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const Router = express.Router();

Router.put("/:id", verifyTokenAndAuthorization, updateUser);
Router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
Router.get("/find/:id",verifyTokenAndAdmin, getUser);
Router.get("/", verifyTokenAndAdmin, getAllUsers);
Router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = Router;
