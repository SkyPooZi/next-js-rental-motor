import React from 'react';
import { IoReorderThree } from "react-icons/io5";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { CiDiscount1 } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const BottomNavbar = ({ activeComponent, handleButtonClick }) => {
    return (
        <div className="fixed xl:hidden bottom-0 inset-x-0 bg-gradient-to-br from-gray-800 to-gray-900 z-50 h-16 flex justify-around items-center text-white">
            <button onClick={() => handleButtonClick('dashboard')} className={`flex flex-col items-center ${activeComponent === 'dashboard' ? 'text-blue-400' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
                <span className={`text-xs ${activeComponent === 'dashboard' ? 'text-blue-400' : ''}`}>Dashboard</span>
            </button>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col items-center">
                    <IoReorderThree size='24' />
                    <span className="text-xs">Master</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white">
                    <DropdownMenuItem onClick={() => handleButtonClick('list')} className={`flex items-center gap-3 ${activeComponent === 'list' ? 'text-blue-400' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                            <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Motor</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleButtonClick('user')} className={`flex items-center gap-3 ${activeComponent === 'user' ? 'text-blue-400' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Pengguna</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col items-center">
                    <LiaHandHoldingUsdSolid size='24' />
                    <span className="text-xs">Transaksi</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white">
                    <DropdownMenuItem onClick={() => handleButtonClick('discount')} className={`flex items-center gap-3 ${activeComponent === 'discount' ? 'text-blue-400' : ''}`}>
                        <CiDiscount1 size='20' />
                        <span>Diskon</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleButtonClick('history')} className={`flex items-center gap-3 ${activeComponent === 'history' ? 'text-blue-400' : ''}`}>
                        <MdHistory size='20' />
                        <span>Riwayat</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleButtonClick('moneyManagement')} className={`flex items-center gap-3 ${activeComponent === 'moneyManagement' ? 'text-blue-400' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        <span>Laporan Keuangan</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleButtonClick('rating')} className={`flex items-center gap-3 ${activeComponent === 'rating' ? 'text-blue-400' : ''}`}>
                        <FaStar size='20' />
                        <span>Ulasan</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default BottomNavbar;
