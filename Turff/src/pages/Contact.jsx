import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactUsPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission, for now just showing success message
        toast.success('Message sent successfully!');
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Contact Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                            <ul className="text-gray-700 space-y-4">
                                <li className="flex items-center">
                                    <FaMapMarkerAlt className="h-6 w-6 mr-2 text-indigo-600" />
                                    <span>123 Turf Lane, City, Country</span>
                                </li>
                                <li className="flex items-center">
                                    <FaEnvelope className="h-6 w-6 mr-2 text-indigo-600" />
                                    <span>contact@example.com</span>
                                </li>
                                <li className="flex items-center">
                                    <FaPhone className="h-6 w-6 mr-2 text-indigo-600" />
                                    <span>+1234567890</span>
                                </li>
                            </ul>
                        </div>
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input type="text" placeholder="Your Name" className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Your Email" className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <textarea rows="4" placeholder="Your Message" className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* Map Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Location</h2>
                    {/* You can embed your map here */}
                    <div className="bg-gray-200 h-96 rounded-lg shadow-md"></div>
                </div>
            </section>
        </div>
    );
};

export default ContactUsPage;

