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
    console.log('Stored email:', storedEmail);
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserId(storedEmail);
      console.log(storedEmail);
    } else {
      router.push('/forgot-email'); // Redirect if no email found
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

      console.log('Fetch response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('User data:', data);
        console.log('Type of data:', typeof data);
        const user = data.user.find((user) => user.email === email);
        if (user) {
          console.log('User data find: ', user)
          setUserId(user.id);
          console.log('User ID:', user.id);
        } else {
          setMessage('Email not found.');
        }
      } else {
        const errorText = await response.text();
        console.error('Error fetching user data:', errorText);
        setMessage(`Failed to fetch user data. Please try again. ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (newPassword === '' || confirmPassword === '') {
      alert('Please fill in both fields.');
    } else if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      console.log(newPassword);
      console.log(confirmPassword);
    } else {
      console.log(userId);
      if (userId) {
        try {
          console.log(newPassword);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/account/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }),
          });

          console.log('Password change response:', response);
          const data = await response.json();
          console.log('Update data:', data);

          if (response.ok) {
            router.push('/login');
          } else {
            const errorText = await response.text();
            console.error('Error updating password:', errorText);
            alert(`Failed to update password. Please try again. ${errorText}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      } else {
        alert('User ID not found.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col lg:flex-row">
        <img
          src="/images/reset.png"
          alt="Reset"
          className="w-full lg:w-1/2 md:1/3 h-auto object-cover lg:object-contain mb-6 lg:mb-0"
        />
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 lg:px-12">
          <h1 className="text-3xl font-bold mb-6 text-center lg:text-left text-black">Reset Kata Sandi</h1>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-md text-black mb-4">{message}</p>
            <input
              type="password"
              placeholder="Kata Sandi Baru"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="mt-4 lg:mt-0 bg-white text-black p-2 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg shadow w-full max-w-md lg:max-w-xs"
            />
            <input
              type="password"
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="p-2 border bg-white text-black border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg shadow w-full max-w-md lg:max-w-xs"
            />
            <div className="flex mt-4 w-full">
              <Button type="button" onClick={handleSubmit} className="w-full before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-96 before:origin-center before:-translate-x-40 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-96 hover:before:-translate-y-48">
                <span className="relative text-base z-10">Ubah Kata Sandi</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
