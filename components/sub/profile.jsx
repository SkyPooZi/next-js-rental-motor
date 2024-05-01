"use client";

import { React, useState } from "react";

import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";

export default function Profile() {
    const [clickedLaki, setClickedLaki] = useState(false);

    const handleClickLaki = () => {
        setClickedLaki(true);
        setClickedPerempuan(false);
    };

    const [clickedPerempuan, setClickedPerempuan] = useState(false);

    const handleClickPerempuan = () => {
        setClickedPerempuan(true);
        setClickedLaki(false);
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 bg-white py-5 px-5 rounded-md">
                <Label>
                    <span className="font-medium text-base">
                        Profil Saya
                    </span>
                </Label>
                <Label>
                    <span className="font-medium">
                        Foto Profil
                    </span>
                </Label>
                <div className="">
                    <Button>
                        <span className="font-medium text-xs">
                            Pilih Foto
                        </span>
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        <span>
                            Nama Lengkap
                        </span>
                    </Label>
                    <Input type="text" placeholder="Nama Anda" value='Adam Aji Langit' />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        <span>
                            Email
                        </span>
                    </Label>
                    <Input type="email" placeholder="Email Anda" value='adam.aji2007@gmail.com' disabled />
                </div>
                <div className="w-full flex flex-row justify-end">
                    <Button>
                        <span className="font-medium text-xs">
                            Simpan Perubahan
                        </span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-5 bg-white py-5 px-5 rounded-md">
                <Label>
                    <span className="font-medium text-base">
                        Data Pribadi
                    </span>
                </Label>
                <div className="flex flex-col gap-2">
                    <Label>
                        <span>
                            No. Telepon
                        </span>
                    </Label>
                    <Input type="text" placeholder="No. Telepon" value='081234567890' />
                </div>
                <div className="flex flex-col gap-5">
                    <Label>
                        <span>
                            Jenis Kelamin
                        </span>
                    </Label>
                    <div className="flex flex-row gap-3">
                        <div className={`flex flex-row gap-1 cursor-pointer items-center ${clickedLaki ? 'clicked' : ''}`} onClick={handleClickLaki}>
                            {clickedLaki ? <FaRegDotCircle color='#0194F3' className='' size='18' /> : <FaRegCircle className='' size='18' />}
                            <span className='font-medium text-base'>
                                Laki-laki
                            </span>
                        </div>
                        <div className={`flex flex-row gap-1 cursor-pointer items-center ${clickedLaki ? 'clicked' : ''}`} onClick={handleClickPerempuan}>
                            {clickedPerempuan ? <FaRegDotCircle color='#0194F3' className='' size='18' /> : <FaRegCircle className='' size='18' />}
                            <span className='font-medium text-base'>
                                Perempuan
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>
                            <span>
                                Alamat
                            </span>
                        </Label>
                        <Textarea placeholder='Alamat User' />
                    </div>
                    <div className="w-full flex flex-row justify-end">
                        <Button>
                            <span className="font-medium text-xs">
                                Simpan Perubahan
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white py-5 px-5 rounded-sm">
                <Label>
                    <span className="font-medium text-base">
                        Ubah Email
                    </span>
                </Label>
                <div className="border-t border-[#FF4D30]"></div>
                <div className="flex flex-col gap-2 mt-1">
                    <Label>
                        <span>
                            Email Baru
                        </span>
                    </Label>
                    <Input type="email" placeholder="Email Baru" value='adam.aji2007@gmail.com' />
                </div>
                <div className="w-full flex flex-row justify-end mt-2">
                    <Button>
                        <span className="font-medium text-xs">
                            Ubah Email
                        </span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white py-5 px-5 rounded-sm">
                <Label>
                    <span className="font-medium text-base">
                        Ubah Kata Sandi
                    </span>
                </Label>
                <div className="border-t border-[#FF4D30]"></div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex flex-row gap-1">
                            <Label>
                                <span className="">
                                    Kata Sandi Lama
                                </span>
                            </Label>
                            <Label>
                                <span className="text-[#FF4D30]">
                                    *
                                </span>
                            </Label>
                        </div>
                        <Input type="password" placeholder="Masukkan Kata Sandi Lama" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1">
                            <Label>
                                <span className="">
                                    Kata Sandi Baru
                                </span>
                            </Label>
                            <Label>
                                <span className="text-[#FF4D30]">
                                    *
                                </span>
                            </Label>
                        </div>
                        <Input type="password" placeholder="Masukkan Kata Sandi Baru" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1">
                            <Label>
                                <span className="">
                                    Konfirmasi Kata Sandi Baru
                                </span>
                            </Label>
                            <Label>
                                <span className="text-[#FF4D30]">
                                    *
                                </span>
                            </Label>
                            {/* <Label>
                                <span className="text-[#FF4D30] font-medium">
                                    Kata Sandi Baru tidak sama
                                </span>
                            </Label> */}
                        </div>
                        <Input type="password" placeholder="Konfirmasi Kata Sandi Baru" />
                    </div>
                    <div className="w-full flex flex-row justify-end">
                        <Button>
                            <span className="font-medium text-xs">
                                Simpan Kata Sandi
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}