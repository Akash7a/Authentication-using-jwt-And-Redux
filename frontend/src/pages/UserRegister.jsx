import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { registerUser } from '../features/auth/AuthSlice.js';

const UserRegister = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        username: "",
        fullname: {
            firstname: "",
            lastname: "",
        },
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "firstname" || name === "lastname") {
            setUserData((prevState) => ({
                ...prevState,
                fullname: {
                    ...prevState.fullname,
                    [name]: value,
                },
            }));
        } else {
            setUserData({
                ...userData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(userData));
        setUserData({
            username: "",
            fullname: {
                firstname: "",
                lastname: "",
            },
            email: "",
            password: "",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700">
            <div className="bg-gradient-to-br from-gray-800 to-black shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
                    Create Your Account
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-white text-sm font-medium mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userData.username}
                            onChange={changeHandler}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="firstname"
                            className="block text-white text-sm font-medium mb-2"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={userData.fullname.firstname}
                            onChange={changeHandler}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastname"
                            className="block text-white text-sm font-medium mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={userData.fullname.lastname}
                            onChange={changeHandler}
                            placeholder="Enter your last name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-white text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={changeHandler}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-white text-sm font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={changeHandler}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-700 to-purple-800 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-300 shadow-md"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-300 mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-gray-200 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserRegister;