import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
