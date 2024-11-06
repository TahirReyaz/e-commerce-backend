import { Request, Response } from "express";

import { Cart } from "../models/CartItem";
import { AuthenticatedRequest } from "../middlewares";

export const increaseQuantity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const { id } = req.body;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ id });

    if (item.userId.toString() != userId) {
      return res.send(403).send({ message: "You are not the owner" });
    }

    item.quantity = item.quantity + 1;
    await item.save();
    return res.status(200).send({ message: "Increased" }).end();
  } catch (error) {
    return res.status(500).send({ message: "Error Adding to cart", error });
  }
};

export const createItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { prodId, title, price, image } = req.body;
    const userId = req.userId;
    const item = await Cart.create({
      prodId,
      title,
      price,
      image,
      quantity: 1,
      userId,
    });

    return res
      .status(200)
      .send({ message: "Item created", ...item.toObject() });
  } catch (error) {
    return res.status(500).send({ message: "Error creating item", error });
  }
};

export const getItemByProdId = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const { id } = req.body;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ prodId: id });

    if (item.userId.toString() != userId) {
      return res.send(403).send({ message: "You are not the owner" });
    }

    return res.status(200).send({ ...item });
  } catch (error) {
    return res.status(500).send({ message: "Error creating item", error });
  }
};

export const getItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const { id } = req.body;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ _id: id });

    if (item.userId.toString() != userId) {
      return res.send(403).send({ message: "You are not the owner" });
    }

    return res.status(200).send({ ...item });
  } catch (error) {
    return res.status(500).send({ message: "Error creating item", error });
  }
};
