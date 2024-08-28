'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';
import { sendOtpEmail } from '@/utils/services/fetchForgotOtp';

const ForgotOTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedOTP = localStorage.getItem('otp');
    const storedMessage = localStorage.getItem('message');
    if (storedEmail) {
      setEmail(storedEmail);
      setSentOtp(storedOTP);
      setMessage(storedMessage);
    } else {
      router.push('/forgot-email');
    }
  }, [router]);

  const handleSendOtp = async (email) => {
    try {
      const otp = await sendOtpEmail(email);
      setSentOtp(otp);
      setMessage('OTP sudah terkirim ke email anda.');
      setError('');
      console.log(otp);
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    console.log('OTP Set verify:', enteredOtp);
    console.log('OTP Set:', sentOtp);
    if (enteredOtp === `${sentOtp}`) {
      router.push('/forgot-pass');
    } else {
      setError('OTP tidak valid. Silakan coba lagi.');
      setMessage('');
    }
  };

  const handleOTPChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      if (index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    } else {
      e.target.value = otp[index];
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = () => {
    if (otp.every((num) => num !== '')) {
      verifyOtp();
    } else {
      setError('Harap isi semua kolom.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-300 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row">

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/images/reset.png"
            alt="Reset"
            className="object-cover h-64 md:h-full w-full rounded-lg md:rounded-l-lg"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-black">Konfirmasi Email Dengan OTP</h1>
          {error && <div className="text-red-500 mb-2 md:mb-4">{error}</div>}
          <p className="text-md text-black mb-4">{message}</p>
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <div className="flex justify-between w-full max-w-xs space-x-2 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputsRef.current[index] = ref)}
                  type="text"
                  className="w-12 h-12 overflow-hidden text-4xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  pattern="\d*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onInput={(e) => {
                    if (e.target.value.length > 1) {
                      e.target.value = e.target.value[0];
                    }
                  }}
                />
              ))}
            </div>
            <div className="flex mt-4 w-full">
              <Button type="button" onClick={handleSubmit} className="w-full before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Berikutnya</span>
              </Button>
            </div>
            <div className="flex mt-4 w-full">
              <Button type="button" onClick={() => handleSendOtp(email)} className="w-full before:ease bg-[#2196f3] border-2 border-[#2196f3] capitalize relative overflow-hidden shadow-[#2196f3] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#2196f3] hover:border-2 hover:border-[#2196f3] hover:shadow-[#2196f3] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Resend OTP</span>
              </Button>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .input-animated {
          transition: border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .input-animated:hover,
        .input-animated:focus {
          transform: scale(1.05);
          border-color: #FF4D33;
        }
      `}</style>
    </div>
  );
};

export default ForgotOTP;
