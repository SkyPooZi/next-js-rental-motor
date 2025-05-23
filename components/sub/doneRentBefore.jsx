"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Cookies from "js-cookie";

import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import GiveRatingModal from "@/components/sub/giveRatingModal";
import { fetchDoneRentBefore } from "@/utils/services/fetchDoneRentBefore";

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
export default function DoneRentBefore() {
    const [doneRentBeforeDetails, setDoneRentBeforeDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeTrigger, setChangeTrigger] = useState(0);
    const [loading, setLoading] = useState(true);
    const [historyId, setHistoryId] = useState(null);
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    useEffect(() => {
        const getDoneRentDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchDoneRentBefore(token, id);

                if (data) {
                    setDoneRentBeforeDetails(data);
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            } finally {
                setLoading(false);
            }
        };

        getDoneRentDetails();
    }, [token, changeTrigger]);

    const openModal = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDetail(null);
    };

    const handleRescheduleSuccess = () => {
        closeModal();

        setTimeout(() => {
            setChangeTrigger(prev => prev + 1);
        }, 300);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Spinner color="orange" size="large" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 mb-5 overflow-hidden">
            {doneRentBeforeDetails.length > 0 ? (
                doneRentBeforeDetails
                    .sort((a, b) => b.id - a.id)
                    .map((detail) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 100 }}
                            key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
                            <div className="flex flex-col md:flex-row gap-6 justify-between">
                                <div className="flex flex-col md:flex-row gap-2">
                                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${detail.list_motor.gambar_motor}`} alt='motor' className="w-24 h-auto" width={500} height={500} />
                                    <div className="flex flex-col gap-2.5">
                                        <Label>
                                            <span className="text-lg font-bold">
                                                {detail.list_motor.nama_motor || 'Motor'}
                                            </span>
                                        </Label>
                                        <Label>
                                            <span className="text-base opacity-80">
                                                {`${formatDate(detail.tanggal_mulai)} - ${formatDate(detail.tanggal_selesai)}`}
                                            </span>
                                        </Label>
                                        <Label>
                                            <span>Total pembayaran </span>
                                            <span className="font-bold">
                                                {`Rp. ${detail.total_pembayaran.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(/,/g, '.')}`}
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
                                <a className="hover:underline cursor-pointer" onClick={() => openModal(detail)}>
                                    <Button>
                                        <Label>
                                            <span className="cursor-pointer">
                                                Beri Ulasan
                                            </span>
                                        </Label>
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))
            ) : (
                null
            )}
            {selectedDetail && (
                <GiveRatingModal isOpen={isModalOpen} onClose={closeModal} detail={selectedDetail} historyId={historyId} onSuccess={handleRescheduleSuccess} />
            )}
        </div>
    )

}
