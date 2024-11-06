import mongoose, { Document, Schema } from "mongoose";

interface ICartItem extends Document {
  title: string;
  price: number;
  quantity: number;
  image: string;
  prodId: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const userSchema = new Schema<ICartItem>(
  {
    title: { type: String, required: true },
    prodId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICartItem>("CommerceCartItem", userSchema);
