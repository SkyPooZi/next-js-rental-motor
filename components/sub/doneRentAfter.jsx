"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import SeeRatingModal from "@/components/sub/seeRatingModal";
import { fetchDoneRentAfter } from "@/utils/services/fetchDoneRentAfter";

export default function DoneRentAfter() {
    const [doneRentAfterDetails, setDoneRentAfterDetails] = useState([]);
    const [historyId, setHistoryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    useEffect(() => {
        const getDoneRentDetails = async () => {
            try {
                const data = await fetchDoneRentAfter(token, id);

                if (data) {
                    setDoneRentAfterDetails(data);
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            }
        };

        getDoneRentDetails();
    }, [token]);

    const openModal = (detail) => {
        setHistoryId(detail.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHistoryId(null); // Clear the historyId to ensure the modal resets
    };

    return (
        <div>
            {doneRentAfterDetails.length > 0 ? (
                doneRentAfterDetails.map((detail) => (
                    <div key={detail.id} className="w-full flex flex-col gap-3 mb-5 px-5 py-5 bg-white rounded-md">
                        <div className="flex flex-col md:flex-row gap-3 justify-between">
                            <div className="flex flex-row gap-2">
                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${detail.list_motor.gambar_motor}`} alt='motor' className="w-24 h-auto" width={500} height={500} />
                                <div className="flex flex-col gap-2.5">
                                    <Label>
                                        <span className="text-lg font-bold">
                                            {detail.list_motor.nama_motor || 'Motor'}
                                        </span>
                                    </Label>
                                    <Label>
                                        <span className="text-base opacity-80">
                                            {`${detail.tanggal_mulai} - ${detail.tanggal_selesai}`}
                                        </span>
                                    </Label>
                                    <Label>
                                        <span>Total pembayaran </span>
                                        <span className="font-bold">
                                            {`Rp. ${detail.total_pembayaran}`}
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <Label>
                                    <span className="font-bold">
                                        Selesai
                                    </span>
                                </Label>
                            </div>
                        </div>
                        <div className="border-t border-[#FF4D30] mt-2"></div>
                        <div className="w-full flex flex-row gap-2 justify-end">
                            <Button onClick={() => openModal(detail)}>
                                <Label>
                                    <span className="cursor-pointer">
                                        Tampilkan Ulasan
                                    </span>
                                </Label>
                            </Button>
                        </div>
                    </div>
                ))
            ) : null}

            {historyId && (
                <SeeRatingModal isOpen={isModalOpen} onClose={closeModal} historyId={historyId} />
            )}
        </div>
    );
}
