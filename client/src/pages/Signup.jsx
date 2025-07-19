import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { BASE_URL } from '../utils/helper';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    mobileNo: '',
  });

  const handleOnChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password) {
      toast.error("Fields cannot be empty");
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        mobileNo: inputs.mobileNo,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem("userId", data?.user._id);
        localStorage.setItem("email", data?.user.email);
        localStorage.setItem("mobileNo", data?.user.mobileNo);
        dispatch(authActions.login());
        toast.success("Registered");
        navigate('/');
      } else {
        toast.error("Email ID already exists!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Email or password incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-400 p-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl">

        {/* Left Side */}
        <div className="lg:w-2/5 bg-green-500 text-white p-8 lg:p-12 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl flex items-center justify-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Welcome!</h2>
            <p className="text-lg">Signup to access your account.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-3/5 p-6 sm:p-10 md:p-12 flex items-center justify-center">
          <form className="w-full space-y-4" onSubmit={handleSignup}>
            <h2 className="text-2xl font-bold text-center">Create an account</h2>

            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your Username"
                value={inputs.username}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label className="block text-gray-700">Mobile no</label>
              <input
                type="text"
                name="mobileNo"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your Mobile No"
                value={inputs.mobileNo}
                onChange={handleOnChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-950 text-white py-2 rounded-lg"
            >
              Sign Up
            </button>

            <p className="text-center">
              Already have an account?
              <NavLink to="/login" className="ml-1 hover:underline cursor-pointer text-blue-600">Login</NavLink>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
