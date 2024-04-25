"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { PiScroll } from "react-icons/pi";
import { MdCancel, MdOutlineTimer } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { AiOutlineDollarCircle } from "react-icons/ai";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Modal from '@/components/sub/rescheduleModal';
import TermsModal from '@/components/sub/termsModal';

export default function page({ className }) {
    const currentDate = new Date();

    const [date, setDate] = useState({
        from: currentDate,
        to: addDays(currentDate, 1),
    });

    const [clickedUntukSaya, setClickedUntukSaya] = useState(false);

    const handleClickUntukSaya = () => {
        setClickedUntukSaya(true);
        setClickedUntukOrangLain(false);
    };

    const [clickedUntukOrangLain, setClickedUntukOrangLain] = useState(false);

    const handleClickUntukOrangLain = () => {
        setClickedUntukOrangLain(true);
        setClickedUntukSaya(false);
    };

    const [clickedDiantar, setClickedDiantar] = useState(false);

    const handleClickDiantar = () => {
        setClickedDiantar(true);
        setClickedAmbil(false);
    };

    const [clickedAmbil, setClickedAmbil] = useState(false);

    const handleClickAmbil = () => {
        setClickedAmbil(true);
        setClickedDiantar(false);
    };

    const [clickedTunai, setClickedTunai] = useState(false);

    const handleClickTunai = () => {
        setClickedTunai(true);
        setClickedCashless(false);
    }

    const [clickedCashless, setClickedCashless] = useState(false);

    const handleClickCashless = () => {
        setClickedCashless(true);
        setClickedTunai(false);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const openTermsModal = () => {
        setIsTermsModalOpen(true);
    }

    const closeTermsModal = () => {
        setIsTermsModalOpen(false);
    }

    return (
        <div className='h-full w-full px-24 py-16 bg-[#F6F7F9]'>
            <div className='text-[#666666]'>
                <span className='font-extrabold text-black text-xl hidden md:block'>
                    Booking
                </span>
                Pastikan semua detail pada halaman ini sudah benar sebelum melanjutkan ke pembayaran.
            </div>
            <div className='flex flex-row gap-5'>
                <div className='w-full rounded-xl mt-14 px-5 py-5 bg-white'>
                    <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                        <Label>
                            <span className='font-extrabold text-black text-xl  hidden md:block'>
                                Detail Kontak
                            </span>
                        </Label>
                        <span className='text-[#FF4D30] text-[14px]'>
                            Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                        </span>
                    </div>
                    <div className='mt-10'>
                        <div className='flex flex-col gap-8 '>
                            <div className='flex flex-row gap-5 w-full'>
                                <div className='text-black w-full'>
                                    <Label>
                                        Nama Lengkap
                                    </Label>
                                    <Input type="text" placeholder="Nama Anda" />
                                </div>
                                <div className='text-black w-full'>
                                    <Label>
                                        Akun Sosmed
                                    </Label>
                                    <Input type="text" placeholder="Instagram, Facebook, dll" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-5 '>
                                <div className='text-black w-full'>
                                    <Label>
                                        Email
                                    </Label>
                                    <Input type="email" placeholder="example@gmail" />
                                </div>
                                <div className='text-black w-full'>
                                    <Label>
                                        Nomor Telepon
                                    </Label>
                                    <Input type="number" placeholder="08xxxxxxx" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-12 mt-3 '>
                                <div className={`flex flex-row gap-3 cursor-pointer ${clickedUntukSaya ? 'clicked' : ''}`} onClick={handleClickUntukSaya}>
                                    {clickedUntukSaya ? <FaRegDotCircle color='#0194F3' className='' size={25} /> : <FaRegCircle className='' size={25} />}
                                    <span className='font-bold '>
                                        Untuk Saya Sendiri
                                    </span>
                                </div>
                                <div className={`flex flex-row gap-3 cursor-pointer ${clickedUntukOrangLain ? 'clicked' : ''}`} onClick={handleClickUntukOrangLain}>
                                    {clickedUntukOrangLain ? <FaRegDotCircle color='#0194F3' className='' size={25} /> : <FaRegCircle className='' size={25} />}
                                    <span className='font-bold '>
                                        Untuk Orang Lain
                                    </span>
                                </div>
                            </div>
                            <span className='text-[#757575] text-[14px]'>
                                Anda bisa memesan motor untuk orang lain dengan memilih opsi "Untuk Orang Lain"
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col rounded-xl mt-14 px-5 py-5 items-center gap-3 bg-white'>
                    <Image src='/images/motor/dummy.png' alt='motor' width={259} height={183} className='cursor-pointer' />
                    <div className='flex flex-col gap-5 '>
                        <div className='flex flex-row gap-2 items-center '>
                            <PiScroll className='' size='25' color='black' />
                            <span className='font-bold text-black '>
                                Kebijakan Pembatalan & Penjadwalan Ulang
                            </span>
                        </div>
                        <div className='flex flex-row gap-2 items-center justify-start '>
                            <MdCancel
                                className='' color='grey' size='25'
                            />
                            <span className='font-bold text-black '>
                                Booking ini tidak dapat di refund
                            </span>
                        </div>
                        <div className='flex flex-row gap-2 items-center justify-start '>
                            <FaCircleCheck
                                className='' color='#0BC175' size='22'
                            />
                            <span className='font-bold text-black '>
                                Dapat dijadwalkan ulang
                            </span>
                        </div>
                        <div className=' cursor-pointer'>
                            <a className=" text-[#FF4D30]" onClick={openModal}>Lihat Detail</a>
                            <Modal isOpen={isModalOpen} onClose={closeModal} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-5'>
                <div className='w-full max-w-[985px] rounded-xl mt-5 px-5 py-5 bg-white'>
                    <div className='flex flex-col items-start justify-start gap-3 text-[#666666] '>
                        <span className='font-extrabold text-black text-xl  hidden md:block'>
                            Detail Booking
                        </span>
                        <span className='text-[#FF4D30] text-[14px]'>
                            Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                        </span>
                    </div>
                    <div className='mt-10 '>
                        <div className='flex flex-col gap-8 '>
                            <div className='flex flex-row gap-5'>
                                <div className='text-black'>
                                    Nama Motor
                                    <Select>
                                        <SelectTrigger className='w-[368px]'>
                                            <SelectValue placeholder='Pilih' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem className='hover:bg-accent' value="matic">
                                                    <span>Matic</span>
                                                </SelectItem>
                                                <SelectItem className='hover:bg-accent' value="manual">
                                                    <span>Manual</span>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className={cn("grid", className)}>
                                    <span className='text-black'>Tanggal Mulai</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[368px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "LLL dd, y")} -{" "}
                                                            {format(date.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(date.from, "LLL dd, y")
                                                    )
                                                ) : (
                                                    <span>Pilih</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className='flex flex-row gap-5 '>
                                <div className='text-black'>
                                    Durasi
                                    <Select disabled>
                                        <SelectTrigger className='w-[368px]'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem className='hover:bg-accent' value="matic">
                                                    <span>Matic</span>
                                                </SelectItem>
                                                <SelectItem className='hover:bg-accent' value="manual">
                                                    <span>Manual</span>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='text-black w-full'>
                                    Fasilitas
                                    <ul className="list-disc ml-5">
                                        <li>2 Helm</li>
                                        <li>2 Jas Hujan</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='text-black w-full'>
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message">Keperluan Menyewa</Label>
                                    <Textarea placeholder="Keperluan anda" id="message" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-12 mt-3 '>
                                <div className={`flex flex-row gap-3 cursor-pointer ${clickedAmbil ? 'clicked' : ''}`} onClick={handleClickAmbil}>
                                    {clickedAmbil ? <FaRegDotCircle color='#0194F3' className='' size={25} /> : <FaRegCircle className='' size={25} />}
                                    <span className='font-bold '>
                                        Diambil
                                    </span>
                                </div>
                                <div className={`flex flex-row gap-3 cursor-pointer ${clickedDiantar ? 'clicked' : ''}`} onClick={handleClickDiantar}>
                                    {clickedDiantar ? <FaRegDotCircle color='#0194F3' className='' size={25} /> : <FaRegCircle className='' size={25} />}
                                    <span className='font-bold '>
                                        Diantar
                                    </span>
                                </div>
                            </div>
                            <div className={`text-black w-full ${clickedDiantar ? 'slide-in' : 'slide-out'}`}>
                                <div className="grid w-full gap-1.5">
                                    <Label>Alamat Lengkap</Label>
                                    <Textarea placeholder="Nama Jalan, Gedung, No. Rumah" id="message" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='w-full max-w-[985px] rounded-xl mt-5 px-5 py-5 bg-white'>
                    <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                        <Label>
                            <span className='font-extrabold text-black text-xl  hidden md:block'>
                                Kontak Darurat
                            </span>
                        </Label>
                        <span className='text-[#FF4D30] text-[14px]'>
                            Untuk mengatasi masalah seperti kecelakaan dibutuhkan kontak selain pemesan
                        </span>
                    </div>
                    <div className='mt-10'>
                        <div className='flex flex-col gap-8 '>
                            <div className='flex flex-row gap-5 '>
                                <div className='text-black w-full'>
                                    <Label>
                                        Nama Kontak Darurat
                                    </Label>
                                    <Input type="text" placeholder="Nama Kontak" />
                                </div>
                                <div className='text-black w-full'>
                                    <Label>
                                        Nomor Kontak Darurat
                                    </Label>
                                    <Input type="number" placeholder="08xxxxxxx" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-5 '>
                                <div className='text-black w-full'>
                                    <Label>
                                        Hubungan Kontak Darurat
                                    </Label>
                                    <Input type="text" placeholder="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className='w-full max-w-[985px] rounded-xl mt-5 px-5 py-5 bg-white'>
                    <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                        <Label>
                            <span className='font-extrabold text-black text-xl  hidden md:block'>
                                Detail Harga
                            </span>
                        </Label>
                        <span className='text-[#00875A] text-[14px]'>
                            Gunakan kupon di halaman pembayaran untuk harga yang lebih murah
                        </span>
                    </div>
                    <div className='mt-10'>
                        <div className='flex flex-col gap-8 '>
                            <div className='flex flex-col gap-5 '>
                                <div className='flex flex-row gap-5 justify-between'>
                                    <Label>
                                        <span className='font-medium text-base'>
                                            Harga Sewa
                                        </span>
                                    </Label>
                                    <Label>
                                        <span className='font-medium text-base'>
                                            Rp. 00.000 (x3)
                                        </span>
                                    </Label>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <Label>
                                        <span className='font-medium text-sm text-[#757575]'>
                                            Jenis Motor (3 Hari)
                                        </span>
                                    </Label>
                                    <Label>
                                        <span className='font-medium text-base'>
                                            Rp. 00.000
                                        </span>
                                    </Label>
                                </div>
                                <div className='flex flex-row justify-end'>
                                    <div className='text-black'>
                                        Diskon
                                        <Select>
                                            <SelectTrigger className='w-[368px]'>
                                                <SelectValue placeholder='Gunakan' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem className='hover:bg-accent' value="matic">
                                                        <span>Ramadhan</span>
                                                    </SelectItem>
                                                    <SelectItem className='hover:bg-accent' value="manual">
                                                        <span>11.11</span>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between mt-2'>
                                    <Label>
                                        <span className='font-medium text-[14px] text-[#00875A]'>
                                            Masukkan kode referal untuk bonus point!
                                        </span>
                                    </Label>
                                    <Label>
                                        <span className='font-medium text-base'>
                                            Rp. 00.000
                                        </span>
                                    </Label>
                                </div>
                                <div className='flex flex-row gap-2 mt-2 items-center'>
                                    <Checkbox id="points" />
                                    <div className='flex flex-row gap-1 items-center'>
                                        <AiOutlineDollarCircle color='#FF4D30' size='23px' />
                                        <Label>
                                            <span className='font-medium text-[14px] text-[#FF4D30]'>
                                                Gunakan Points
                                            </span>
                                        </Label>
                                    </div>
                                </div>
                                <div className="border-t border-[#757575] mt-2"></div>
                                <div className='flex flex-row justify-between'>
                                    <Label>
                                        <span className='font-semibold text-base'>
                                            Total Harga
                                        </span>
                                    </Label>
                                    <Label>
                                        <span className='font-semibold text-base text-[#FF4D30]'>
                                            Rp. 00.000
                                        </span>
                                    </Label>
                                </div>
                                <div className='flex flex-row gap-12 mt-2 '>
                                    <div className={`flex flex-row gap-3 cursor-pointer ${clickedTunai ? 'clicked' : ''}`} onClick={handleClickTunai}>
                                        {clickedTunai ? <FaRegDotCircle color='#0194F3' className='' size={25} /> : <FaRegCircle className='' size={25} />}
                                        <span className='font-bold '>
                                            Tunai
                                        </span>
                                    </div>
                                    <div className={`flex flex-row gap-3 cursor-pointer ${clickedCashless ? 'clicked' : ''}`} onClick={handleClickCashless}>
                                        {clickedCashless ? <FaRegDotCircle color='#0194F3' className='' size={25} /> : <FaRegCircle className='' size={25} />}
                                        <span className='font-bold '>
                                            Cashless
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-1 mt-4 items-center w-full pl-[220px]'>
                    <MdOutlineTimer size='22px' color='#149CF3' />
                    <span className='text-[#149CF3] text-[14px] font-semibold'>
                        Gunakan kupon di halaman pembayaran untuk harga yang lebih murah
                    </span>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className='w-full max-w-[985px] rounded-xl mt-5 px-5 py-5 bg-white'>
                    <div className='flex flex-col gap-8'>
                        <Button>
                            <span className='text-base'>
                                Lanjut Pembayaran
                            </span>
                        </Button>
                    </div>
                    <div className='flex flex-row gap-1 px-5 mt-3 justify-center     items-center'>
                        <Label>
                            <span className='font-semibold'>
                                Dengan melanjutkan pembayaran, Anda telah menyetujui
                            </span>
                        </Label>
                        <Label>
                            <a className="cursor-pointer text-[#149CF3]" onClick={openTermsModal}>Syarat & Ketentuan <span className='text-black'>dan</span> Kebijakan Privasi</a>
                        </Label>
                        <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
                    </div>
                </div>
            </div>
        </div>
    );
}