import express from "express";
import { registerUser, loginUser } from "../controllers/userController";

export default (router: express.Router) => {
  router.post("/auth/register", registerUser);
  router.post("/auth/login", loginUser);
};
