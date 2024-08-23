import React from 'react';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

const DetailMotor = ({ motor }) => {
    const statusColor = motor.status_motor === 'Tidak Tersedia'
        ? 'text-red-500'
        : motor.status_motor === 'Tertunda'
            ? 'text-yellow-500'
            : 'text-green-500';


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
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 w-1/3">
                            <div className='mb-4 md:mb-0'>
                                <p className="text-black text-sm md:text-base font-bold">Harian:</p>
                                <p className="text-black text-lg md:text-xl font-bold">{motor.harga_motor_per_1_hari?.toLocaleString('id-ID')}</p>
                            </div>
                            <div>
                                <p className="text-black text-sm md:text-base font-bold">Mingguan:</p>
                                <p className="text-black text-lg md:text-xl font-bold">{motor.harga_motor_per_1_minggu?.toLocaleString('id-ID')}</p>
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
                            <p className="text-black text-xl font-bold">Stok:</p>
                            <p className="text-black text-base font-medium">{motor.stok_motor}</p>
                        </div>
                        <div className='mb-4'>
                            <p className="text-black text-xl font-bold">Fasilitas:</p>
                            <p className="text-black text-base font-medium">{motor.fasilitas_motor}</p>
                        </div>
                        <div className='mb-10'>
                            <p className="text-black text-xl font-bold">Status:</p>
                            <div className={`flex items-center ${statusColor}`}>
                                <span className="h-4 w-4 rounded-full bg-current mr-2"></span>
                                <p className="text-lg font-medium">{motor.status_motor}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 md:flex-row md:space-x-5 md:space-y-0">
                            <Link href="/catalog">
                                <Button className="before:ease bg-white border-2 text-[#FF4D33] border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#FF4D33] before:duration-300 hover:text-white hover:border-2 hover:border-white hover:shadow-white hover:before:h-64 hover:before:-translate-y-32">
                                    <span className="relative text-base z-10">Cek Motor Lainnya</span>
                                </Button>
                            </Link>
                            <Link href={`/form/${motor.id}`}>
                                <Button className="before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                                    <span className="relative text-base z-10">Pesan Sekarang!</span>
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMotor;
