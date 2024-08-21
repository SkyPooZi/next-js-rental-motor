"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import PaymentWaitModal from "@/components/sub/paymentWaitModal";
import { fetchPaymentWait } from "@/utils/services/fetchPaymentWait";

export default function PaymentWait() {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [historyId, setHistoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');

    useEffect(() => {
        const getPaymentDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchPaymentWait(token);

                if (data) {
                    setPaymentDetails(data);
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            } finally {
                setLoading(false);
            }
        };

        getPaymentDetails();
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

    return paymentDetails.length > 0 ? (
        paymentDetails.map((detail) => (
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
                                <span className="text-base lg:text-lg md:text-fz-medium sm:text-sm">
                                    {`${detail.tanggal_mulai} - ${detail.tanggal_selesai}`}
                                </span>
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <Label>
                            <span className="font-bold">
                                {detail.status_history}
                            </span>
                        </Label>
                        <Label>
                            <span className="text-[#FF4D33] lg:text-xl md:text-base">
                                Batas Pembayaran - {detail.tanggal_mulai}
                            </span>
                        </Label>
                    </div>
                </div>
                <div className="border-t border-[#FF4D30] mt-2"></div>
                <div className="w-full flex flex-row justify-end">
                    <a className="hover:underline cursor-pointer" onClick={() => openModal(detail)}>
                        <Button>
                            <Label>
                                <span>
                                    Batalkan
                                </span>
                            </Label>
                        </Button>
                    </a>
                </div>
                <PaymentWaitModal isOpen={isModalOpen} onClose={closeModal} historyId={historyId} />
            </div>
        ))
    ) : (
        null
    );
}