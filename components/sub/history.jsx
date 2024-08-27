"use client";

import React, { useState } from "react";
import { Fragment } from 'react';

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

import PaymentWait from "@/components/sub/paymentWait";
import AllHistory from "@/components/sub/allHistory";
import Booked from "@/components/sub/booked";
import InUse from "@/components/sub/inUse";
import DoneRentBefore from "@/components/sub/doneRentBefore";
import DoneRentAfter from "@/components/sub/doneRentAfter";
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
                return (
                    <Fragment>
                        <DoneRentBefore />
                        <DoneRentAfter />
                    </Fragment>
                );
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
                <div className='hidden xl:flex items-center justify-between font-medium text-sm'>
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
                <div className="xl:hidden flex justify-end">
                    <DropdownMenu>
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-lg font-semibold">Riwayat Pengguna</h2>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Pilih Kategori</Button>
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={activeComponent} onValueChange={handleButtonClick}>
                                <DropdownMenuRadioItem value="all">
                                    <Typography className={`text-sm ${activeComponent === 'all' ? 'text-black' : 'text-[#6B7280]'}`}>
                                        Semua
                                    </Typography>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="paymentWait">
                                    <Typography className={`text-sm ${activeComponent === 'paymentWait' ? 'text-black' : 'text-[#6B7280]'}`}>
                                        Menunggu Pembayaran
                                    </Typography>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="book">
                                    <Typography className={`text-sm ${activeComponent === 'book' ? 'text-black' : 'text-[#6B7280]'}`}>
                                        Dipesan
                                    </Typography>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="inUse">
                                    <Typography className={`text-sm ${activeComponent === 'inUse' ? 'text-black' : 'text-[#6B7280]'}`}>
                                        Sedang Digunakan
                                    </Typography>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="done">
                                    <Typography className={`text-sm ${activeComponent === 'done' ? 'text-black' : 'text-[#6B7280]'}`}>
                                        Selesai
                                    </Typography>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="canceled">
                                    <Typography className={`text-sm ${activeComponent === 'canceled' ? 'text-black' : 'text-[#6B7280]'}`}>
                                        Dibatalkan
                                    </Typography>
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {renderComponent()}
        </div >
    );
}