import React from 'react';
import NavbarAdmin from "@/components/sub/admin/navbar";
import Sidebar from '@/components/main/sidebar';

const FormHeaderDashboard = ({ activeComponent, handleBtnClick }) => (
    <>
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                <div className="capitalize">
                    <nav aria-label="breadcrumb" className="w-max">
                        <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                            <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                <a href="#">
                                    <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                </a>
                            </li>
                        </ol>
                    </nav>
                    <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Dashboard</h6>
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
    </>
);

export default FormHeaderDashboard;
