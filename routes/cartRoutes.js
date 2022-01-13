const express = require("express");
const mongoose = require("mongoose");
const { 
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCarts,
     } = require("../controllers/CartController");

const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const Router = express.Router();

Router.post("/", verifyToken, createCart);
Router.put("/:id", verifyTokenAndAuthorization, updateCart);
Router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
Router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
Router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = Router;





