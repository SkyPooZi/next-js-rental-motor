import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, Typography, Input, Select, Option, Textarea } from "@material-tailwind/react";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

const MotorDetail = ({ image, motor }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (motor.status_motor === 'Tidak Tersedia') {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    });

    return (
        <Card className="mb-20 xl:mb-0 w-full h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-4">
                    <span className="text-black font-medium">
                        Detail Motor
                    </span>
                    <div className="border-t border-[#969696] w-full"></div>
                    <span className="text-black">
                        Foto
                    </span>
                    <div className="mr-4">
                        <img
                            src={image}
                            alt="Image Preview"
                            className="max-w-40 h-auto rounded-md"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Motor
                            </span>
                            <Input label="Masukkan nama motor" value={motor.nama_motor} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Tipe
                            </span>
                            <Select label="Masukkan tipe motor" value={motor.tipe_motor} disabled>
                                <Option className="rounded-md w-full" value='Matic'>
                                    Matic
                                </Option>
                                <Option className="my-2 rounded-md w-full" value='Manual'>
                                    Manual
                                </Option>
                                <Option className='my-2 rounded-md w-full' value='Premium Matic'>
                                    Premium Matic
                                </Option>
                                <Option className='my-2 rounded-md w-full' value='Sport'>
                                    Sport
                                </Option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Merk
                            </span>
                            <Input label="Masukkan merk motor" value={motor.merk_motor} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Stok
                            </span>
                            <Input label="Masukkan stok motor" type="number" value={motor.stok_motor} disabled />
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Gunakan angka untuk memasang stok
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Harga Motor Per 1 Hari
                            </span>
                            <Input label="Masukkan harga motor" type="number" value={motor.harga_motor_per_1_hari} disabled />
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Gunakan angka untuk memasang harga
                            </Typography>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Harga Motor Per 1 Minggu
                            </span>
                            <Input label="Masukkan harga motor" type="number" value={motor.harga_motor_per_1_minggu} disabled />
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Gunakan angka untuk memasang harga
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black text-lg">
                                Status <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Select
                                disabled
                                label={`Masukkan status motor`}
                                value={motor.status_motor}
                                name="motorStatus"
                            >
                                <Option className="text-white mb-2 rounded-md w-full bg-green-400" value="Tersedia">
                                    Tersedia
                                </Option>
                                <Option className="text-white rounded-md w-full bg-red-400" value="Tidak Tersedia">
                                    Tidak Tersedia
                                </Option>
                            </Select>
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Pastikan Stok Sudah Habis Sebelum Mengubah Status Menjadi Tidak Tersedia
                            </Typography>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black text-lg">
                                Status Tampilkan Motor <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Select
                                disabled
                                label={`Masukkan status motor`}
                                value={motor.is_hidden ? "Sembunyikan" : "Tampilkan"}
                                name="motorStatus"
                            >
                                <Option className="text-white mb-2 rounded-md w-full bg-yellow-800" value={0}>
                                    Tampilkan
                                </Option>
                                <Option className="text-white rounded-md w-full bg-gray-800" value={1}>
                                    Sembunyikan
                                </Option>
                            </Select>
                            {/* <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center gap-1 font-normal"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="-mt-px h-4 w-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Pastikan Stok Sudah Habis Sebelum Mengubah Status Menjadi Tidak Tersedia
                                </Typography> */}
                        </div>
                    </div>
                    {isChecked && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className='flex md:flex-row flex-col gap-5'
                            >
                                <div className='w-full flex flex-col gap-2'>
                                    <span className="text-black">
                                        Tanggal Mulai Tidak Tersedia <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <DateTimePicker
                                        disabled
                                        label="Pilih Tanggal Mulai"
                                        value={motor.tanggal_mulai_tidak_tersedia
                                            ? dayjs(motor.tanggal_mulai_tidak_tersedia
                                            ) : null}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Tanggal Selesai Tidak Tersedia <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <DateTimePicker
                                        disabled
                                        label="Pilih Tanggal Selesai"
                                        value={motor.tanggal_selesai_tidak_tersedia
                                            ? dayjs(motor.tanggal_selesai_tidak_tersedia
                                            ) : null}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </div>
                            </motion.div>
                        </LocalizationProvider>
                    )}
                    <div>
                        <a href="/admin">
                            <button
                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                            >
                                Kembali
                            </button>
                        </a>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default MotorDetail