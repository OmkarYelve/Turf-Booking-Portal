import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger plugin

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin) || localStorage.getItem('userId');
  const user = localStorage.getItem("username");

  useEffect(() => {
    gsap.to("#nav", {
      backgroundColor: "#000",
      duration: 0.5,
      height: "110px",
      scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1,
      },
    });
  }, []); // Empty dependency array to run the effect only once on mount

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.clear();
      toast("You've been logged out", {
        icon: '⚠️',
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="nav">
      <img
        src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/logo-white.svg"
        alt=""
      />
      <h4 className='font-bold'  onClick={() => navigate('/')}>Home</h4>
      <h4 onClick={() => navigate('/grounds')}>Grounds</h4>
      <h4 onClick={() => navigate('/contact')}>Contact me</h4>
      <h4>coffee shop</h4>
      <h4>leagues</h4>

      {!isLogin &&
							<button className="bg-white text-black font-bold px-12 py-2  rounded-md ml-24" onClick={handleLogin}>Login</button>
						}
      
      
      {isLogin && (
        <div className="mx-auto flex items-center justify-center bg-none rounded-md">
          <div className="group relative cursor-pointer">
            <div className="flex items-center justify-between space-x-5 bg-none px-2 rounded-sm">
              <a className="menu-hover py-2 text-lg font-bold   lg:mx-4 hover:text-pink-600" onClick="">
                Hi  <span className="text-pink-600"> {user}!</span> 
              </a>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="black" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
            <div className="invisible absolute z-50 flex w-full flex-col rounded-sm bg-gray-300 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
              <a className="my-2 block border-b border-black py-1 font-semibold text-gray-600 hover:text-pink-600 md:mx-2" onClick={() => { navigate('/bookings') }}>
                Bookings
              </a>
              <a className="my-2 block border-b border-black py-1 font-semibold text-gray-600 hover:text-pink-600 md:mx-2" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
