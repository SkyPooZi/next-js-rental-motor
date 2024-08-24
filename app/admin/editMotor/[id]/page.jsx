'use client';

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import Image from "next/image";
import { MdDone } from "react-icons/md";
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";
import Loading from '@/components/ui/loading';
import EditMotorForm from '@/components/sub/editMotor';
import { fetchMotor } from '@/utils/services/motorsService';
import { fetchMotorDetail } from '@/utils/services/fetchMotorDetail';
import { updateMotor } from '@/utils/services/handleEditMotor';

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
    const token = Cookies.get("token");

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
        fetchMotor(token, setMotors, setError, setLoadData);
    }, []);

    useEffect(() => {
        const loadMotorDetail = async () => {
            const result = await fetchMotorDetail(id, token);

            if (result.error) {
                setError(result.error);
            } else {
                setMotor(result.data);
                setImage(result.imageUrl);
            }
            setLoadData(false);
        };

        loadMotorDetail();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await updateMotor({
                id,
                file,
                nama_motor,
                tipe_motor,
                merk_motor,
                stok_motor,
                harga_motor_per_1_hari,
                harga_motor_per_1_minggu,
                fasilitas_motor,
                status_motor,
                token
            });

            console.log('Updated data:', data);
            setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.listMotor.gambar_motor}`);
            setShowNotification(true);

            setMotor((prevMotor) => ({
                ...prevMotor,
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
                window.location.reload();
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' || activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'rating' ? null :
                <div className="block p-4 xl:ml-80">
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
                        <Loading />
                    )}
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : motor ? (
                            <EditMotorForm
                                handleSubmit={handleSubmit}
                                handleImageChange={handleImageChange}
                                handleButtonClick={handleButtonClick}
                                fileInputRef={fileInputRef}
                                imagePreview={imagePreview}
                                image={image}
                                motor={motor}
                                motors={motors}
                                handleSelectChangeNamaMotor={handleSelectChangeNamaMotor}
                                handleSelectChangeType={handleSelectChangeType}
                                setNamaMotor={setNamaMotor}
                                setMerkMotor={setMerkMotor}
                                setStokMotor={setStokMotor}
                                setHargaMotorPer1Hari={setHargaMotorPer1Hari}
                                setHargaMotorPer1Minggu={setHargaMotorPer1Minggu}
                                setFasilitasMotor={setFasilitasMotor}
                                handleSelectChangeStatus={handleSelectChangeStatus}
                                loading={loading}
                            />
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