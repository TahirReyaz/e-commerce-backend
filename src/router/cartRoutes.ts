import express from "express";

import {
  changeQuantity,
  createItem,
  deleteItem,
  getCart,
  getItem,
  getItemByProdId,
  placeOrder,
} from "../controllers/cartController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/cart/:id/update-quantity", isAuthenticated, changeQuantity);
  router.post("/cart", isAuthenticated, createItem);
  router.post("/cart/checkout", isAuthenticated, placeOrder);
  router.get("/cart/cartid/:id", isAuthenticated, getItem);
  router.get("/cart/prodid/:id", isAuthenticated, getItemByProdId);
  router.delete("/cart/:id", isAuthenticated, deleteItem);
  router.get("/cart", isAuthenticated, getCart);
};
