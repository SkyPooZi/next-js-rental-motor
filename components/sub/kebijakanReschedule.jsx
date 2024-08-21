import React from 'react';
import Image from 'next/image';
import { PiScroll } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';
import { FaCircleCheck } from "react-icons/fa6";
import Modal from './rescheduleFormModal';

const KebijakanDetails = ({ gambarMotor, openModal, isModalOpen, closeModal }) => {
    return (
        <div className='hidden lg:flex flex-col rounded-xl px-5 py-5 items-center gap-3 bg-white'>
            <div className="w-[200px] h-[150px] relative">
                {gambarMotor && (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${gambarMotor.gambar_motor}`}
                        alt={gambarMotor.nama_motor}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                    />
                )}
            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex flex-row gap-2 items-center '>
                    <PiScroll className='' size='25' color='black' />
                    <span className='font-bold text-black text-sm'>
                        Kebijakan Pembatalan & Penjadwalan Ulang
                    </span>
                </div>
                <div className='flex flex-row gap-2 items-center justify-start '>
                    <MdCancel
                        className='' color='grey' size='25'
                    />
                    <span className='font-bold text-black text-sm'>
                        Pemesanan ini tidak dapat di refund
                    </span>
                </div>
                <div className='flex flex-row gap-2 items-center justify-start '>
                    <FaCircleCheck
                        className='' color='#0BC175' size='22'
                    />
                    <span className='font-bold text-black text-sm'>
                        Dapat dijadwalkan ulang
                    </span>
                </div>
                <div className='cursor-pointer'>
                    <a className=" text-[#FF4D30]" onClick={openModal}>Lihat Detail</a>
                    <Modal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
    );
};

export default KebijakanDetails;
