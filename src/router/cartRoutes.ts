import express from "express";

import {
  changeQuantity,
  createItem,
  deleteItem,
  getCart,
  getItem,
  getItemByProdId,
} from "../controllers/cartController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/cart/:id/update-quantity", isAuthenticated, changeQuantity);
  router.post("/cart", isAuthenticated, createItem);
  router.get("/cart/cartid/:id", isAuthenticated, getItem);
  router.get("/cart/prodid/:id", isAuthenticated, getItemByProdId);
  router.delete("/cart/:id", isAuthenticated, deleteItem);
  router.get("/cart", isAuthenticated, getCart);
};
