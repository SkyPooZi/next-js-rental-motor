"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import GiveRatingModal from "@/components/sub/giveRatingModal";
import { fetchDoneRentBefore } from "@/utils/services/fetchDoneRentBefore";

export default function DoneRentBefore() {
    const [doneRentBeforeDetails, setDoneRentBeforeDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeTrigger, setChangeTrigger] = useState(0);
    const [loading, setLoading] = useState(true);
    const [historyId, setHistoryId] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const getDoneRentDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchDoneRentBefore(token);

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
        setChangeTrigger(prev => prev + 1);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Spinner color="orange" size="large" />
            </div>
        );
    }

    return doneRentBeforeDetails.length > 0 ? (
        doneRentBeforeDetails.map((detail) => (
            <div key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
                <div className="flex flex-col md:flex-row gap-3 justify-between">
                    <div className="flex flex-row gap-2">
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${detail.list_motor.gambar_motor}`} alt='motor' width={70} height={0} />
                        <div className="flex flex-col gap-1">
                            <Label>
                                <span className="text-base">
                                    {detail.list_motor.nama_motor || 'Motor'}
                                </span>
                            </Label>
                            <Label>
                                <span className="text-base">
                                    {`${detail.tanggal_mulai} - ${detail.tanggal_selesai}`}
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
                {selectedDetail && (
                    <GiveRatingModal isOpen={isModalOpen} onClose={closeModal} detail={selectedDetail} historyId={historyId} onSuccess={handleRescheduleSuccess}/>
                )}
            </div>
        ))
    ) : (
        null
    );
}
