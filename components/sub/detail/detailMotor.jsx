// SwiperComponent.js
import React from 'react';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

const DetailMotor = ({ motor }) => {
    const statusColor = motor.status_motor === 'Tidak Tersedia' ? 'text-red-500' : 'text-green-500';

    return (
        <>
            <div className="mx-view-pc flex flex-row my-20">
                <div className="bg-[#F2F2F2] rounded-lg shadow-md mr-20 items-center justify-center px-10">
                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${motor.gambar_motor}`} alt={motor.nama_motor} width={384} height={384} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-black">Motor {motor.nama_motor}</h2>
                    <div className="flex justify-between w-1/2 mt-6 mb-4">
                        <div className='mr-5'>
                            <p className="text-black text-base font-bold">Harian:</p>
                            <p className="text-black text-xl font-bold">{motor.harga_motor_per_1_hari?.toLocaleString('id-ID')}</p>
                        </div>
                        <div className='ml-5'>
                            <p className="text-black text-base font-bold">Mingguan:</p>
                            <p className="text-black text-xl font-bold">{motor.harga_motor_per_1_minggu?.toLocaleString('id-ID')}</p>
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
                            <span className="h-4 w-2 rounded-full bg-current mr-2"></span>
                            <p className="text-xl font-medium">{motor.status_motor}</p>
                        </div>
                    </div>
                    <div>
                        <Link href="/catalog">
                            <Button className="mr-5 before:ease bg-white border-2 text-[#FF4D33] border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#FF4D33] before:duration-300 hover:text-white hover:border-2 hover:border-white hover:shadow-white hover:before:h-64 hover:before:-translate-y-32">
                                <span className="relative text-base z-10">Cek Motor Lainnya</span>
                            </Button>
                        </Link>
                        <Link href={`/form/${motor.id}`}>
                            <Button className="ml-5 before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                                <span className="relative text-base z-10">Booking Sekarang</span>
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailMotor;
