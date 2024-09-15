"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Cookies from "js-cookie";

import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { fetchInUse } from "@/utils/services/fetchInUse";
import InvoicePopup from "./invoice";

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

export default function InUse() {
    const [inUseDetails, setInUseDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [loading, setLoading] = useState(true);
    const id = Cookies.get('id');
    const token = Cookies.get('token');

    useEffect(() => {
        const getInUseDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchInUse(token, id);
                setInUseDetails(data);
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            } finally {
                setLoading(false);
            }
        };

        getInUseDetails();
    }, [token]);

    const fetchInvoiceDetails = async (historyId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoice/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            const invoiceList = data.midtrans;

            if (Array.isArray(invoiceList)) {
                const matchingInvoice = invoiceList.find(midtrans => midtrans.history_id === historyId);
                if (matchingInvoice) {
                    setOrderNumber(matchingInvoice.id);
                } else {
                    console.error('No matching invoice found for historyId:', historyId);
                }
            } else {
                console.error('Invoice list is not an array:', invoiceList);
            }
        } catch (error) {
            console.error('Failed to fetch invoice list:', error);
        }
    };

    const handleInvociePopup = async (historyId) => {
        await fetchInvoiceDetails(historyId);
        setShowInvoice(true);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Spinner color="orange" size="large" />
            </div>
        );
    }

    return  <div className="flex flex-col gap-5 overflow-hidden">
        {inUseDetails.length > 0 ? (
            inUseDetails
                .sort((a, b) => b.id - a.id)
                .map((detail) => (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 100 }}
                        key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                            <div className="flex flex-col md:flex-row gap-2">
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
                                            {`Rp. ${detail.total_pembayaran.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(/,/g, '.')}`}
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <Label>
                                    <span className="font-bold">
                                        {detail.status_history}
                                    </span>
                                </Label>
                            </div>
                        </div>
                        <div className="border-t border-[#FF4D30] mt-2"></div>
                        <div className="w-full flex flex-row gap-2 justify-end">
                            <Button onClick={() => handleInvociePopup(detail.id)} >
                                <Label>
                                    <span className="cursor-pointer">
                                        Tampilkan Invoice
                                    </span>
                                </Label>
                            </Button>
                        </div>
                    </motion.div>
                ))
        ) : (
            <span className="ml-10">Tidak ada</span>
        )}
        {showInvoice && (
            <InvoicePopup onClose={() => setShowInvoice(false)} orderId={orderNumber} />
        )}
    </div>
}