import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import { Booking } from '../models/bookingModel.js';

// Step 1: Create Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { amount, turfId, date, timeSlot, userId } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Step 2: Verify payment & save booking
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      turfId,
      date,
      timeSlot,
      userId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    const booking = await Booking.create({
      user: userId,
      ground: turfId,
      date,
      timeSlot,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "confirmed",
    });

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
