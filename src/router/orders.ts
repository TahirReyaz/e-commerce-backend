import express from "express";

const router = express.Router();

router.post("/checkout", (req, res) => {
  const isSuccess = Math.random() > 0.5;
  if (isSuccess) {
    res.json({ status: "success", message: "Payment successful" });
  } else {
    res.json({ status: "failure", message: "Payment failed" });
  }
});

export default router;
