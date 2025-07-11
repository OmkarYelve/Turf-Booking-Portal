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

  return (
    <div
      id="nav"
      className="bg-black text-white flex items-center justify-between px-10 py-4 mb-0"
    >
      <div className="flex items-center space-x-8">
        <img
          src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/logo-white.svg"
          alt="Logo"
          className="h-10"
        />
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => navigate('/')}>Home</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => navigate('/grounds')}>Grounds</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => navigate('/contact')}>Contact</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Coffee Shop</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Leagues</h4>
      </div>

      {!isLogin && (
        <button
          className="bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200"
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      {isLogin && (
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
  );
};

export default Navbar;
