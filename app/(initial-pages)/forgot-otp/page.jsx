'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';

const ForgotOTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentOtp, setSentOtp] = useState(''); // Store the sent OTP for verification

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
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        const otp = data.OTP;
        setSentOtp(otp);
        setMessage('OTP sudah terkirim ke email anda.');
        console.log(otp);
      } else {
        setMessage('Gagal untuk mengirim OTP, cek kembali email yang anda isikan.');
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
    if (otp.every((num) => num !== '')) {
      verifyOtp();
    } else {
      alert('Please fill in all fields.');
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
                  className="input-animated border bg-white text-black border-black focus:outline-none rounded-lg text-center shadow w-12 h-12"
                  required
                />
              ))}
            </div>
            <div className="flex mt-4 w-full">
              <Button type="button" onClick={handleSubmit} className="w-full before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Berikutnya</span>
              </Button>
            </div>
            <div className="flex mt-4 w-full">
              <Button type="button" onClick={() => sendOtpEmail(email)} className="w-full before:ease bg-[#2196f3] border-2 border-[#2196f3] capitalize relative overflow-hidden shadow-[#2196f3] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#2196f3] hover:border-2 hover:border-[#2196f3] hover:shadow-[#2196f3] hover:before:h-96 hover:before:-translate-y-48">
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
