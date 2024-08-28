"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import CancelReasonModal from "@/components/sub/cancelReasonModal";
import { fetchCancelled } from "@/utils/services/fetchCancelled";

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

export default function Canceled() {
    const [cancelledDetails, setCancelledDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null)
    const [historyId, setHistoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    useEffect(() => {
        const getCancelledDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchCancelled(token, id);

                if (data) {
                    setCancelledDetails(data);
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            } finally {
                setLoading(false);
            }
        };
        getCancelledDetails();
    }, [token]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDetail(null);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Spinner color="orange" size="large" />
            </div>
        );
    }
    return cancelledDetails.length > 0 ? (
        cancelledDetails.sort((a, b) => new Date(b.tanggal_mulai) - new Date(a.tanggal_mulai)).map((detail) => (
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
                                    {`${formatDate(detail.tanggal_mulai)} - ${formatDate(detail.tanggal_selesai)}`}
                                </span>
                            </Label>
                        </div>
                    </div>
                ))
            ) : (
                <span className="ml-10">Tidak ada</span>
            )}
            <CancelReasonModal isOpen={isModalOpen} onClose={closeModal} historyId={historyId} />
        </div>
    )
}