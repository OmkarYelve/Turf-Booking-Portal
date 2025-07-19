import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

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

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false); // close menu on mobile
  };

  return (
    // <div className="bg-black text-white fixed w-full z-50 top-0">
     // <div className="bg-[#95c11e] text-black fixed w-full z-50 top-0">
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#95c11e] text-black flex flex-col items-start gap-4 p-6 z-40">


      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo and title */}
        <div className="flex items-center space-x-4">
          <img
            src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/logo-white.svg"
            alt="Logo"
            className="h-10"
          />
          <span className="font-bold text-lg">Turf's Corner</span>
        </div>

        {/* Hamburger menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => handleNavClick('/')}>Home</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => handleNavClick('/grounds')}>Grounds</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => handleNavClick('/contact')}>Contact</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Coffee Shop</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Leagues</h4>

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
                <a
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/bookings')}
                >
                  Bookings
                </a>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col space-y-4 bg-black">
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => handleNavClick('/')}>Home</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => handleNavClick('/grounds')}>Grounds</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => handleNavClick('/contact')}>Contact</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Coffee Shop</h4>
          <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Leagues</h4>

          {!isLogin ? (
            <button
              className="bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <>
              <h4 className="text-pink-500 font-bold">Hi {user}!</h4>
              <button
                className="text-left text-white hover:text-pink-500"
                onClick={() => handleNavClick('/bookings')}
              >
                Bookings
              </button>
              <button
                className="text-left text-white hover:text-pink-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
