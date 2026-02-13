import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaFutbol } from 'react-icons/fa';

const GroundCard = ({ id, name, location, price, image }) => {
    const navigate = useNavigate();

    return (
        <div className="group relative bg-white w-72 shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/ground/${id}`)}
            style={{ transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
            }}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    style={{ transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                    ₹{price}/hr
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{name}</h3>
                    <FaFutbol className="text-green-500 mt-1 ml-2 flex-shrink-0" />
                </div>

                <div className="flex items-center text-gray-500 mb-4">
                    <FaMapMarkerAlt className="mr-1 text-green-500 flex-shrink-0" size={13} />
                    <p className="text-sm truncate">{location}</p>
                </div>

                <button
                    onClick={e => { e.stopPropagation(); navigate(`/ground/${id}`); }}
                    className="w-full bg-gray-900 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors duration-200"
                >
                    View & Book
                </button>
            </div>
        </div>
    );
};

export default GroundCard;


export const BookingCard = ({ id, ground, date, time }) => {
    // ground is now a full object with ground_name, location, etc.
    const groundName = ground?.ground_name || ground || 'Unknown Ground';
    const groundLocation = ground?.location || '';
    const groundPrice = ground?.price || '';

    // Format date nicely
    const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }) : '';

    return (
        <div className="relative bg-gray-900 w-80 rounded-2xl overflow-hidden shadow-xl"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-600" />

            <div className="p-5">
                {/* Status badge */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                        Confirmed
                    </span>
                    <span className="bg-green-900 text-green-300 text-xs font-semibold px-2 py-1 rounded-full">
                        ✓ Paid
                    </span>
                </div>

                {/* Ground name */}
                <div className="flex items-center gap-2 mb-1">
                    <FaFutbol className="text-green-400 flex-shrink-0" />
                    <h3 className="text-white text-lg font-bold truncate">{groundName}</h3>
                </div>

                {/* Location */}
                {groundLocation && (
                    <div className="flex items-center gap-2 mb-4">
                        <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" size={12} />
                        <p className="text-gray-400 text-sm">{groundLocation}</p>
                    </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-700 my-3" />

                {/* Date & Time */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-green-400" size={13} />
                        <div>
                            <p className="text-gray-400 text-xs">Date</p>
                            <p className="text-white text-sm font-semibold">{formattedDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock className="text-green-400" size={13} />
                        <div>
                            <p className="text-gray-400 text-xs">Time</p>
                            <p className="text-white text-sm font-semibold">{time}</p>
                        </div>
                    </div>
                    {groundPrice && (
                        <div>
                            <p className="text-gray-400 text-xs">Amount</p>
                            <p className="text-green-400 text-sm font-bold">₹{groundPrice}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};