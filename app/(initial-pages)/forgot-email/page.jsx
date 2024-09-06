'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button as TailwindButton } from '@material-tailwind/react';
import Input from '@/components/ui/input';
import { sendOtpEmail } from '@/utils/services/fetchForgotOtp';
import { fetchUser } from '@/utils/services/fetchUser'; // Import the fetchUser function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setError('Silakan masukkan alamat email yang valid.');
      return;
    }

    try {
      // Assuming you have a token stored in localStorage or obtained from somewhere
      const token = localStorage.getItem('token');
      const users = await fetchUser(token);

      const userExists = users.some((user) => user.email === email);

      if (!userExists) {
        setError('Email tidak ditemukan.');
        return;
      }

      await handleSendOtp(email);
      router.push('/forgot-otp');
    } catch (error) {
      setError('Terjadi kesalahan saat memverifikasi email. Silakan coba lagi.');
      console.error('Error:', error);
    }
  };


  const handleSendOtp = async (email) => {
    try {
      const otp = await sendOtpEmail(email);
      console.log(otp);
      setMessage('OTP sudah terkirim ke email anda.');
      localStorage.setItem('email', email); // Store email in localStorage
      localStorage.setItem('otp', otp); // Store email in localStorage
      localStorage.setItem('message', message); // Store email in localStorage
    } catch (error) {
      console.error('Error:', error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      localStorage.setItem('message', message); // Store email in localStorage
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-4 bg-gray-300">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row">

        {/* Form Section */}
        <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-4">
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="text-[#ff4d33] hover:text-[#b15143] text-left flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Kembali
            </button>
          </div>

          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 text-black">Reset Kata Sandi</h1>
          <h3 className="text-base md:text-lg mt-4 text-black">Silahkan isi alamat email anda</h3>
          {error && <div className="text-red-500 ">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="input-animated bg-white text-black mt-2 md:mt-3 p-2 border border-black focus:outline-none rounded-lg w-full h-10 md:h-12 shadow"
            />
            <div className="flex mt-4 w-full justify-start">
              <TailwindButton type="submit" className="w-full md:w-96 before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-full before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Kirim Kode OTP</span>
              </TailwindButton>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/images/reset.png"
            alt="Reset"
            className="object-cover h-64 md:h-full w-full rounded-lg md:rounded-r-lg"
          />
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

export default ForgotEmail;
