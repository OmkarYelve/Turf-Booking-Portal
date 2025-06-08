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
});

export const Booking = mongoose.model('Booking', bookingSchema); 