"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import Cookies from "js-cookie";

export default function Settings() {
    const searchParams = useSearchParams();
    const [activeComponent, setActiveComponent] = useState("profile");

    const [animationClass, setAnimationClass] = useState("fade-in");

    useEffect(() => {
        const component = searchParams.get('component') || "profile";
        setActiveComponent(component);
    }, [searchParams]);

    useEffect(() => {
        setAnimationClass("fade-in");
    }, [activeComponent]);

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
        setAnimationClass("fade-out");
        setTimeout(() => {
            setActiveComponent(component);
        }, 300);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        Cookies.remove('token');
        Cookies.remove('id');
        Cookies.remove('role');
        Cookies.remove('email');
        Cookies.remove('isAdmin');
    };

    return (
        <>
            <Navbar />
            <div className="h-full w-full py-10 md:px-24 md:py-16 bg-[#F6F7F9]">
                <div className="flex flex-col lg:flex-row items-center lg:items-start w-full">
                    <style jsx>{`
                          .button-wrapper {
                            position: relative;
                            display: flex;
                            align-items: center;
                            width: 100%;
                            padding: 10px 20px;
                            cursor: pointer;
                            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
                        }

                        .button-wrapper::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            width: 4px;
                            background-color: transparent;
                            transition: background-color 0.3s ease, width 0.3s ease;
                        }

                        .button-wrapper:hover::before,
                        .button-wrapper.active::before {
                            background-color: #FF4D30;
                            width: 8px;
                        }

                        .button-wrapper:hover,
                        .button-wrapper.active {
                            background-color: #F6F7F9; /* Background color on hover */
                            color: #FF4D30; /* Text color on hover */
                            transform: scale(1.05); /* Slight scale on hover */
                        }

                        .icon {
                            margin-right: 10px;
                            flex-shrink: 0; /* Prevent the icon from shrinking */
                        }

                        .button-wrapper span {
                            white-space: nowrap; /* Prevent text wrapping */
                        }

                        .settings-sidebar {
                            animation: slideIn 0.5s ease-in-out;
                        }

                        @keyframes slideIn {
                            from {
                                transform: translateX(-100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }

                        .fade-in {
                            animation: fadeIn 0.5s ease-in-out;
                        }

                        .fade-out {
                            animation: fadeOut 0.5s ease-in-out;
                        }

                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes fadeOut {
                            from {
                                opacity: 1;
                                transform: translateY(0);
                            }
                            to {
                                opacity: 0;
                                transform: translateY(10px);
                            }
                        }

                        /* Hide sidebar on mobile devices */
                        @media (max-width: 768px) {
                            .settings-sidebar {
                                display: none;
                            }
                        }
                    `}</style>
                    <div className="hidden lg:flex flex-col bg-white h-full w-fit border-r border-gray-300 p-5 rounded-md settings-sidebar">
                        <span className="text-lg px-4 pt-5">Settings</span>
                        <div className="border-t border-[#FF4D30] mt-2 mx-4 mb-2"></div>
                        <button
                            onClick={() => handleButtonClick('profile')}
                            className={`button-wrapper ${activeComponent === 'profile' ? 'active' : ''}`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <CgProfile size='25' className="icon" />
                                <span className="font-medium text-base">Profil</span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleButtonClick('point')}
                            className={`button-wrapper ${activeComponent === 'point' ? 'active' : ''}`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <AiOutlineDollarCircle size='25' className="icon" />
                                <span className="font-medium text-base">Poin Saya</span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleButtonClick('history')}
                            className={`button-wrapper ${activeComponent === 'history' ? 'active' : ''}`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <AiOutlineHistory size='25' className="icon" />
                                <span className="font-medium text-base">Riwayat Penyewaan</span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleButtonClick('terms')}
                            className={`button-wrapper ${activeComponent === 'terms' ? 'active' : ''}`}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <FiInfo size='25' className="icon" />
                                <span className="font-medium text-base">Kebijakan Privasi</span>
                            </div>
                        </button>
                        <div className="border-t border-[#FF4D30] mt-2 mx-4 mb-5"></div>
                        <Link href="/login" onClick={handleLogout}>
                            <button className={`button-wrapper text-[#FF4D30]`}>
                                <div className="flex flex-row items-center gap-2">
                                    <RiLogoutCircleLine size="25" className="icon" />
                                    <Label>
                                        <span className='font-medium text-base'>
                                            Keluar
                                        </span>
                                    </Label>
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div className="flex lg:hidden fixed bottom-28 right-2 z-40">
                        <DefaultSpeedDial activeComponent={activeComponent} handleButtonClick={handleButtonClick} />
                    </div>
                    <div className={`w-full content-area ${animationClass}`}>
                        {renderComponent()}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
