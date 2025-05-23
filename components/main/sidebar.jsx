import React from 'react';
import Image from "next/image";
import { IoReorderThree, IoReorderThreeOutline } from "react-icons/io5";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { CiDiscount1 } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { FaStar } from "react-icons/fa";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import BottomNavbar from '../ui/bottom-navbar-admin';

const Sidebar = ({ activeComponent, handleButtonClick }) => {
    return (
        <div className="bg-gray-50/50">
            <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
                <div className="relative border-b border-white/20">
                    <a className="flex items-center gap-4 py-6 px-8" href="#/">
                        <Image src="/images/logo.png" alt="logo" width={50} height={50} />
                        <h6 className="block antialiased tracking-normal font-medium font-sans text-base leading-relaxed text-white">Dashboard Rental Motor Kudus</h6>
                    </a>
                    <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-5">
                        <li>
                            <button onClick={() => handleButtonClick('dashboard')} className="w-full">
                                <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize ${activeComponent === 'dashboard' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                                    </svg>
                                    <a aria-current="page" className="active">
                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">beranda</p>
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <button onClick={() => handleButtonClick('list')} className="w-full">
                                            <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'list' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                                    <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd"></path>
                                                </svg>
                                                <a aria-current="page" className="active">
                                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">daftar motor</p>
                                                </a>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleButtonClick('user')} className="w-full">
                                            <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'user' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                                                </svg>
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
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
                                        <button onClick={() => handleButtonClick('moneyManagement')} className="w-full">
                                            <div className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 flex items-center gap-4 px-4 capitalize ${activeComponent === 'moneyManagement' ? ' text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                </svg>
                                                <a aria-current="page" className="active">
                                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Laporan Keuangan</p>
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
            <BottomNavbar activeComponent={activeComponent} handleButtonClick={handleButtonClick} />
        </div>
    )
}

export default Sidebar;