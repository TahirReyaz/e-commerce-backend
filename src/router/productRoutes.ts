import express from "express";
import { getProducts, getProduct } from "../controllers/productController";

export default (router: express.Router) => {
  router.get("/products", getProducts);
  router.get("/products/:id", getProduct);
};
