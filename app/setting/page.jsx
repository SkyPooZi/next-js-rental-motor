"use client";

import { React, useState } from "react";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { AiOutlineHistory, AiOutlineDollarCircle } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";

import { Label } from "@/components/ui/label";
import { DefaultSpeedDial } from "@/components/ui/defaultSpeedDial";
import Profile from "@/components/sub/profile";
import Point from "@/components/sub/point";
import History from "@/components/sub/history";
import Terms from "@/components/sub/terms";
import Navbar from "@/components/main/NavbarAfter";
import Footer from "@/components/main/Footer";

export default function Settings() {

    const [activeComponent, setActiveComponent] = useState("profile");

    const renderComponent = () => {
        switch (activeComponent) {
            case "profile":
                return <Profile />;
            case "point":
                return <Point />;
            case "history":
                return <History />;
            case "terms":
                return <Terms />;
            default:
                return null;
        }
    };

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <Navbar />
            <div className="h-full w-full px-2 py-10 md:px-24 md:py-16 bg-[#F6F7F9]">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <div className="w-full hidden max-w-[240px] h-fit lg:flex flex-col gap-2 py-5 px-2 rounded-md bg-white">
                        <span className="text-lg">Settings</span>
                        <div className="border-t border-[#FF4D30] mt-2"></div>
                        <button onClick={() => handleButtonClick('profile')}>
                            <div className={`flex flex-row items-center mt-3 gap-2 px-1 py-1 rounded-md hover:bg-[#FF4D30] hover:text-white hover:duration-500 ${activeComponent === 'profile' ? 'bg-[#FF4D30] text-white' : ''}`}>
                                <CgProfile size='25' />
                                <span className="font-medium text-base">
                                    Profil
                                </span>
                            </div>
                        </button>
                        <button onClick={() => handleButtonClick('point')}>
                            <div className={`flex flex-row items-center mt-3 gap-2 px-1 py-1 rounded-md hover:bg-[#FF4D30] hover:text-white hover:duration-500 ${activeComponent === 'point' ? 'bg-[#FF4D30] text-white' : ''}`}>
                                <AiOutlineDollarCircle size='25' />
                                <span className="font-medium text-base" >
                                    Poin Saya
                                </span>
                            </div>
                        </button>
                        <button onClick={() => handleButtonClick('history')}>
                            <div className={`flex flex-row items-center mt-3 gap-2 px-1 py-1 rounded-md hover:bg-[#FF4D30] hover:text-white hover:duration-500 ${activeComponent === 'history' ? 'bg-[#FF4D30] text-white' : ''}`}>
                                <AiOutlineHistory size='25' />
                                <span className="font-medium text-base">
                                    Riwayat Penyewaan
                                </span>
                            </div>
                        </button>
                        <button onClick={() => handleButtonClick('terms')}>
                            <div className={`flex flex-row items-center mt-3 gap-2 px-1 py-1 rounded-md hover:bg-[#FF4D30] hover:text-white hover:duration-500 ${activeComponent === 'terms' ? 'bg-[#FF4D30] text-white' : ''}`}>
                                <FiInfo size='25' />
                                <span className="font-medium text-base">
                                    Kebijakan Privasi
                                </span>
                            </div>
                        </button>
                        <div className="border-t border-[#FF4D30] mt-2"></div>
                        <Link href="/login">
                            <button>
                                <div className='flex flex-row items-center mt-3 gap-2 px-1 py-1 rounded-md text-[#FF4D30] hover:bg-[#FF4D30] hover:text-white hover:duration-500'>
                                    <RiLogoutCircleLine size="25" />
                                    <Label>
                                        <span className='font-medium text-base'>
                                            Keluar
                                        </span>
                                    </Label>
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div className="flex lg:hidden fixed bottom-5 right-2 z-40">
                        <DefaultSpeedDial activeComponent={activeComponent} handleButtonClick={handleButtonClick} />
                    </div>
                    {renderComponent()}
                </div >
            </div>
            <Footer />
        </>
    );
}