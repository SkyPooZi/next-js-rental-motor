"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { fetchPoint } from "@/utils/services/fetchPoint";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoIosArrowDropright } from "react-icons/io";

import { Label } from "@/components/ui/label";
import PointModal from "@/components/sub/pointModal";

export default function Point() {
    const [point, setPoint] = useState(0);
    const [referalCode, setReferalCode] = useState('');
    const id = Cookies.get('id');
    const token = Cookies.get('token');

    useEffect(() => {
        const getPoint = async () => {
            try {
                const { point, referalCode } = await fetchPoint(id, token);
                setPoint(point);
                setReferalCode(referalCode);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        getPoint();
    }, [id, token]);


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
            <div className="flex flex-col md:flex-row mt-2">
                <div className="md:w-fit flex flex-col gap-2 px-3 py-4 pr-12 rounded-md bg-[#FF4D33]">
                    <div className="">
                        <Label>
                            <span className="text-white text-base">
                                Total Poin
                            </span>
                        </Label>
                    </div>
                    <div className="flex flex-row gap-1 items-center text-white">
                        <AiOutlineDollarCircle size='20' />
                        <Label>
                            <span className="font-medium text-base">
                                {point}
                            </span>
                        </Label>
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
                                <span className="text-white text-lg tracking-widest">
                                    {referalCode}
                                </span>
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}