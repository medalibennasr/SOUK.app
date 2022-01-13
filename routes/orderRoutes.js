const express = require("express");
const mongoose = require("mongoose");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncomeOrders,
} = require("../controllers/OrderController");

const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const Router = express.Router();

Router.post("/", verifyToken, createOrder);
Router.put("/:id", verifyTokenAndAdmin, updateOrder);
Router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
Router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);
Router.get("/", verifyTokenAndAdmin, getAllOrders);
Router.get("/income", verifyTokenAndAdmin, getMonthlyIncomeOrders);

module.exports = Router;
