'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      alert('Email or password cannot be empty');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response body:', await response.text());
        throw new Error('Login failed');
      }

      const data = await response.json();
      const user = data.user;
      const token = data.access_token;
      const id = user.id;

      console.log('role zidan', user.peran)

      Cookies.set('token', token);
      Cookies.set('id', id);
      Cookies.set('role', user.peran);

      if (user && user.email === email) {
        if (user.peran === 'admin') {
          router.push('/admin');
        } else{
          router.push('/');
        }
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get('returnUrl') || '/';

        router.push(returnUrl);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      router.push('/');
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/login/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/login/facebook`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src="/images/login.png"
          alt="Login"
          className="w-full md:w-1/2 lg:w-auto h-auto object-cover mb-4 md:mb-0 md:mr-10"
        />
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-black">Login</h1>
          {error && <div className="text-red-500 mb-2 md:mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center w-full">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="bg-white text-black mt-2 md:mt-3 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-full md:w-80 lg:w-96 h-10 md:h-12 shadow"
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={handlePasswordChange}
              className="bg-white text-black mt-1 md:mt-2 p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-full md:w-80 lg:w-96 h-10 md:h-12 shadow"
            />
            <div className="flex items-center w-full mt-2 md:mt-4 text-black bg-white">
              <input
                type="checkbox"
                id="ingat-saya"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
              />
              <label htmlFor="ingat-saya">Ingat Saya</label>
              <span className="flex-grow"></span>
              <a href="/forgot-email" className="hover:underline">Lupa Kata Sandi?</a>
            </div>
            <button
              type="submit"
              className="bg-[#ff4d30] text-white font-bold py-2 px-4 rounded-lg h-10 md:h-12 w-full md:w-80 lg:w-96 hover:bg-red-600 mt-2 md:mt-4"
            >
              Login
            </button>
          </form>
          <div className="flex justify-center mt-2 md:mt-4 text-sm md:text-base text-black">
            <span>Belum punya akun?</span>
            <a href="/register" className="hover:underline ml-1 md:ml-2">Daftar di sini</a>
          </div>
          <div className="flex justify-center items-center mt-2 md:mt-4 text-sm md:text-base">
            <span>Atau</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-1 md:mt-2">
            <button onClick={handleGoogleLogin} className="flex md:px-6 md:py-3 items-center justify-center rounded-lg p-2 shadow hover:bg-gray-300">
              <img
                src="/images/google.png"
                alt="Google"
              />
            </button>
            <button onClick={handleFacebookLogin} className="flex items-center justify-center bg-blue-900 hover:bg-blue-700 rounded-lg px-4 py-2 md:px-6 md:py-3 shadow">
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

export default LoginPage;
