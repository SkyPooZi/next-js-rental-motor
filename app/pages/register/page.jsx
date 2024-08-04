'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama_pengguna: '',
    email: '',
    password: '',
    kode_referensi: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createUserResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (createUserResponse.ok) {
        const responseData = await createUserResponse.json();
        const token = responseData.access_token;

        // Save token in cookies
        Cookies.set('token', token);

        router.push('/');
      } else {
        const errorData = await createUserResponse.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('An unexpected error occurred');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      // Exchange the code for an access token
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/google/callback?code=${code}&state=${state}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            // Save the token (if needed) and redirect to the homepage
            Cookies.set('token', data.token);
            router.push('/');
          } else {
            setError('Login failed');
          }
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          setError('An unexpected error occurred');
        });
    }
  }, [router]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/login/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/login/facebook`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col md:flex-row bg-white w-full max-w-5xl">
        <img
          src="/images/register.png"
          alt="register"
          className="w-full md:w-1/2 object-cover mb-4 md:mb-0 md:mr-4"
        />
        <div className="flex flex-col w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-black text-center md:text-left">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center md:items-start">
            <input
              type="text"
              name="nama_pengguna"
              value={formData.nama_pengguna}
              onChange={handleChange}
              placeholder="Nama Pengguna"
              className="bg-white text-black mt-2 md:mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-full max-w-sm h-10 md:h-12 shadow"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-full max-w-sm h-10 md:h-12 shadow"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Kata Sandi"
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-full max-w-sm h-10 md:h-12 shadow"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="bg-[#FF4D30] mt-4 text-white font-bold py-2 px-4 rounded-lg h-10 md:h-12 shadow hover:bg-red-600 w-full max-w-sm"
            >
              Register
            </button>
          </form>
          <div className="flex justify-center md:justify-start mt-4 text-black">
            <input type="checkbox" id="ingat-saya" className="mr-2" />
            <label htmlFor="ingat-saya">Ingat Saya</label>
          </div>
          <div className="flex justify-center md:justify-start mt-4 text-base text-black">
            <span>Sudah Punya Akun? </span>
            <a href="/login" className="ml-1 hover:underline">
              Bergabung Disini
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start mt-4 text-base">
            <span className='text-black'>Masukkan kode referal untuk reward! </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center mt-3">
            <input
              type="text"
              name="kode_referensi"
              value={formData.kode_referensi}
              onChange={handleChange}
              placeholder="Masukkan Kode"
              className="bg-white text-black mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-full max-w-sm h-10 md:h-12 shadow"
            />
          </div>
          <div className="flex justify-center items-center md:justify-start mt-4 text-base">
            <span>Atau</span>
          </div>
          <div className="flex justify-center md:justify-start items-center mt-2 gap-2">
            <button onClick={handleGoogleLogin} className="flex md:px-6 md:py-3 items-center justify-center rounded-lg p-2 shadow hover:bg-gray-300">
              <img
                src="/images/google.png"
                alt="Google"
              />
            </button>
            <button onClick={handleFacebookLogin} className="flex md:px-6 md:py-3 items-center justify-center bg-blue-900 hover:bg-blue-700 rounded-lg p-2 shadow ">
              <img
                src="/images/facebook.png"
                alt="Facebook"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
