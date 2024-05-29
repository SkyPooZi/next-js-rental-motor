'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      alert('Email or password cannot be empty');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/all');
      console.log('API response:', response);

      const users = response.data.user; // Adjusted to access the correct key
      console.log('Users data:', users);

      if (!Array.isArray(users)) {
        throw new Error('Invalid response format');
      }

      const user = users.find(user => user.email === email);
      console.log('User found:', user); // Debugging line to check the user object

      if (user) {
        // Debugging line to check the user.peran value
        console.log('User role:', user.peran);
        if (user.peran === 'admin') {
          router.push('/admin');
        } else {
          router.push('/form');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-row">
        <img
          src="/images/login.png"
          alt="Login"
          className="w-500 h-500 object-cover mr-10"
        />
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-bold mb-6 text-black">Login</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={handlePasswordChange}
              className="bg-white text-black mt-2 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <div className="flex items-center mt-4 text-black bg-white">
              <input type="checkbox" id="ingat-saya" className="mr-2" />
              <label htmlFor="ingat-saya">Ingat Saya</label>
              <span className="mx-20"> </span>
              <a href="#" className="hover:underline ml-auto">
                Lupa Kata Sandi?
              </a>
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-[#ff4d30] text-white font-bold py-2 px-4 rounded-lg h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-FF0000 flex-grow"
                style={{ width: '448px' }}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-center text-center mt-4 text-base text-black">
            <span>Belum punya akun? </span>
            <span className="mx-20"> </span>
            <a href="/register" className="hover:underline">
              Daftar di sini
            </a>
          </div>
          <div className="flex justify-center items-center mt-4 text-base">
            <span>Atau</span>
          </div>
          <div className="flex items-center ml-4">
            <a href="#" className="flex items-center justify-center rounded-lg p-2 shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-gray-300">
              <img
                src="/images/google.png"
                alt="Google"
                className="w-500 h-5 mr-10 ml-10"
              />
            </a>
            <a href="#" className="flex items-center justify-center bg-blue-900 hover:bg-blue-700 rounded-lg p-2 shadow shadow-black shadow-opacity-25 shadow-radius-1 ml-4">
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="w-100 h-5 mr-10 ml-10"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
