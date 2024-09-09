import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Card, CardHeader, Select, Option, Input, Textarea, Button, Typography } from '@material-tailwind/react';

const EditPrice = ({
    handleSubmit,
    handleImageChange,
    handleButtonClick,
    fileInputRef,
    imagePreview,
    image,
    motor,
    motors,
    handleSelectChangeNamaMotor,
    handleSelectChangeType,
    setNamaMotor,
    setMerkMotor,
    setStokMotor,
    setHargaMotorPer1Hari,
    setHargaMotorPer1Minggu,
    handleSelectChangeStatus,
    loading,
    harga_motor_diantar,
    setHargaMotorDiantar,
    nama_motor,
    tipe_motor,
    merk_motor,
    stok_motor,
    harga_motor_per_1_hari,
    harga_motor_per_1_minggu,
    status_motor,
    handleSelectIsHidden,
    tanggal_mulai_tidak_tersedia,
    tanggal_selesai_tidak_tersedia,
    handleDateStart,
    handleDateEnd,
    shouldDisableDate,
    shouldDisableTime,
    minEndDate,
    setStatusMotor,
    setIsHidden,
    is_hidden,
    token,
    id
}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (status_motor === 'Tidak Tersedia') {
            setIsChecked(true);
        } else {
            setIsChecked(false);

            const sendAPIRequest = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/editDate/${id}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`API request failed with status ${response.status}`);
                    }

                    const data = await response.json();
                    console.log('API response:', data);
                } catch (error) {
                    console.error('API request error:', error);
                }
            };

            sendAPIRequest();
        }
    }, [status_motor, id, token]);

    const handleClick = () => {
        setIsChecked(!isChecked);
        setStatusMotor(!isChecked ? 'Tidak Tersedia' : 'Tersedia');
    };

    const isSubmitDisabled = isChecked && (!tanggal_mulai_tidak_tersedia || !tanggal_selesai_tidak_tersedia);

    return (
        <form action="post" method="post" onSubmit={handleSubmit}>
            <Card className="mb-20 xl:mb-0 w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Edit Motor</span>
                        <div className="border-t border-[#988080] w-full"></div>
                        <span className="text-black">Foto</span>
                        <div className="mr-4">
                            <img
                                src={imagePreview || image}
                                alt="Image Preview"
                                className="max-w-40 h-auto rounded-md"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                id="picture"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                        <span className="text-[#6B7280] text-xs">
                            Gambar profile memiliki rasio 1:1
                            dan tidak lebih dari 2MB.
                        </span>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black text-lg">Harga Diantar Motor Ini</span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                    Rp
                                </span>
                                <Input
                                    onChange={(e) => {
                                        setHargaMotorDiantar(e.target.value);
                                    }}
                                    label={`Masukkan Harga Diantar Motor`}
                                    value={harga_motor_diantar}
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
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black text-lg">Nama Motor</span>
                                <Input
                                    disabled
                                    onChange={(e) => {
                                        setNamaMotor(e.target.value);
                                    }}
                                    label={`Masukkan nama motor`}
                                    value={nama_motor}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black text-lg">Tipe</span>
                                <Select
                                    disabled
                                    onChange={handleSelectChangeType}
                                    value={tipe_motor}
                                    label={`Masukkan tipe motor`}
                                >
                                    <Option className="rounded-md w-full" value="Matic">
                                        Matic
                                    </Option>
                                    <Option className="my-2 rounded-md w-full" value="Manual">
                                        Manual
                                    </Option>
                                    <Option className="my-2 rounded-md w-full" value="Premium Matic">
                                        Premium Matic
                                    </Option>
                                    <Option className="my-2 rounded-md w-full" value="Sport">
                                        Sport
                                    </Option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black text-lg">Harga Motor Per 1 Hari</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => setHargaMotorPer1Hari(e.target.value)}
                                        value={harga_motor_per_1_hari}
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
                                <span className="text-black text-lg">Harga Motor Per 1 Minggu</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        onChange={(e) => setHargaMotorPer1Minggu(e.target.value)}
                                        value={harga_motor_per_1_minggu}
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
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading || isSubmitDisabled}
                            >
                                {loading ? 'Loading...' : 'Ubah Data'}
                            </Button>
                        </div>
                        <div>
                            <a href="/admin">
                                <button
                                    type='button'
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Kembali
                                </button>
                            </a>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </form>
    );
};

export default EditPrice;
