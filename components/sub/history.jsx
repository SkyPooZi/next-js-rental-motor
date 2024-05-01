"use client";

import { React, useState } from "react";
import Link from "next/link";

import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";

import PaymentWait from "@/components/sub/paymentWait";
import AllHistory from "@/components/sub/allHistory";
import Booked from "@/components/sub/booked";
import InUse from "@/components/sub/inUse";
import DoneRentBefore from "@/components/sub/doneRentBefore";
import Canceled from "@/components/sub/canceled";

export default function History() {

    const [activeComponent, setActiveComponent] = useState("all");

    const renderComponent = () => {
        switch (activeComponent) {
            case "all":
                return <AllHistory />;
            case "paymentWait":
                return <PaymentWait />;
            case "book":
                return <Booked />;
            case "inUse":
                return <InUse />;
            case "done":
                return <DoneRentBefore />;
            case "canceled":
                return <Canceled />;
            default:
                return null;
        }
    };

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col bg-white py-5 px-10 rounded-md">
                <div className='hidden md:flex items-center justify-between font-medium text-sm'>
                    <button onClick={() => handleButtonClick('all')} className={`cursor-pointer hover:text-[#FF4D33] text-[#B3B1B1] ${activeComponent === 'all' ? 'hover:underline text-[#FF4D33]' : ''}`}>
                        Semua
                    </button>
                    <button onClick={() => handleButtonClick('paymentWait')} className={`cursor-pointer hover:text-[#FF4D33] text-[#B3B1B1] ${activeComponent === 'paymentWait' ? 'hover:underline text-[#FF4D33]' : ''}`}>
                        Menunggu Pembayaran
                    </button>
                    <button onClick={() => handleButtonClick('book')} className={`cursor-pointer hover:text-[#FF4D33] text-[#B3B1B1] ${activeComponent === 'book' ? 'hover:underline text-[#FF4D33]' : ''}`}>
                        Dipesan
                    </button>
                    <button onClick={() => handleButtonClick('inUse')} className={`cursor-pointer hover:text-[#FF4D33] text-[#B3B1B1] ${activeComponent === 'inUse' ? 'hover:underline text-[#FF4D33]' : ''}`}>
                        Sedang Digunakan
                    </button>
                    <button onClick={() => handleButtonClick('done')} className={`cursor-pointer hover:text-[#FF4D33] text-[#B3B1B1] ${activeComponent === 'done' ? 'hover:underline text-[#FF4D33]' : ''}`}>
                        Selesai
                    </button>
                    <button onClick={() => handleButtonClick('canceled')} className={`cursor-pointer hover:text-[#FF4D33] text-[#B3B1B1] ${activeComponent === 'canceled' ? 'hover:underline text-[#FF4D33]' : ''}`}>
                        Dibatalkan
                    </button>
                </div>
            </div>
            {renderComponent()}
        </div>
    );
}