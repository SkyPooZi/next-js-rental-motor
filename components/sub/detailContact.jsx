import React from 'react';
import { Input, Radio } from '@material-tailwind/react';
import { Label } from '@/components/ui/label';

const DetailKontak = ({ nama_lengkap, setNamaLengkap, akun_sosmed, setAkunSosmed, email, setEmail, no_telp, setNoTelp, clickedPenyewaDiriSendiri, handleClickPenyewaDiriSendiri, clickedPenyewaOrangLain, handleClickPenyewaOrangLain }) => {
    return (
        <div className='w-full rounded-xl px-5 py-5 bg-white'>
            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                <Label>
                    <span className='font-extrabold text-black text-lg'>
                        Detail Kontak
                    </span>
                </Label>
                <span className='text-[#FF4D30] text-[14px]'>
                    Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                </span>
            </div>
            <div className='mt-10'>
                <div className='flex flex-col gap-8 '>
                    <div className='flex md:flex-row flex-col gap-5 w-full'>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Nama Lengkap <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                label="Masukkan nama lengkap"
                                value={nama_lengkap}
                                onChange={(e) => setNamaLengkap(e.target.value)}
                                required
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Akun Sosial Media <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                label="Masukkan akun sosmed"
                                value={akun_sosmed}
                                onChange={(e) => setAkunSosmed(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col gap-5 '>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Email <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                type='email'
                                label="Masukkan email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Nomor Telepon <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                type='number'
                                label="Masukkan no telp"
                                placeholder='08xxxxxxx'
                                value={no_telp}
                                onChange={(e) => setNoTelp(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className={`flex flex-row items-center cursor-pointer`}>
                            <Radio
                                checked={clickedPenyewaDiriSendiri}
                                onChange={handleClickPenyewaDiriSendiri}
                            />
                            Diri Sendiri
                        </div>
                        <div className={`flex flex-row items-center cursor-pointer`}>
                            <Radio
                                checked={clickedPenyewaOrangLain}
                                onChange={handleClickPenyewaOrangLain}
                            />
                            Orang Lain
                        </div>
                    </div>
                    <span className='text-[#757575] text-[14px]'>
                        Anda bisa memesan motor untuk orang lain dengan memilih opsi "Untuk Orang Lain"
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DetailKontak;
