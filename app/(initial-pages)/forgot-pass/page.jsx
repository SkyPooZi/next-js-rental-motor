'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { fetchUserIdByEmail, updatePassword } from '@/utils/services/fetchForgotPass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ForgotPass = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserId(storedEmail);
    } else {
      router.push('/forgot-email');
    }
  }, [router]);

  const fetchUserId = async (email) => {
    try {
      const id = await fetchUserIdByEmail(email); // Use the fetch function
      setUserId(id);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Harap isi semua kolom.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Kata sandi tidak cocok.');
      return;
    }
    if (userId) {
      try {
        await updatePassword(userId, newPassword); // Use the updatePassword function
        router.push('/login');
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Pengguna tidak ditemukan.');
      console.log('User ID not found.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-300 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/images/reset.png"
            alt="Reset"
            className="object-cover h-64 md:h-full w-full rounded-lg md:rounded-l-lg"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 items-center justify-center">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-black text-center">Reset Your Password</h1>
          {error && <div className="text-red-500 mb-2 md:mb-4">{error}</div>}
          <p className="text-md text-black mb-4 text-center">{message}</p>

          <div className="relative w-full max-w-xs justify-start items-center">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="input-animated w-full p-2 border bg-white text-black border-black focus:outline-none rounded-lg shadow pr-10"
            />
            <button
              type="button"
              onClick={toggleShowNewPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none eye-animated"
            >
              <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="relative w-full max-w-xs mt-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input-animated w-full p-2 border bg-white text-black border-black focus:outline-none rounded-lg shadow pr-10"
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="flex mt-4 w-full max-w-xs">
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48"
            >
              <span className="relative text-base z-10">Change Password</span>
            </Button>
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

export default ForgotPass;
