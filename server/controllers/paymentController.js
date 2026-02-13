import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import { Booking } from "../models/bookingModel.js";
import { User } from "../models/userModel.js";
import { Ground } from "../models/groundModel.js";

// Step 1: Create Razorpay order
export const createOrder = async (req, res) => {
    try {
        const { amount, turfId, date, timeSlot, userId } = req.body;

        // Check if slot is already booked BEFORE creating order
        const ground = await Ground.findById(turfId);
        if (!ground) {
            return res.status(404).json({ success: false, message: 'Ground not found' });
        }

        const isAlreadyBooked = ground.bookings.some(booking =>
            new Date(booking.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0] &&
            booking.timeSlot === timeSlot
        );

        if (isAlreadyBooked) {
            return res.status(400).json({ success: false, message: 'This slot is already booked' });
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
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

    // Verify signature
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

    // Find user by email from JWT
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find ground
    const ground = await Ground.findById(turfId);
    if (!ground) {
      return res
        .status(404)
        .json({ success: false, message: "Ground not found" });
    }
    const isAlreadyBooked = ground.bookings.some(
      (booking) =>
        new Date(booking.date).toISOString().split("T")[0] ===
          new Date(date).toISOString().split("T")[0] &&
        booking.timeSlot === timeSlot,
    );
    if (isAlreadyBooked) {
      return res
        .status(400)
        .json({ success: false, message: "This slot is already booked" });
    }

    // Create booking
    const booking = await Booking.create({
      user: user._id,
      ground: ground._id,
      date: new Date(date),
      timeSlot,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "confirmed",
    });

    // Push booking to user's bookings array
    const bookingData = {
      user: user._id,
      ground: ground._id,
      date: new Date(date),
      timeSlot,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "confirmed",
    };

    user.bookings.push(bookingData);
    await user.save();

    ground.bookings.push(bookingData);
    await ground.save();

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
