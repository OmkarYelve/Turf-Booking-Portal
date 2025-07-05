import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const GroundCard = ({ id, name, location, price, image }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-50 w-72 shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <img src={image} alt={name} className="w-full h-44 object-cover mb-4 rounded-t-lg" />
            <div className="px-4 pb-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <p className="text-sm">{location}</p>
                </div>
                <p className="text-green-700 text-lg font-semibold mb-4">₹ {price}/hr</p>
                <button
                    onClick={() => navigate(`/ground/${id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 transition duration-300"
                >
                    View
                </button>
            </div>
        </div>
    );
};

export default GroundCard;





export const BookingCard = ({ id, user, ground, date, time }) => {
    return (
        <div className="bg-gray-700 w-80 p-4 shadow-md rounded-md">
            <h3 className="text-white text-xl font-bold mb-2">{ground}</h3>
            <p className="text-white mb-2 font-semibold">Date: {date}</p>
            <p className="text-white mb-2 font-semibold">Time: {time}</p>
            {/* <p className="text-gray-700 mb-2 font-bold">₹ <span className='font-normal'>{price}</span></p> */}
            {/* <button
                onClick={() => {
                    navigate(`/ground/${id}`);
                }}
                className="bg-green-700 text-white px-4 py-2 rounded-full">
                View
            </button> */}
        </div>
    )
}