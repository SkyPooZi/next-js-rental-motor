"use client";

import { React, useState } from "react";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import CancelReasonModal from "@/components/sub/cancelReasonModal";

export default function Canceled() {
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
                            DIBATALKAN
                        </span>
                    </Label>
                </div>
            </div>
            <div className="border-t border-[#FF4D30] mt-2"></div>
            <div className="border-t border-[#FF4D30] mt-2"></div>
            <div className="w-full flex flex-row gap-2 justify-end">
                <a className="hover:underline cursor-pointer " onClick={openModal}>
                    <Button>
                        <Label>
                            <span className="cursor-pointer">
                                Tampilkan Rincian Pembatalan
                            </span>
                        </Label>
                    </Button>
                </a>
                <CancelReasonModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
}