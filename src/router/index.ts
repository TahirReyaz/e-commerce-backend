import express from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

export default (): express.Router => {
  router.get("/", async (req, res) => {
    res.send("HELLO WORLD");
  });
  productRoutes(router);
  userRoutes(router);

  return router;
};
