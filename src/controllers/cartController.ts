import { Request, Response } from "express";

import { Cart } from "../models/CartItem";
import { AuthenticatedRequest } from "../middlewares";

export const changeQuantity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { inc } = req.body;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ _id: id });

    if (!item) {
      return res
        .status(404)
        .send({ message: "Cart item with this prod id not found" });
    }

    if (item.userId.toString() != userId) {
      return res.status(403).send({ message: "You are not the owner" });
    }

    if (inc) {
      item.quantity = item.quantity + 1;
    } else {
      item.quantity = item.quantity - 1;
    }

    if (item.quantity === 0) {
      const deletedItem = await Cart.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .send({ message: "Item deleted", ...deletedItem.toObject() });
    } else {
      const updatedItem = await item.save();
      return res
        .status(200)
        .send({ message: "Increased", ...updatedItem.toObject() })
        .end();
    }
  } catch (error) {
    return res.status(500).send({ message: "Error Adding to cart", error });
  }
};

export const deleteItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ _id: id });

    if (!item) {
      return res
        .status(404)
        .send({ message: "Cart item with this prod id not found" });
    }

    if (item.userId.toString() != userId) {
      return res.status(403).send({ message: "You are not the owner" });
    }

    const deletedItem = await Cart.findOneAndDelete({ _id: id });
    return res
      .status(200)
      .send({ message: "Item deleted", ...deletedItem.toObject() });
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
  const { id } = req.params;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ prodId: id, userId });

    if (!item) {
      return res.status(200).send({
        message: "Cart item with this prod id not found",
        found: false,
      });
    }

    if (item.userId.toString() != userId) {
      return res.status(403).send({ message: "You are not the owner" });
    }

    return res.status(200).send({ ...item.toObject(), found: true });
  } catch (error) {
    return res.status(500).send({ message: "Error fetching item", error });
  }
};

export const getItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const item = await Cart.findOne({ _id: id });

    if (item.userId.toString() != userId) {
      return res.status(403).send({ message: "You are not the owner" });
    }

    return res.status(200).send({ ...item });
  } catch (error) {
    return res.status(500).send({ message: "Error fetching item", error });
  }
};

export const getCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  try {
    const item = await Cart.find({ userId });

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching cart", error });
  }
};

export const placeOrder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  try {
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      await Cart.deleteMany({ userId });
      return res
        .status(200)
        .json({ status: "success", message: "Payment successful" });
    } else {
      return res
        .status(400)
        .json({ status: "failure", message: "Payment failed" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error fetching cart", error });
  }
};
