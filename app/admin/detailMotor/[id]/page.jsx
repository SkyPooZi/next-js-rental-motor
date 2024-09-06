'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from "@/components/sub/main/sidebar";
import NavbarAdmin from '@/components/sub/admin/navbar';
import MotorDetail from '@/components/sub/motorDetail';
import { fetchMotorDetail } from '@/utils/services/fetchMotorDetail';

const Page = ({ params: { id } }) => {
    const [motor, setMotor] = useState(null);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [loadData, setLoadData] = useState(true);
    const [image, setImage] = useState(null);
    const token = Cookies.get('token');

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
                                                <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                            </a>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">History</p>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Detail
                                            </p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Detail</h6>
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
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : motor ? (
                            <MotorDetail motor={motor} image={image} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div >
            }
        </>
    );
}

export default Page;