import express from "express";

import {
  createItem,
  getItem,
  getItemByProdId,
  increaseQuantity,
} from "../controllers/cartController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/cart/:id/inc", isAuthenticated, increaseQuantity);
  router.post("/cart/:id/dec", isAuthenticated, increaseQuantity);
  router.post("/cart", isAuthenticated, createItem);
  router.get("/cart/cartid/:id", isAuthenticated, getItem);
  router.get("/cart/prodid/:id", isAuthenticated, getItemByProdId);
};
