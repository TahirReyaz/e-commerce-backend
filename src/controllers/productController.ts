import { Request, Response } from "express";
import axios from "axios";

import { fakeStoreUrl } from "../utils/constants";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${fakeStoreUrl}/products`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${fakeStoreUrl}/products/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};
