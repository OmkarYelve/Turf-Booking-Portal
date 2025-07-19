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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center relative z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/logo-white.svg"
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-8">
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => navigate('/')}>Home</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => navigate('/grounds')}>Grounds</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold" onClick={() => navigate('/contact')}>Contact</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Coffee Shop</h4>
        <h4 className="cursor-pointer hover:text-pink-500 font-semibold">Leagues</h4>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Right: Auth buttons */}
      <div className="hidden md:block">
        {!isLogin ? (
          <button
            className="bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200"
            onClick={handleLogin}
          >
            Login
          </button>
        ) : (
          <div className="relative group inline-block">
            <div className="flex items-center space-x-2 cursor-default">
              <span className="text-pink-500 font-bold">Hi {user}!</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-black flex flex-col items-start px-6 py-4 md:hidden shadow-md z-40">
          <a className="py-2 font-semibold hover:text-pink-500" onClick={() => { navigate('/'); setIsOpen(false); }}>Home</a>
          <a className="py-2 font-semibold hover:text-pink-500" onClick={() => { navigate('/grounds'); setIsOpen(false); }}>Grounds</a>
          <a className="py-2 font-semibold hover:text-pink-500" onClick={() => { navigate('/contact'); setIsOpen(false); }}>Contact</a>
          <a className="py-2 font-semibold hover:text-pink-500">Coffee Shop</a>
          <a className="py-2 font-semibold hover:text-pink-500">Leagues</a>

          {!isLogin ? (
            <button
              className="mt-4 bg-black text-white font-bold px-6 py-2 rounded-md hover:bg-gray-800 w-full text-left"
              onClick={() => { handleLogin(); setIsOpen(false); }}
            >
              Login
            </button>
          ) : (
            <>
              <button
                className="mt-4 font-semibold hover:text-red-500 text-left"
                onClick={() => { navigate('/bookings'); setIsOpen(false); }}
              >
                Bookings
              </button>
              <button
                className="mt-2 font-semibold hover:text-red-500 text-left"
                onClick={() => { handleLogout(); setIsOpen(false); }}
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
