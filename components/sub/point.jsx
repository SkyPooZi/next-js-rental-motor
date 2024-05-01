"use client";

import { React, useState } from "react";
import Link from "next/link";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoIosArrowDropright } from "react-icons/io";

import { Label } from "@/components/ui/label";
import PointModal from "@/components/sub/pointModal";

export default function Point() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="py-4 px-4">
            <Label>
                <span className="font-medium text-base">
                    Poin Saya
                </span>
            </Label>
            <div className="flex flex-row mt-2">
                <div className="w-fit flex flex-col gap-2 px-3 py-4 pr-12 rounded-md bg-[#FF4D33]">
                    <Label>
                        <span className="text-white text-base">
                            Total Poin
                        </span>
                    </Label>
                    <div className="flex flex-row gap-1 items-center text-white">
                        <AiOutlineDollarCircle size='20' />
                        <Label>
                            <span className="font-medium text-base">
                                100
                            </span>
                        </Label>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Label>
                            <a className="text-white hover:underline cursor-pointer " onClick={openModal}>Rincian Point</a>
                        </Label>
                        <PointModal isOpen={isModalOpen} onClose={closeModal} />
                        <IoIosArrowDropright size='20'color="white" />
                    </div>
                </div>
                <div className="flex flex-col items-center px-3 py-4 rounded-md bg-white">
                    <Label>
                        <span className="text-xs">
                            Ajak teman-temanmu bergabung dan gunakan kode undanganmu untuk mendapatkan 1000 poin!
                        </span>
                    </Label>
                    <div className="w-fit h-full mt-3">
                        <div className="flex flex-col px-16 py-3 gap-2 rounded-md items-center justify-center bg-[#FF4D33]">
                            <Label>
                                <span className="text-white text-xs">
                                    Kode Referal Saya
                                </span>
                            </Label>
                            <Label>
                                <span className="text-white text-lg ">
                                    1  2  3  4  5  6
                                </span>
                            </Label>
                        </div>
                        <div className="flex flex-row w-fit gap-6 px-9 py-1 justify-between rounded-md items-center shadow-lg px bg-white">
                            <Label>
                                <span className="text-xs">
                                    Penggunaan kode referal
                                </span>
                            </Label>
                            <Label>
                                <span className="text-xs">
                                    0/5
                                </span>
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}