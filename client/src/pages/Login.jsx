import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { BASE_URL } from '../utils/helper';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
	});

	const handleOnChange = (e) => {
		setInputs(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) {
			toast.error("Fields cannot be empty");
			return;
		}

		try {
			const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
				email: inputs.email,
				password: inputs.password,
			});
			if (data.success) {
				localStorage.setItem('token', data.token);
				localStorage.setItem("userId", data?.user._id);
				localStorage.setItem("email", data?.user.email);
				localStorage.setItem("username", data?.user.username);
				dispatch(authActions.login());
				toast.success("Logged in");
				navigate('/');
			} else {
				toast.error("Email or password incorrect");
			}
		} catch (error) {
			console.log(error);
			toast.error("incorrect");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
			<div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
				
				{/* Left Side (Image/Welcome) */}
				<div className="md:w-1/2 bg-green-500 text-white flex flex-col justify-center items-center px-6 py-10">
					<h2 className="text-3xl font-bold mb-4 text-center">Welcome!</h2>
					<p className="text-lg text-center">Login to access your account.</p>
				</div>

				{/* Right Side (Form) */}
				<div className="md:w-1/2 p-8 sm:p-10">
					<h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
					<form className="space-y-5" onSubmit={handleLogin}>
						
						<div>
							<label className="block text-gray-700">Email</label>
							<input
								type="email"
								name="email"
								className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
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
								className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
								placeholder="Enter your password"
								value={inputs.password}
								onChange={handleOnChange}
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-gray-800 hover:bg-black text-white py-2 rounded-lg transition"
						>
							Login
						</button>

						<p className="text-center text-sm">
							Don't have an account? 
							<NavLink to="/signup" className="ml-1 text-blue-600 hover:underline">
								Sign Up
							</NavLink>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
