'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Motor = ({ motor }) => {
  const router = useRouter();

  const handleFormRedirect = () => {
    router.push('/form');
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center">
      <div className="flex justify-center mb-4">
        <Image
          src={`https://rental-motor.ruscarestudent.com/storage/${motor.gambar_motor}`}
          alt={motor.nama_motor}
          width={1000}
          height={1000}
          className="rounded-lg"
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-black">{motor.nama_motor}</h3>
        <div className="mb-2">
          <span className="font-bold text-black">Daily: </span>
          <span className="font-bold text-black">{motor.harga_motor_per_1_hari.toLocaleString('id-ID')}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold text-black">Weekly: </span>
          <span className='font-bold text-black'>{motor.harga_motor_per_1_minggu.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex flex-col items-center mb-2">
          <button onClick={handleFormRedirect} className="bg-[#FF4D30] hover:bg-red-800 text-white py-2 px-4 sm:px-6 rounded mb-2">Booking Now!</button>
          <a href="/detail" className="hover:underline text-[#FF4D30] py-2 px-4 sm:px-6">Lihat detail</a>
        </div>
      </div>
    </div>
  );
};

const MotorList = () => {
  const [selectedFilter, setSelectedFilter] = useState('Rekomendasi');
  const [motors, setMotors] = useState([]);
  const [filteredMotors, setFilteredMotors] = useState([]);

  useEffect(() => {
    const fetchMotors = async () => {
      const token = Cookies.get('token');

      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/list-motor/all', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        // Log the raw response
        console.log('Raw response:', response);

        // Check if the response is not ok and throw an error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Ensure the response is in JSON format
        const data = await response.json();
        console.log('JSON response:', data);

        if (data.status === 200) {
          setMotors(data.listMotor);
          setFilteredMotors(data.listMotor); // Initialize with all motors
        } else {
          console.error('Unexpected response status:', data.status);
        }
      } catch (error) {
        console.error('Error fetching motor data:', error);
      }
    };

    fetchMotors();
  }, []);

  useEffect(() => {
    let filtered = motors;

    if (selectedFilter !== 'All') {
      filtered = motors.filter(motor => {
        if (selectedFilter === 'Matic') {
          return motor.tipe_motor.includes('Matic');
        }
        if (selectedFilter === 'Sport') {
          return motor.tipe_motor === 'Sport';
        }
        return true;
      });
    }

    setFilteredMotors(filtered);
  }, [selectedFilter, motors]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-5 bg-white min-h-screen w-full overflow-x-hidden">
        <div className="w-full max-w-6xl mb-5">
          <div className="flex justify-between items-center">
            <h1 className="text-sm sm:text-2xl lg:text-3xl font-bold text-black">Pilihan Motor</h1>
            <div className="flex gap-1 sm:gap-3">
              {['All', 'Matic', 'Sport'].map(filter => (
                <button
                  key={filter}
                  className={`py-2 px-3 sm:px-4 lg:px-6 border-b-2 ${selectedFilter === filter ? 'border-[#FF4D30]' : 'border-transparent'}`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  <span className="text-sm sm:text-base lg:text-lg text-black">{filter}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredMotors.map((motor, index) => (
            <Motor key={index} motor={motor} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MotorList;
