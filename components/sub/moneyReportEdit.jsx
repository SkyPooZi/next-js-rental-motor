import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Card, CardHeader, Select, Option, Input, Textarea, Button, Typography } from '@material-tailwind/react';

const EditMoneyReport = ({
    handleSubmit,
    keuangan,
    total_harga_motor,
    total_biaya_overtime,
    total_biaya_diantar,
    total_potongan_point,
    total_biaya_diskon,
    total_biaya_admin,
    total_biaya_reschedule,
    total_pembayaran,
    setTotalHargaMotor,
    setTotalBiayaOvertime,
    setTotalBiayaDiantar,
    setTotalPotonganPoint,
    setTotalBiayaDiskon,
    setTotalBiayaAdmin,
    setTotalBiayaReschedule,
    setTotalPembayaran,
    loading,
    token,
    id
}) => {
    return (
        // <form action="post" method="post" onSubmit={handleSubmit}>
            <Card className="mb-20 xl:mb-0 w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">
                            Detail Laporan Keuangan
                        </span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Nama Lengkap
                                </span>
                                <Input label="Masukkan nama pengguna" value={keuangan.history.nama_lengkap} disabled />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Email
                                </span>
                                <Input label="skipo@gmail.com" type="email" value={keuangan.history.email} disabled />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black text-lg">Total Harga Motor</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalHargaMotor(e.target.value);
                                        }}
                                        value={total_harga_motor}
                                        label={`Masukkan harga motor perhari`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Biaya Overtime</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalBiayaOvertime(e.target.value);
                                        }}
                                        value={total_biaya_overtime}
                                        label={`Masukkan harga motor perminggu`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Biaya Diantar</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalBiayaDiantar(e.target.value);
                                        }}
                                        value={total_biaya_diantar}
                                        label={`Masukkan harga motor perhari`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Potongan Point</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalPotonganPoint(e.target.value);
                                        }}
                                        value={total_potongan_point}
                                        label={`Masukkan harga motor perminggu`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Biaya Diskon</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalBiayaDiskon(e.target.value);
                                        }}
                                        value={total_biaya_diskon}
                                        label={`Masukkan harga motor perhari`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Biaya Admin</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalBiayaAdmin(e.target.value);
                                        }}
                                        value={total_biaya_admin}
                                        label={`Masukkan harga motor perminggu`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Biaya Reschedule</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalBiayaReschedule(e.target.value);
                                        }}
                                        value={total_biaya_reschedule}
                                        label={`Kosong`}
                                        type="number"
                                    />
                                </div>
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
                                <span className="text-black text-lg">Total Pembayaran</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => {
                                            setTotalPembayaran(e.target.value);
                                        }}
                                        value={total_pembayaran}
                                        label={`Masukkan harga motor perminggu`}
                                        type="number"
                                    />
                                </div>
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
        // </form>
    );
};

export default EditMoneyReport;
