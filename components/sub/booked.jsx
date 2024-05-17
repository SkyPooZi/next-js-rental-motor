"use client";

import { React, useState } from "react";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import RescheduleModal from "@/components/sub/rescheduleModal";

export default function Booked() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
            <div className="flex flex-row gap-3 justify-between">
                <div className="flex flex-row gap-2">
                    <Image src='/images/motor/dummy.png' alt='motor' width={70} height={0} />
                    <div className="flex flex-col gap-1">
                        <Label>
                            <span className="text-base">
                                Motor
                            </span>
                        </Label>
                        <Label>
                            <span className="text-base">
                                08-03-2024 - 09-03-2024
                            </span>
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <Label>
                        <span className="font-bold">
                            DIPESAN
                        </span>
                    </Label>
                </div>
            </div>
            <div className="border-t border-[#FF4D30] mt-2"></div>
            <div className="w-full flex flex-row gap-2 justify-end">
                <Button variant='outline'>
                    <Label>
                        <span className="text-[#FF4D33] cursor-pointer">
                            Tampilkan Invoice
                        </span>
                    </Label>
                </Button>
                <a className="hover:underline cursor-pointer " onClick={openModal}>
                    <Button>
                        <Label>
                            <span className="cursor-pointer">
                                Atur Penjadwalan Ulang
                            </span>
                        </Label>
                    </Button>
                </a>
                <RescheduleModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
}