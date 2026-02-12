import express from "express";
import { bookTimeSlot, getBookings, getGroundById, getGrounds, userLogin, userSignup } from "../controllers/userController.js";
import { authenticateJWT } from "../utils/jwtAuth.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/grounds', getGrounds);
router.get('/ground/:id', getGroundById);
router.post('/book-slot/:id', authenticateJWT, bookTimeSlot);
router.get('/bookings', authenticateJWT, getBookings);
router.post('/payment/create-order', authenticateJWT, createOrder);
router.post('/payment/verify', authenticateJWT, verifyPayment);

export default router;