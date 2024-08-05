'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ForgotOTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentOtp, setSentOtp] = useState(''); // Store the sent OTP for verification
  const token = Cookies.get('token');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      sendOtpEmail(storedEmail);
    } else {
      router.push('/forgot-email'); // Redirect if no email found
    }
  }, [router]);

  const sendOtpEmail = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        const otp = data.OTP;
        setSentOtp(otp);
        setMessage('OTP has been sent to your email.');
        console.log(otp)
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    console.log('OTP Set verify:', enteredOtp);
    console.log('OTP Set:', sentOtp);
    if (enteredOtp === `${sentOtp}`) {
      router.push('/forgot-pass');
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value) && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = value;
    console.log('OTP Set:', newOtp);
    setOtp(newOtp);

    // Focus on the next input field if it's not the last one
    if (value !== '' && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every(num => num !== '')) {
      verifyOtp();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-white h-screen">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl mx-auto">
        <img
          src="/images/reset.png"
          alt="Login"
          className="w-full lg:w-1/2 h-auto object-cover mb-4 lg:mb-0"
        />
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-black">Reset Kata Sandi</h1>
          <p className="text-md text-black mb-4">{message}</p>
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <div className="flex justify-between w-full max-w-xs space-x-2 mt-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  className="border bg-white text-black border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg text-center shadow w-12 h-12"
                  required
                />
              ))}
            </div>
            <div className="flex mt-4 w-full">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-800 w-full max-w-xs"
                style={{ height: '48px' }}
              >
                Berikutnya
              </button>
            </div>
            <div className="flex mt-4 w-full">
              <button
                type="button"
                onClick={() => sendOtpEmail(email)}
                className="bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-800 w-full max-w-xs"
                style={{ height: '48px' }}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotOTP;
