'use client';

import { React, useState, useEffect } from "react";
import Image from "next/image";

import { IoReorderThree, IoReorderThreeOutline, IoHome } from "react-icons/io5";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { CiDiscount1 } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { HiTable } from "react-icons/hi";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import Discount from "@/components/sub/admin/discount";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";

export default function Admin() {
    const [activeComponent, setActiveComponent] = useState("dashboard");

    const renderComponent = () => {
        switch (activeComponent) {
            case "dashboard":
                return <Dashboard />;
            case "list":
                return <MotorList />;
            case "user":
                return <User />;
            case "discount":
                return <Discount />;
            case "history":
                return <History />;
            case "rating":
                return <Rating />;
            default:
                return null;
        }
    };

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50/50">
                <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
                    <div className="relative border-b border-white/20">
                        <a className="flex items-center gap-4 py-6 px-8" href="#/">
                            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
                            <h6 className="block antialiased tracking-normal font-medium font-sans text-base leading-relaxed text-white">Dashboard Rental Motor Kudus</h6>
                        </a>
                    </div>
                    <div className="m-4">
                        <ul className="mb-4 flex flex-col gap-5">
                            <li>
                                <button onClick={() => handleButtonClick('dashboard')} className="w-full">
                                    <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize ${activeComponent === 'dashboard' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                        <IoHome size='22' />
                                        <a aria-current="page" className="active">
                                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
                                        </a>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="middle none font-sans justify-between font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize"
                                    >
                                        <div className="flex gap-3">
                                            <IoReorderThree size='22' />
                                            <span className="text-sm font-medium">
                                                Master
                                            </span>
                                        </div>
                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <IoIosArrowUp size='22' />
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <button onClick={() => handleButtonClick('list')} className="w-full">
                                                <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'list' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                    <HiTable size='22' />
                                                    <a aria-current="page" className="active">
                                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">daftar motor</p>
                                                    </a>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleButtonClick('user')} className="w-full">
                                                <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'user' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                    <FaUserCircle size='22' />
                                                    <a aria-current="page" className="active">
                                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">pengguna</p>
                                                    </a>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="middle none font-sans justify-between font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize"
                                    >
                                        <div className="flex gap-3">
                                            <LiaHandHoldingUsdSolid size='22' />
                                            <span className="text-sm font-medium">
                                                Transaksi
                                            </span>
                                        </div>
                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <IoIosArrowUp size='22' />
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <button onClick={() => handleButtonClick('discount')} className="w-full">
                                                <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'discount' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                    <CiDiscount1 size='22' />
                                                    <a aria-current="page" className="active">
                                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Diskon</p>
                                                    </a>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleButtonClick('history')} className="w-full">
                                                <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'history' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                    <MdHistory size='22' />
                                                    <a aria-current="page" className="active">
                                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Riwayat</p>
                                                    </a>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleButtonClick('rating')} className="w-full">
                                                <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'rating' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                    <FaStar size='22' />
                                                    <a aria-current="page" className="active">
                                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Ulasan</p>
                                                    </a>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </aside>
                <button className="relative middle none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <Sheet>
                            <div className='block xl:hidden'>
                                <SheetTrigger>
                                    <div className='border border-white p-2 rounded-md'>
                                        <IoReorderThreeOutline size='25' />
                                    </div>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            <div className='flex flex-col w-full h-full pt-36 gap-8 items-center justify-center text-xs sm:text-sm sm:max-w-[500px]'>
                                                <ul className="mb-4 flex flex-col gap-5">
                                                    <li>
                                                        <button onClick={() => handleButtonClick('dashboard')} className="w-full">
                                                            <div className={`middle w-[180px] none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg flex items-center gap-4 px-4 capitalize ${activeComponent === 'dashboard' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                                <IoHome size='22' />
                                                                <a aria-current="page" className="active">
                                                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
                                                                </a>
                                                            </div>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                                                            <summary
                                                                className="middle w-full none font-sans justify-between font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize"
                                                            >
                                                                <div className="flex gap-3">
                                                                    <IoReorderThree size='22' />
                                                                    <span className="text-sm font-medium">
                                                                        Master
                                                                    </span>
                                                                </div>
                                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                    <IoIosArrowUp size='22' />
                                                                </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-4">
                                                                <li>
                                                                    <button onClick={() => handleButtonClick('list')} className="w-full">
                                                                        <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'list' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                                            <HiTable size='22' />
                                                                            <a aria-current="page" className="active">
                                                                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">daftar motor</p>
                                                                            </a>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button onClick={() => handleButtonClick('user')} className="w-full">
                                                                        <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'user' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                                            <FaUserCircle size='22' />
                                                                            <a aria-current="page" className="active">
                                                                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">pengguna</p>
                                                                            </a>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </details>
                                                    </li>
                                                    <li>
                                                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                                                            <summary
                                                                className="middle w-full none font-sans justify-between font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize"
                                                            >
                                                                <div className="flex gap-3">
                                                                    <LiaHandHoldingUsdSolid size='22' />
                                                                    <span className="text-sm font-medium">
                                                                        Transaksi
                                                                    </span>
                                                                </div>
                                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                                    <IoIosArrowUp size='22' />
                                                                </span>
                                                            </summary>
                                                            <ul className="mt-2 space-y-1 px-4">
                                                                <li>
                                                                    <button onClick={() => handleButtonClick('discount')} className="w-full">
                                                                        <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'discount' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                                            <CiDiscount1 size='22' />
                                                                            <a aria-current="page" className="active">
                                                                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Diskon</p>
                                                                            </a>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button onClick={() => handleButtonClick('history')} className="w-full">
                                                                        <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'history' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                                            <MdHistory size='22' />
                                                                            <a aria-current="page" className="active">
                                                                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Riwayat</p>
                                                                            </a>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button onClick={() => handleButtonClick('rating')} className="w-full">
                                                                        <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'rating' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                                            <FaStar size='22' />
                                                                            <a aria-current="page" className="active">
                                                                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Ulasan</p>
                                                                            </a>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </details>
                                                    </li>
                                                </ul>
                                            </div>
                                        </SheetTitle>
                                    </SheetHeader>
                                </SheetContent>
                            </div>
                        </Sheet>
                    </span>
                </button>
                {renderComponent()}
            </div>
        </>
    );
}