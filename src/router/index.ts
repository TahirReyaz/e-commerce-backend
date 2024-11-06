import express from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import cartRoutes from "./cartRoutes";

const router = express.Router();

export default (): express.Router => {
  router.get("/", async (req, res) => {
    res.send("Express on Vercel");
  });
  productRoutes(router);
  userRoutes(router);
  cartRoutes(router);

  return router;
};
