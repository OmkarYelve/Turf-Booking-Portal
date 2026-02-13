import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ground: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ground",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  amount: Number,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
