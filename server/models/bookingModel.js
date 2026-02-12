import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: false,
    },
    ground: {
        type: mongoose.Schema.Types.String,
        ref: 'Ground',
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
    amount: {
        type: Number,
        required: false,
    },
    paymentId: {
        type: String,
        required: false,
    },
    orderId: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);