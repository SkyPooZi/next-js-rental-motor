'use client';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    Input,
    Select,
    Option,
    Textarea,
    Spinner
} from "@material-tailwind/react";
import { MdDone } from "react-icons/md";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";

const Page = ({ params: { id } }) => {
    const [motor, setMotor] = useState(null);
    const [motors, setMotors] = useState([]);
    const [selectedMotor, setSelectedMotor] = useState('');
    const [nama_motor, setNamaMotor] = useState('');
    const [tipe_motor, setTipeMotor] = useState('');
    const [merk_motor, setMerkMotor] = useState('');
    const [stok_motor, setStokMotor] = useState('');
    const [harga_motor_per_1_hari, setHargaMotorPer1Hari] = useState('');
    const [harga_motor_per_1_minggu, setHargaMotorPer1Minggu] = useState('');
    const [fasilitas_motor, setFasilitasMotor] = useState('');
    const [status_motor, setStatusMotor] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);

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

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSelectChangeStatus = (value) => {
        setStatusMotor(value);
    };

    const handleSelectChangeType = (value) => {
        setTipeMotor(value);
    }

    const handleSelectChangeNamaMotor = (value) => {
        setNamaMotor(value);
    }

    useEffect(() => {
        const fetchMotor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    },
                });

                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched motor:', data);
                    setMotors(data.listMotor || []); // Ensure data.listMotor is an array or default to empty array
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setLoadData(false);
            }
        };
        fetchMotor();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    },
                });

                if (response.status === 204) {
                    setError('No content available for the provided ID');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setMotor(data.listMotor);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.listMotor.gambar_motor}`);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setLoadData(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append('gambar_motor', file);
        if (nama_motor) formData.append('nama_motor', nama_motor);
        if (tipe_motor) formData.append('tipe_motor', tipe_motor);
        if (merk_motor) formData.append('merk_motor', merk_motor);
        if (stok_motor) formData.append('stok_motor', stok_motor);
        if (harga_motor_per_1_hari) formData.append('harga_motor_per_1_hari', harga_motor_per_1_hari);
        if (harga_motor_per_1_minggu) formData.append('harga_motor_per_1_minggu', harga_motor_per_1_minggu);
        if (fasilitas_motor) formData.append('fasilitas_motor', fasilitas_motor);
        if (status_motor) formData.append('status_motor', status_motor);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                },
                body: formData
            });

            if (!response.ok) {
                setError(`Failed to update data: ${response.statusText}`);
            } else {
                const data = await response.json();
                console.log('Updated data:', data);
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.listMotor.gambar_motor}`);
                setShowNotification(true);

                setMotor((prevMotor) => ({
                    ...prevMotor,
                    // Update only the fields that have been modified
                    ...(nama_motor && { nama_motor: data.listMotor.nama_motor }),
                    ...(tipe_motor && { tipe_motor: data.listMotor.tipe_motor }),
                    ...(merk_motor && { merk_motor: data.listMotor.merk_motor }),
                    ...(stok_motor && { stok_motor: data.listMotor.stok_motor }),
                    ...(harga_motor_per_1_hari && { harga_motor_per_1_hari: data.listMotor.harga_motor_per_1_hari }),
                    ...(harga_motor_per_1_minggu && { harga_motor_per_1_minggu: data.listMotor.harga_motor_per_1_minggu }),
                    ...(fasilitas_motor && { fasilitas_motor: data.listMotor.fasilitas_motor }),
                    ...(status_motor && { status_motor: data.listMotor.status_motor }),
                }));

                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div className='hidden xl:block'>
                <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
            </div>
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' ? (
                null
            ) : activeComponent === 'list' ? (
                null
            ) : activeComponent === 'user' ? (
                null
            ) : activeComponent === 'discount' ? (
                null
            ) : activeComponent === 'history' ? (
                null
            ) : activeComponent === 'rating' ? (
                null
            ) : <div className="block p-4 xl:ml-80">
                <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                    <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                        <div className="capitalize">
                            <nav aria-label="breadcrumb" className="w-max">
                                <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                    <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                        <a href="#">
                                            <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">beranda</p>
                                        </a>
                                        <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                    </li>
                                    <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                        <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Daftar Motor</p>
                                        <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                    </li>
                                    <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                        <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Edit
                                        </p>
                                    </li>
                                </ol>
                            </nav>
                            <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Edit</h6>
                        </div>
                        <div className="flex">
                            <div className="md:order-1 sm:order-2 order-2">
                                <NavbarAdmin />
                            </div>
                            <div className="order-1">
                                <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                            </div>
                        </div>
                    </div>
                </nav>
                {loadData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                        <Spinner color="blue" size="xl" />
                    </div>
                )}
                <div className="mt-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : motor ? (
                        <form action='post' method='post' onSubmit={handleSubmit}>
                            <Card className="w-full h-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-4 flex flex-col justify-between gap-4">
                                        <span className="text-black font-medium">
                                            Edit Motor
                                        </span>
                                        <div className="border-t border-[#969696] w-full"></div>
                                        <span className="text-black">
                                            Foto
                                        </span>
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
                                                    Nama Motor
                                                </span>
                                                {motors.length > 0 && (
                                                    <div className="w-full">
                                                        <Select
                                                            label={`Pilih nama motor (${motor.nama_motor})`}
                                                            onChange={handleSelectChangeNamaMotor}
                                                        >
                                                            {motors.map((motor) => (
                                                                <Option key={motor.id} value={motor.nama_motor}>
                                                                    {motor.nama_motor}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Tipe
                                                </span>
                                                <Select
                                                    onChange={handleSelectChangeType}
                                                    label={`Masukkan tipe motor (${motor.tipe_motor})`}
                                                >
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
                                                <Input
                                                    onChange={(e) => setMerkMotor(e.target.value)}
                                                    label={`Masukkan merk motor (${motor.merk_motor})`}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Stok
                                                </span>
                                                <Input
                                                    onChange={(e) => setStokMotor(e.target.value)}
                                                    label={`Masukkan stok motor (${motor.stok_motor})`}
                                                    type="number"
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
                                                    Harga Motor Per 1 Hari
                                                </span>
                                                <Input
                                                    onChange={(e) => setHargaMotorPer1Hari(e.target.value)}
                                                    label={`Masukkan harga motor perhari (${motor.harga_motor_per_1_hari})`}
                                                    type="number"
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
                                                    Harga Motor Per 1 Minggu
                                                </span>
                                                <Input
                                                    onChange={(e) => setHargaMotorPer1Minggu(e.target.value)}
                                                    label={`Masukkan harga motor perminggu (${motor.harga_motor_per_1_minggu})`}
                                                    type="number"
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
                                                    Fasilitas <span className="text-[#FF4D33] font-semibold">*</span>
                                                </span>
                                                <Textarea
                                                    onChange={(e) => setFasilitasMotor(e.target.value)}
                                                    label={`Masukkan fasilitas tambahan (${motor.fasilitas_motor})`}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Status <span className="text-[#FF4D33] font-semibold">*</span>
                                                </span>
                                                <Select
                                                    label={`Masukkan status motor (${motor.status_motor})`}
                                                    onChange={handleSelectChangeStatus}
                                                    name='motorStatus'
                                                >
                                                    <Option className="text-white rounded-md w-full bg-green-400" value='Tersedia'>
                                                        Tersedia
                                                    </Option>
                                                    <Option className="text-white my-2 rounded-md w-full bg-orange-400" value='Tertunda'>
                                                        Tertunda
                                                    </Option>
                                                    <Option className="text-white rounded-md w-full bg-red-400" value='Tidak Tersedia'>
                                                        Tidak Tersedia
                                                    </Option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                type="submit"
                                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                loading={loading}
                                            >
                                                {loading ? 'Loading...' : 'Ubah Data'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                    {showNotification && (
                        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                            <span>Data berhasil dikirim</span>
                            <MdDone className="ml-2 text-white" />
                        </div>
                    )}
                </div>
            </div>
            }
        </>
    );
}

export default Page;