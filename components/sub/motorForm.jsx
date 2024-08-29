import React, { useState, useRef } from 'react';
import { Card, CardHeader, Typography, Button, Input, Select, Option, Textarea } from "@material-tailwind/react";
import { submitMotorData } from '@/utils/services/motorSubmitService';

const MotorForm = ({ token, setResponse, setShowNotification, setLoading, loading }) => {
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [nama_motor, setMotorName] = useState('');
    const [tipe_motor, setMotorType] = useState('');
    const [merk_motor, setMotorMerk] = useState('');
    const [stok_motor, setMotorStock] = useState('');
    const [harga_motor_per_1_hari, setMotorPricePerDay] = useState('');
    const [harga_motor_per_1_minggu, setMotorPricePerWeek] = useState('');
    const [fasilitas_motor, setMotorFacilities] = useState('');
    const [status_motor, setMotorStatus] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectChangeType = (value) => {
        setMotorType(value);
    }

    const handleSelectChange = (value) => {
        setMotorStatus(value);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const { data, error } = await submitMotorData({
            file,
            nama_motor,
            tipe_motor,
            merk_motor,
            stok_motor,
            harga_motor_per_1_hari,
            harga_motor_per_1_minggu,
            fasilitas_motor,
            status_motor,
            token,
        });

        if (error) {
            setResponse({ message: 'Terjadi kesalahan saat mengirim data.', error });
        } else {
            setResponse(data);
            setShowNotification(true);

            setFile(null);
            setImagePreview(null);
            setMotorName('');
            setMotorType('');
            setMotorMerk('');
            setMotorStock('');
            setMotorPricePerDay('');
            setMotorPricePerWeek('');
            setMotorFacilities('');
            setMotorStatus('');

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }

        setLoading(false);
    };
    return (
        <form method="post" action="post" onSubmit={handleSubmit}>
            <Card className="mb-20 xl:mb-0 w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">
                            Tambah Motor Baru
                        </span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <span className="text-black">
                            Foto <span className="text-[#FF4D33] font-semibold">*</span>
                        </span>
                        <div className="mr-4">
                            <img
                                src={imagePreview || 'https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg='}
                                alt="Image Preview"
                                className="max-w-32 h-auto rounded-md"
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
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                            >
                                Pilih Foto
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Nama Motor <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Input
                                    label="Masukkan nama motor"
                                    value={nama_motor}
                                    onChange={(e) => setMotorName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Tipe <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Select
                                    onChange={handleSelectChangeType}
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
                                <span className="text-black">
                                    Merk <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Input
                                    label="Masukkan merk motor"
                                    value={merk_motor}
                                    onChange={(e) => setMotorMerk(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Stok <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Input
                                    label="Masukkan stok motor" type="number"
                                    value={stok_motor}
                                    onChange={(e) => setMotorStock(e.target.value)}
                                    required
                                />
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
                                    Harga Motor Per 1 Hari <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Input
                                    label="Masukkan harga motor" type="number"
                                    value={harga_motor_per_1_hari}
                                    onChange={(e) => setMotorPricePerDay(e.target.value)}
                                    required
                                />
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
                                    Harga Motor Per 1 Minggu <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Input
                                    label="Masukkan harga motor" type="number"
                                    value={harga_motor_per_1_minggu}
                                    onChange={(e) => setMotorPricePerWeek(e.target.value)}
                                    required
                                />
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
                                <span className="text-black">
                                    Status <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Select
                                    label="Masukkan status motor"
                                    value={status_motor}
                                    name="motorStatus"
                                    onChange={handleSelectChange}
                                >
                                    <Option className="text-white rounded-md w-full bg-green-400" value="Tersedia">
                                        Tersedia
                                    </Option>
                                    <Option className="text-white my-2 rounded-md w-full bg-orange-400" value="Tertunda">
                                        Tertunda
                                    </Option>
                                    <Option className="text-white rounded-md w-full bg-red-400" value="Tidak Tersedia">
                                        Tidak Tersedia
                                    </Option>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Tambah Motor Baru'}
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
    )
}

export default MotorForm