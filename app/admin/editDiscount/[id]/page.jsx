'use client';

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { format } from "date-fns";
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
import EditDiscountForm from '@/components/sub/editDiscount';
import { fetchDiscountDetail } from '@/utils/services/fetchDiscountDetail';
import { updateDiscount } from '@/utils/services/handleSubmitEditDiscount';

const Page = ({ params: { id } }) => {
    const [diskon, setDiskon] = useState(null);
    const [nama_diskon, setNamaDiskon] = useState('');
    const [potongan_harga, setPotonganHarga] = useState('');
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const token = Cookies.get('token');

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDiscountDetail(id);
            if (result.error) {
                setError(result.error);
            } else {
                setDiskon(result.data);
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${result.data.gambar}`);
            }
            setLoadData(false);
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateDiscount({
            id,
            file,
            nama_diskon,
            potongan_harga,
            tanggal_mulai,
            tanggal_selesai,
            token,
            setImage,
            setShowNotification,
            setDiskon,
            setLoading,
            setError
        });
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    const handleDateStart = (date) => {
        if (date) {
            setTanggalMulai(format(date, 'yyyy-MM-dd'));
            setTanggalSelesai('');
        } else {
            setTanggalMulai('');
        }
    };

    const handleDateEnd = (date) => {
        if (date) {
            setTanggalSelesai(format(date, 'yyyy-MM-dd'));
        } else {
            setTanggalSelesai('');
        }
    }

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
                                                <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                            </a>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Diskon</p>
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
                        ) : diskon ? (
                            <EditDiscountForm
                                handleSubmit={handleSubmit}
                                handleImageChange={handleImageChange}
                                handleButtonClick={handleButtonClick}
                                fileInputRef={fileInputRef}
                                imagePreview={imagePreview}
                                image={image}
                                diskon={diskon}
                                setNamaDiskon={setNamaDiskon}
                                setPotonganHarga={setPotonganHarga}
                                tanggal_mulai={tanggal_mulai}
                                handleDateStart={handleDateStart}
                                tanggal_selesai={tanggal_selesai}
                                handleDateEnd={handleDateEnd}
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