import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const DetailMotor = ({ motor }) => {
    const router = useRouter();
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Get 'isHidden' cookie value when component mounts
        const hiddenValue = Cookies.get('isHidden');
        setIsHidden(hiddenValue === '1'); // Check if cookie value is '1'
    }, []);

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

    const isAvailable =
        !motor.tanggal_mulai_tidak_tersedia && !motor.tanggal_selesai_tidak_tersedia;

    const availabilityStatus = isAvailable
        ? 'Tersedia'
        : (
            <>
                Tidak tersedia dari{' '}
                <strong>{formatDate(motor.tanggal_mulai_tidak_tersedia)} hingga{' '}{formatDate(motor.tanggal_selesai_tidak_tersedia)}</strong>
            </>
        );

    const statusColor = motor.status_motor === 'Tidak Tersedia'
        ? 'text-red-500'
        : motor.status_motor === 'Tertunda'
            ? 'text-yellow-500'
            : 'text-green-500';

    const handleButtonClick = () => {
        if (!isHidden) {
            router.push(`/form/${motor.id}`);
        }
    };

    return (
        <div className="container mx-auto p-4 md:py-10">
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }

                .scale-in {
                    animation: scaleIn 0.8s ease-out forwards;
                }
            `}</style>

            <div className="fade-in">
                <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg overflow-hidden scale-in">
                    <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${motor.gambar_motor}`}
                            alt={motor.nama_motor}
                            width={500}
                            height={500}
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-4 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">Motor {motor.nama_motor}</h2>
                        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
                            <div className='mb-4 md:mb-0'>
                                <p className="text-black text-sm md:text-base font-bold">Harian:</p>
                                <p className="text-[#ff4d33] text-lg md:text-xl font-bold">{`Rp ${motor.harga_motor_per_1_hari.toLocaleString('id-ID')}`}</p>
                            </div>
                            <div className='md:ml-6'>
                                <p className="text-black text-sm md:text-base font-bold">Mingguan:</p>
                                <p className="text-[#ff4d33] text-lg md:text-xl font-bold">{`Rp ${motor.harga_motor_per_1_minggu.toLocaleString('id-ID')}`}</p>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className="text-black text-xl font-bold">Tipe:</p>
                            <p className="text-black text-base font-medium">{motor.tipe_motor}</p>
                        </div>
                        <div className='mb-4'>
                            <p className="text-black text-xl font-bold">Merk:</p>
                            <p className="text-black text-base font-medium">{motor.merk_motor}</p>
                        </div>
                        <div className='mb-4'>
                            <p className="text-black text-xl font-bold">Fasilitas:</p>
                            <p className="text-black text-base font-medium">{motor.fasilitas_motor}</p>
                        </div>
                        <div className="mb-10">
                            <p className="text-black text-xl font-bold">Status:</p>
                            <div className={`flex items-center ${statusColor}`}>
                                <span className="h-4 w-4 rounded-full bg-current mr-2"></span>
                                <p className="text-lg font-medium">{motor.status_motor}</p>
                            </div>
                            {motor.tanggal_selesai_tidak_tersedia && (
                                <p className="text-md font-medium text-red-500">{formatDate(motor.tanggal_mulai_tidak_tersedia)} - {formatDate(motor.tanggal_selesai_tidak_tersedia)}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-4 md:flex-row md:space-x-5 md:space-y-0">
                            <Link href="/catalog">
                                <Button className="before:ease bg-white border-2 text-[#FF4D33] border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#FF4D33] before:duration-300 hover:text-white hover:border-2 hover:border-white hover:shadow-white hover:before:h-64 hover:before:-translate-y-32">
                                    <span className="relative text-base z-10">Cek Motor Lainnya</span>
                                </Button>
                            </Link>
                            <div className="flex flex-col items-center mb-2">
                                <Button
                                    onClick={handleButtonClick}
                                    disabled={isHidden}
                                    className={`ml-1 before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32 ${isHidden ? 'cursor-not-allowed opacity-50' : ''}`}
                                >
                                    <span className="relative text-base z-10">Sewa Sekarang!</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMotor;
