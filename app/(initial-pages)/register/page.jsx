'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama_pengguna: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://rental-motor.ruscarestudent.com/api/user/create', formData);
      console.log(response.data);
      router.push('/form');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-row bg-white">
        <img
          src="/images/register.png"
          alt="register"
          className="w-500 h-500 object-cover mr-10"
        />
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-bold mb-3 text-black">Register</h1>
            <input
              type="text"
              name="nama_pengguna"
              value={formData.nama_pengguna}
              onChange={handleChange}
              placeholder="Nama Pengguna"
              className="bg-white text-black mt-2 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Kata Sandi"
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px' }}
            />
            <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="bg-[#FF4D30] mt-4 text-white font-bold py-2 px-4 rounded-lg h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1 hover:bg-FF0000 flex-grow"
              style={{ width: '448px' }}
            >
              Register
            </button>
          </form>

          <div className="flex mt-4 text-black">
            <input type="checkbox" id="ingat-saya" className="mr-2" />
            <label htmlFor="ingat-saya">Ingat Saya</label>
            <span className="mx-20"> </span>
          </div>
          <div className="flex justify-center text-center mt-4 text-base text-black">
            <span>Sudah Punya Akun? </span>
            <span className="mx-20"> </span>
            <a href="/login" className="hover:underline">
              Bergabung Disini
            </a>
          </div>
          <div className="flex text-base">
            <span>Masukkan kode referal untuk reward! </span>
            <span className="mx-15"> </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <input
              type="kode"
              placeholder="Masukkan Kode"
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-448px h-50 shadow shadow-black shadow-opacity-25 shadow-radius-1"
              style={{ width: '448px'}}
            />
          </div>
          <div className="flex justify-center items-center mt-4 text-base">
            <span>Atau</span>
          </div>
          <span className="m-2"> </span>
          <div className="flex justify-center items-center ml-4">
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

export default RegisterPage;
