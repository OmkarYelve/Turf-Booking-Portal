import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin) || localStorage.getItem('userId');
  const user = localStorage.getItem("username");

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    toast("You've been logged out", { icon: '⚠️' });
    navigate('/login');
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Grounds", path: "/grounds" },
    { label: "Contact", path: "/contact" },
    { label: "Coffee Shop", path: "/coffee-shop" },
    { label: "Leagues", path: "/leagues" },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/logo-white.svg"
            alt="Logo"
            className="h-10"
          />
          <h1 className="text-lg font-semibold text-white hidden sm:inline">Turf's Corner</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <h4
              key={link.label}
              className="cursor-pointer hover:text-pink-500 font-semibold"
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </h4>
          ))}

          {!isLogin ? (
            <button
              className="bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-default">
                <span className="text-pink-500 font-bold">Hi {user}!</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <div
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/bookings')}
                >
                  Bookings
                </div>
                <div
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4 bg-black py-4">
          {navLinks.map((link) => (
            <h4
              key={link.label}
              className="text-white text-lg cursor-pointer hover:text-pink-500 font-semibold"
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
            >
              {link.label}
            </h4>
          ))}

          {!isLogin ? (
            <button
              className="bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200"
              onClick={() => {
                handleLogin();
                setIsOpen(false);
              }}
            >
              Login
            </button>
          ) : (
            <>
              <div
                className="text-white hover:text-pink-500 cursor-pointer"
                onClick={() => {
                  navigate('/bookings');
                  setIsOpen(false);
                }}
              >
                Bookings
              </div>
              <div
                className="text-white hover:text-pink-500 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
