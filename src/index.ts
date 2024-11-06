import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import router from "./router";

dotenv.config();

connectDB();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use("/", router());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
