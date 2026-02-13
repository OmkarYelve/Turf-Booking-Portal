import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Ground } from "../models/groundModel.js";
import { Booking } from "../models/bookingModel.js";

//*************** user registration ***************//
export const userSignup = async (req, res) => {
  try {
    const { username, name, email, password, mobileNo } = req.body;

    if (!username || !email || !password || !mobileNo) {
      return res.status(400).send({ message: "Please fill all required fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, mobileNo });
    await user.save();

    const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: "1d" });

    return res.status(201).send({ message: "User created successfully", success: true, user, token });
  } catch (error) {
    return res.status(500).send({ message: "Error creating account", success: false, error });
  }
};

//*************** user login ***************//
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found", success: false });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).send({ message: "Incorrect email or password", success: false });
    }

    const token = jwt.sign({ email: user.email, role: "user" }, process.env.SECRET, { expiresIn: "1d" });

    return res.status(200).send({ message: "Logged in successfully", success: true, user, token });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", success: false, error });
  }
};

//*************** display grounds for the user ***************//
export const getGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find({ published: true });
    res.status(200).send({ success: true, grounds });
  } catch (error) {
    return res.status(400).send({ message: "No grounds listed", success: false, error });
  }
};

//*************** get ground by id ***************//
export const getGroundById = async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);
    res.status(200).send({ success: true, ground });
  } catch (error) {
    return res.status(404).send({ message: "Ground not found", success: false, error });
  }
};

//*************** book time slot ***************//
export const bookTimeSlot = async (req, res) => {
  try {
    const groundId = req.params.id;
    const ground = await Ground.findById(groundId);

    if (!ground) {
      return res.status(400).send({ message: "Ground not found", success: false });
    }

    const { date, timeSlot } = req.body;
    const parsedDate = new Date(date);

    const isValidDate = (d) => d instanceof Date && d > new Date();
    if (!isValidDate(parsedDate)) {
      return res.status(400).send({ message: "Invalid date provided", success: false });
    }

    if (!ground.availableSlots.includes(timeSlot)) {
      return res.status(400).send({ message: "Selected time slot is not available", success: false });
    }

    const isAlreadyBooked = ground.bookings.some(
      (booking) => booking.date.getTime() === parsedDate.getTime() && booking.timeSlot === timeSlot
    );
    if (isAlreadyBooked) {
      return res.status(400).send({ message: "Selected time slot is already booked", success: false });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(403).send({ message: "User not found", success: false });
    }

    const booking = await Booking.create({
      user: user._id,
      ground: ground._id,
      date: parsedDate,
      timeSlot,
    });

    ground.bookings.push(booking._id);
    await ground.save();

    user.bookings.push(booking._id);
    await user.save();

    res.status(200).send({ message: "Time slot booked successfully", success: true, booking });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", success: false, error });
  }
};

//*************** get bookings by user ***************//
export const getBookings = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate({
      path: "bookings",
      populate: { path: "ground" },
    });

    if (user) {
      res.status(200).send({ bookings: user.bookings || [], success: true });
    } else {
      return res.status(400).send({ message: "User not found", success: false });
    }
  } catch (error) {
    return res.status(400).send({ message: "No bookings found", success: false, error });
  }
};

export const getApiKey = async (req, res) => {
  try {
    const key = process.env.API_KEY;
    if (key) {
      res.status(200).send({ success: true, key });
    } else {
      return res.status(400).send({ message: "No key found", success: false });
    }
  } catch (error) {
    return res.status(400).send({ message: "No API key found", success: false, error });
  }
};