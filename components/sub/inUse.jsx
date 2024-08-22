"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { fetchInUse } from "@/utils/services/fetchInUse";
import InvoicePopup from "./invoice";

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

    return inUseDetails.length > 0 ? (
        inUseDetails.map((detail) => (
            <div key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
                <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
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
                {showInvoice && (
                    <InvoicePopup onClose={() => setShowInvoice(false)} orderId={orderNumber} />
                )}
            </div>
        ))
    ) : <span className="ml-10">Tidak ada</span>;
}