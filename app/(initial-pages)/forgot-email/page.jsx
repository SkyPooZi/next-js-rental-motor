'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';

const ForgotEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    localStorage.setItem('email', email); // Store email in localStorage
    console.log(email);
    router.push('/forgot-otp');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src="/images/reset.png"
          alt="Reset"
          className="w-3/4 md:w-1/2 object-cover md:mr-10 mb-4 md:mb-0"
        />
        <div className="flex flex-col items-start w-full px-4 md:px-0">
          <h1 className="text-2xl md:text-4xl font-bold text-black">Reset Kata Sandi</h1>
          <h3 className="text-1xl md:text-2xl mt-4 text-black">Silahkan isi alamat email anda</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full items-start">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="mt-4 p-2 border bg-white text-black border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg w-11/12 md:w-96 h-12 shadow shadow-black shadow-opacity-25"
            />
            <div className="flex mt-4 w-full justify-start">
              <Button type="submit" className="w-96 before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Kirim Kode OTP</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotEmail;
