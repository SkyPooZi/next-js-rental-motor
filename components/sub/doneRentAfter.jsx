"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Cookies from "js-cookie";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import SeeRatingModal from "@/components/sub/seeRatingModal";
import { fetchDoneRentAfter } from "@/utils/services/fetchDoneRentAfter";

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);

    const hour = date.getHours();
    let timeOfDay = '';

    if (hour >= 0 && hour < 11) {
        timeOfDay = 'pagi';
    } else if (hour >= 11 && hour < 15) {
        timeOfDay = 'siang';
    } else if (hour >= 15 && hour < 19) {
        timeOfDay = 'sore';
    } else {
        timeOfDay = 'malam';
    }

    const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    return `${formattedDate}, ${formattedTime} ${timeOfDay}`;
};

export default function DoneRentAfter() {
    const [doneRentAfterDetails, setDoneRentAfterDetails] = useState([]);
    const [historyId, setHistoryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    useEffect(() => {
        const POLLING_INTERVAL = 5000;
        let polling;

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

        polling = setInterval(() => {
            getDoneRentDetails();
        }, POLLING_INTERVAL);

        return () => {
            if (polling) {
                clearInterval(polling);
            }
        };
    }, [token, id]);

    const openModal = (detail) => {
        setHistoryId(detail.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHistoryId(null);
    };

    return (
        <div>
            {doneRentAfterDetails.length > 0 ? (
                doneRentAfterDetails
                    .sort((a, b) => b.id - a.id)
                    .map((detail) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 100 }}
                            key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
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
                                            <span className="text-base">
                                                {`${formatDate(detail.tanggal_mulai)} - ${formatDate(detail.tanggal_selesai)}`}
                                            </span>
                                        </Label>
                                        <Label>
                                            <span className="opacity-70">Total pembayaran </span>
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
                                <Button onClick={() => handleInvoicePopup(detail.id)}>
                                    <Label>
                                        <span className="cursor-pointer">
                                            Tampilkan Invoice
                                        </span>
                                    </Label>
                                </Button>
                            </div>
                        </motion.div>
                    ))
            ) : null}

            {historyId && (
                <SeeRatingModal isOpen={isModalOpen} onClose={closeModal} historyId={historyId} />
            )}
        </div>
    );
}
