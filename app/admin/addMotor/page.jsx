'use client';

import React, { useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const NavbarAdmin = dynamic(() => import("@/components/sub/admin/navbar"), { ssr: false });
const Dashboard = dynamic(() => import("@/components/sub/admin/dashboard"), { ssr: false });
const MotorList = dynamic(() => import("@/components/sub/admin/motorList"), { ssr: false });
const User = dynamic(() => import("@/components/sub/admin/user"), { ssr: false });
const History = dynamic(() => import("@/components/sub/admin/history"), { ssr: false });
const Rating = dynamic(() => import("@/components/sub/admin/rating"), { ssr: false });
const Discount = dynamic(() => import("@/components/sub/admin/discount"), { ssr: false });
const MotorForm = dynamic(() => import("@/components/sub/motorForm"), { ssr: false });
const Notification = dynamic(() => import("@/components/sub/notification"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/main/sidebar"), { ssr: false });

export default function AddMotor() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [activeComponent, setActiveComponent] = useState("addMotor");
    const token = Cookies.get('token');

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    };

    if (typeof window !== 'undefined') {
        console.log("Window Test");
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
                <div className="p-4 xl:ml-80">
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
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Motor</p>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Tambah Motor Baru</p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Tambah Motor Baru</h6>
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
                        <MotorForm token={token} setResponse={setResponse} setShowNotification={setShowNotification} setLoading={setLoading} />
                        <Notification showNotification={showNotification} />
                    </div>
                </div>
            }
        </>
    );
}