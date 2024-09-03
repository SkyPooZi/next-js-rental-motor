'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavbarAfter from '@/components/sub/main/NavbarAfter';
import Footer from '@/components/sub/main/Footer';
import { useRouter } from 'next/navigation';
import fetchCatalog from '@/utils/services/fetchCatalog';
import { Button } from '@material-tailwind/react';

import '../../styles/slideInFoward.css';
import '../../styles/slideInAnimation.css';

const Motor = ({ motor }) => {
  const router = useRouter();

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);

    const hour = date.getHours();
    let timeOfDay = '';

    if (hour >= 0 && hour < 11) {
      timeOfDay = 'pagi';
    } else if (hour >= 11 && hour < 15) {
      timeOfDay = 'siang';
    } else if (hour >= 15 && hour < 19) {
      timeOfDay = 'sore';
    } else {
      timeOfDay = 'malam';
    }

    const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    return `${formattedDate}, ${formattedTime} ${timeOfDay}`;
  };

  const handleFormRedirect = (motorId) => {
    router.push(`/form/${motorId}`);
  };

  const handleDetailRedirect = (id) => {
    router.push(`/detail/${id}`);
  };

  const isAvailable = !motor.tanggal_mulai_tidak_tersedia && !motor.tanggal_selesai_tidak_tersedia;

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center">
      <div className="flex justify-center mb-4">
        <div className="w-full h-64 flex justify-center items-center overflow-hidden rounded-lg">
          <Image
            src={`https://rental-motor.ruscarestudent.com/storage/${motor.gambar_motor}`}
            alt={motor.nama_motor}
            width={400} // Fixed width
            height={300} // Fixed height
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="text-center w-full p-5">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-black">{motor.nama_motor}</h3>
        <div className='flex justify-between'>
          <div className="mb-2 flex flex-col gap-2">
            <span className="font-bold text-black/70">Harian : </span>
            <span className="font-bold text-black">{`Rp ${motor.harga_motor_per_1_hari.toLocaleString('id-ID')}`}</span>
          </div>
          <div className="mb-4 flex flex-col gap-2 text-end">
            <span className="font-bold text-black/70">Mingguan : </span>
            <span className='font-bold text-black'>{`Rp ${motor.harga_motor_per_1_minggu.toLocaleString('id-ID')}`}</span>
          </div>
        </div>

        <div className="mb-6">
          <p className={`text-lg font-bold ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>{motor.status_motor}</p>
          {motor.tanggal_selesai_tidak_tersedia && (
            <p className="text-md font-medium text-red-500">{formatDate(motor.tanggal_mulai_tidak_tersedia)} - {formatDate(motor.tanggal_selesai_tidak_tersedia)}</p>
          )}
        </div>

        <div className={`flex flex-col items-center mb-2 ${motor.status_motor === "Tersedia" ? `mt-24` : ''}`}>
          <Button onClick={() => handleFormRedirect(motor.id)} className="before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
            <span className="relative text-base z-10">Sewa Sekarang!</span>
          </Button>
          <button onClick={() => handleDetailRedirect(motor.id)} className="hover:underline text-[#FF4D30] py-2 px-4 sm:px-6">Lihat detail</button>
        </div>
      </div>
    </div>
  );
};

const MotorList = () => {
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [motors, setMotors] = useState([]);
  const [filteredMotors, setFilteredMotors] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchMotorsData = async () => {
      const motors = await fetchCatalog();
      setMotors(motors);
      setFilteredMotors(motors);
    };

    fetchMotorsData();
  }, []);

  useEffect(() => {
    let filtered = motors;

    if (selectedFilter !== 'Semua') {
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
    setAnimate(false);
    setTimeout(() => setAnimate(true), 0);
  }, [selectedFilter, motors]);

  if (!motors) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
      </div>
    );
  }

  return (
    <>
      <NavbarAfter />
      <div className="flex flex-col items-center p-5 bg-white min-h-screen w-full overflow-x-hidden">
        <div className="w-full max-w-6xl mb-5">
          <div className="flex justify-between items-center">
            <h1 className="text-sm sm:text-2xl lg:text-3xl font-bold text-black">Pilihan Motor</h1>
            <div className="flex gap-1 sm:gap-3 mb-4">
              {['Semua', 'Matic', 'Sport'].map(filter => (
                <button
                  key={filter}
                  className={`py-2 px-3 sm:px-4 lg:px-6 border-b-2 border-transparent border-slide hover:text-[#ff4d30] ${selectedFilter === filter ? 'border-slide-active text-[#ff4d30]' : ''}`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  <span className="text-sm sm:text-base lg:text-lg">{filter}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl overflow-x-hidden ${animate ? 'slide-in' : ''}`}>
          {filteredMotors
          .filter((motor) => motor.is_hidden !== 1)
          .map((motor, index) => (
            <Motor key={index} motor={motor} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MotorList;