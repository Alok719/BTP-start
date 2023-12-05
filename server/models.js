import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    email: { type: String, required: true },
    hashedOtp: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    role: { type: String, default: "beneficiary" },
    profilePic: { type: String }, // path to file
    coverPic: { type: String }, // path to file
  },
  { timestamps: true }
);

const historySchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const Otp = new mongoose.model("otp", otpSchema);
export const User = new mongoose.model("user", userSchema);
export const Order = new mongoose.model("order", orderSchema);
export const History = new mongoose.model("history", historySchema);
