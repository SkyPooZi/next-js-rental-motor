'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPass = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    console.log('Stored email:', storedEmail);
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserId(storedEmail);
    } else {
      router.push('/forgot-email'); // Redirect if no email found
    }
  }, [router]);

  const fetchUserId = async (email) => {
    try {
      const response = await fetch('https://415d-2001-448a-406f-12e7-4642-c87e-9b1-fbb6.ngrok-free.app/api/user/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer 4|EKzYACQsN5zLTUUpcJmp2i9fJYhpuy1DGQbEmmg9bf8b6a26`,
        },
      });

      console.log('Fetch response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('User data:', data);
        const user = data.find((user) => user.email === email);
        if (user) {
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
    } else {
      if (userId) {
        try {
          const response = await fetch(`https://415d-2001-448a-406f-12e7-4642-c87e-9b1-fbb6.ngrok-free.app/api/user/edit/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 4|EKzYACQsN5zLTUUpcJmp2i9fJYhpuy1DGQbEmmg9bf8b6a26`,
            },
            body: JSON.stringify({ password: newPassword }),
          });

          console.log('Password change response:', response);

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
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-red-800 w-full max-w-md lg:max-w-xs"
              >
                Ubah Kata Sandi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
