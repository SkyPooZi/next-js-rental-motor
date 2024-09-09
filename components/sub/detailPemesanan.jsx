import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Select, Option, Input, Textarea, Radio } from '@material-tailwind/react';
import { Label } from '@/components/ui/label';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DatePicker } from "antd";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { IoLocationSharp } from 'react-icons/io5';
import { TextField } from '@mui/material';

const DetailPemesanan = ({ motors, selectedMotor, handleSelectChangeNamaMotor, tanggal_mulai, handleDateStart, shouldDisableDate, shouldDisableTime, tanggal_selesai, handleDateEnd, minEndDate, durasi, keperluan_menyewa, setKeperluanMenyewa, alamat, setAlamat, clickedAmbil, handleClickAmbil, clickedDiantar, handleClickDiantar }) => {
    const days = Math.floor(durasi / 24);
    const hours = durasi % 24;

    return (
        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
            <div className='flex flex-col items-start justify-start gap-3 text-[#666666] '>
                <span className='font-extrabold text-black text-lg flex'>
                    Detail Pemesanan
                </span>
                <span className='text-[#FF4D30] text-[14px]'>
                    Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                </span>
            </div>
            <div className='mt-10 '>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Motor <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <div className='text-sm w-full max-w-[473px]'>
                                {motors.length > 0 && (
                                    <Select
                                        label="Pilih nama motor"
                                        value={selectedMotor} // Ensure value is set
                                        onChange={(value) => handleSelectChangeNamaMotor(value)}
                                    >
                                        {motors
                                            .filter((motor) => motor.is_hidden !== 1)
                                            .map((motor) => (
                                                <Option
                                                    key={motor.id}
                                                    value={motor.nama_motor}
                                                >
                                                    <div className="flex items-center">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${motor.gambar_motor}`}
                                                            alt={motor.nama_motor}
                                                            width={40}
                                                            height={40}
                                                            className="w-10 h-10 rounded-full mr-2"
                                                        />
                                                        <span>{motor.nama_motor}</span>
                                                    </div>
                                                </Option>
                                            ))}
                                    </Select>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex flex-col gap-2'>
                        <span>Pilih Tanggal <span className="text-[#FF4D33] font-semibold">*</span></span>
                        <RangePicker
                            required
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                            onOk={onOk}
                            style={{ width: 'max-content', fontSize: '16px', padding: '8px' }}
                        />
                    </div> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className='flex md:flex-row flex-col gap-5'>
                            <div className='w-full flex flex-col gap-2'>
                                <span className="text-black">
                                    Tanggal Mulai <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <DateTimePicker
                                    label="Pilih Tanggal Mulai"
                                    value={tanggal_mulai ? dayjs(tanggal_mulai) : null}
                                    onChange={handleDateStart}
                                    shouldDisableDate={shouldDisableDate}
                                    shouldDisableTime={(time) => shouldDisableTime(dayjs(time), dayjs(tanggal_mulai))}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Tanggal Selesai <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <DateTimePicker
                                    label="Pilih Tanggal Selesai"
                                    value={tanggal_selesai ? dayjs(tanggal_selesai) : null}
                                    onChange={handleDateEnd}
                                    minDateTime={minEndDate}
                                    shouldDisableDate={shouldDisableDate}
                                    shouldDisableTime={(time) => shouldDisableTime(dayjs(time), dayjs(tanggal_selesai))}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </div>
                        </div>
                    </LocalizationProvider>

                    <div className='flex md:flex-row flex-col gap-5 '>
                        <div className='text-black w-full text-sm'>
                            Durasi
                            <Input
                                label="Durasi (hari)"
                                value={`${days} hari ${hours} jam`}
                                disabled
                            />
                        </div>
                        <div className='text-black w-full text-sm'>
                            Fasilitas
                            <ul className="list-disc ml-5">
                                <li>2 Helm</li>
                                <li>2 Jas Hujan</li>
                            </ul>
                        </div>
                    </div>
                    <div className='text-black w-full'>
                        <div className="grid w-full gap-1.5">
                            <span className="text-black">
                                Keperluan Menyewa <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Textarea
                                label="Keperluan menyewa"
                                value={keperluan_menyewa}
                                onChange={(e) => setKeperluanMenyewa(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='text-black w-full'>
                        <div className="grid w-full gap-1.5">
                            <span className="text-black">
                                Alamat <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Textarea
                                label="Masukkan alamat"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <div className={`flex flex-row items-center cursor-pointer ${clickedAmbil ? 'clicked' : ''}`} onClick={handleClickAmbil}>
                            <Radio
                                checked={clickedAmbil}
                                onChange={handleClickAmbil}
                            />
                            Diambil
                        </div>
                        <div className={`flex flex-row items-center cursor-pointer ${clickedDiantar ? 'clicked' : ''}`} onClick={handleClickDiantar}>
                            <Radio
                                checked={clickedDiantar}
                                onChange={handleClickDiantar}
                            />
                            Diantar
                        </div>
                    </div>
                    <span className={`${clickedAmbil ? 'slide-in' : 'slide-out'}`}>
                        Anda datang ke tempat kami untuk mengambil motor
                    </span>
                    <span className={`${clickedDiantar ? 'slide-in' : 'slide-out'}`}>
                        Kami antar motor ke tempat Anda
                    </span>
                    <div className={`text-black w-full ${clickedAmbil ? 'slide-in' : 'slide-out'}`}>
                        <div className='relative'>
                            <div className='mt-5 mb-6'>
                                <p className="text-black text-2xl font-bold text-center">Lokasi Kami</p>
                            </div>
                            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.872378039436!2d110.89978167475574!3d-6.785381493211696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70db4255192741%3A0x6e1d151b0d52676c!2sSewa%20Motor%20Kudus!5e0!3m2!1sid!2sid!4v1722223502208!5m2!1sid!2sid"
                                    className="absolute top-0 left-0 w-full h-full"
                                    allowFullScreen=""
                                    loading="eager"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <Label>
                                <div className='flex flex-row gap-1 items-center mt-4 mb-10'>
                                    <IoLocationSharp size='30' color='red' />
                                    <Link href="https://maps.app.goo.gl/xFp83TkWAVgps3No7" target='_blank'>
                                        <span className='font-semibold text-[#0194F3] text-base hover:underline'>
                                            Trengguluh, Honggosoco, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah
                                        </span>
                                    </Link>
                                </div>
                            </Label>
                        </div>
                    </div>
                    <div className={`${clickedDiantar ? 'slide-in' : 'slide-out'}`}>
                        <span className='text-[#ff4d30]'>Biaya Pengantaran Rp 25.000 <br />Dibayar ketika motor sudah sampai ditempat tujuan.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPemesanan;