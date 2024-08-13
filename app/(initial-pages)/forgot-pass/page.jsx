'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';
import Cookies from 'js-cookie';

const ForgotPass = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const user = data.user.find((user) => user.email === email);
        if (user) {
          setUserId(user.id);
        } else {
          setMessage('Email tidak ditemukan.');
        }
      } else {
        setMessage('Failed to fetch user data. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (userId) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/account/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: newPassword }),
        });
        if (response.ok) {
          router.push('/login');
        } else {
          alert('Failed to update password. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('User ID not found.');
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
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-black">Reset Your Password</h1>
          <p className="text-md text-black mb-4">{message}</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="input-animated w-full max-w-xs p-2 border bg-white text-black border-black focus:outline-none rounded-lg shadow text-center"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="input-animated w-full max-w-xs p-2 border bg-white text-black border-black focus:outline-none rounded-lg shadow text-center mt-4"
          />
          <div className="flex mt-4 w-full max-w-xs">  {/* Ensure max-width here matches inputs */}
            <Button type="button" onClick={handleSubmit} className="w-full before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
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
