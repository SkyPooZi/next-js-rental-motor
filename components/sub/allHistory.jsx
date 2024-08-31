"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Spinner } from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import PaymentWaitModal from "@/components/sub/paymentWaitModal";
import RescheduleModal from "@/components/sub/rescheduleModal";
import SeeRatingModal from "@/components/sub/seeRatingModal";
import GiveRatingModal from "@/components/sub/giveRatingModal";
import CancelReasonModal from "@/components/sub/cancelReasonModal";
import InvoicePopup from "@/components/sub/invoice";

import { fetchPaymentWait } from "@/utils/services/fetchPaymentWait";
import { fetchBooked } from "@/utils/services/fetchBooked";
import { fetchInUse } from "@/utils/services/fetchInUse";
import { fetchDoneRentAfter } from "@/utils/services/fetchDoneRentAfter";
import { fetchDoneRentBefore } from "@/utils/services/fetchDoneRentBefore";
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

export default function AllHistory() {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [bookedDetails, setBookedDetails] = useState([]);
    const [inUseDetails, setInUseDetails] = useState([]);
    const [doneRentAfterDetails, setDoneRentAfterDetails] = useState([]);
    const [doneRentBeforeDetails, setDoneRentBeforeDetails] = useState([]);
    const [cancelledDetails, setCancelledDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [historyId, setHistoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showInvoice, setShowInvoice] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [changeTrigger, setChangeTrigger] = useState(0);

    const id = Cookies.get('id');
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const fetchPayment = fetchPaymentWait(token, id)
                    .then(data => setPaymentDetails(data || []))
                    .catch(error => {
                        if (error.response?.status === 404) {
                            setPaymentDetails([]);
                        } else {
                            console.error('Failed to fetch payment details:', error);
                        }
                    });

                const fetchBookeds = fetchBooked(token, id)
                    .then(data => setBookedDetails(data || []))
                    .catch(error => {
                        if (error.response?.status === 404) {
                            setBookedDetails([]);
                        } else {
                            console.error('Failed to fetch booked details:', error);
                        }
                    });

                const fetchInUseData = fetchInUse(token, id)
                    .then(data => setInUseDetails(data || []))
                    .catch(error => {
                        if (error.response?.status === 404) {
                            setInUseDetails([]);
                        } else {
                            console.error('Failed to fetch in-use details:', error);
                        }
                    });

                const fetchDoneRentAfterData = fetchDoneRentAfter(token, id)
                    .then(data => setDoneRentAfterDetails(data || []))
                    .catch(error => {
                        if (error.response?.status === 404) {
                            setDoneRentAfterDetails([]);
                        } else {
                            console.error('Failed to fetch done rent after details:', error);
                        }
                    });

                const fetchDoneRentBeforeData = fetchDoneRentBefore(token, id)
                    .then(data => setDoneRentBeforeDetails(data || []))
                    .catch(error => {
                        if (error.response?.status === 404) {
                            setDoneRentBeforeDetails([]);
                        } else {
                            console.error('Failed to fetch done rent before details:', error);
                        }
                    });

                const fetchCancelledData = fetchCancelled(token, id)
                    .then(data => setCancelledDetails(data || []))
                    .catch(error => {
                        if (error.response?.status === 404) {
                            setCancelledDetails([]);
                        } else {
                            console.error('Failed to fetch cancelled details:', error);
                        }
                    });

                await Promise.all([fetchPayment, fetchBookeds, fetchInUseData, fetchDoneRentAfterData, fetchDoneRentBeforeData, fetchCancelledData]);

            } catch (error) {
                console.error('Failed to fetch history data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, changeTrigger]);

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

    const [isModalOpenPayment, setIsModalOpenPayment] = useState(false);
    const [isModalOpenReschedule, setIsModalOpenReschedule] = useState(false);
    const [isModalOpenRating, setIsModalOpenRating] = useState(false);
    const [isModalGiveRAting, setIsModalGiveRating] = useState(false);
    const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);

    const openModal = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
    };

    const closeModal = () => {
        setSelectedDetail(null);
    };

    const openModalPayment = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalOpenPayment(true);
    };

    const openModalReschedule = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalOpenReschedule(true);
    };

    const openModalRating = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalOpenRating(true);
    };

    const openModalGiveRating = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalGiveRating(true);
    };

    const openModalCancel = (detail) => {
        setHistoryId(detail.id);
        setSelectedDetail(detail);
        setIsModalOpenCancel(true);
    };

    const closeModalPayment = () => {
        setIsModalOpenPayment(false);
    };

    const closeModalReschedule = () => {
        setIsModalOpenReschedule(false);
    };

    const closeModalRating = () => {
        setIsModalOpenRating(false);
    };

    const closeModalGiveRating = () => {
        setIsModalGiveRating(false);
    };

    const closeModalCancel = () => {
        setIsModalOpenCancel(false);
    };

    const handleRescheduleSuccess = () => {
        closeModal();

        setTimeout(() => {
            setChangeTrigger(prev => prev + 1);
        }, 300);
    };

    const handleInvoicePopup = async (historyId) => {
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

    if (paymentDetails.length === 0 && bookedDetails.length === 0 && inUseDetails.length === 0 && doneRentAfterDetails.length === 0) {
        return (
            <div className="w-full flex justify-center items-center">
                <Label>
                    <span className="text-lg">
                        Tidak ada riwayat sewa
                    </span>
                </Label>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 overflow-hidden">
            {paymentDetails && paymentDetails.length > 0 && (
                paymentDetails
                    .sort((a, b) => a.id - b.id)  // Sort by `id` in descending order
                    .map((detail) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 100 }}
                            key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
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
                                <div className="flex flex-col gap-1 items-end">
                                    <Label>
                                        <span className="font-bold">
                                            {detail.status_history}
                                        </span>
                                    </Label>
                                    <Label>
                                        <span className="text-[#FF4D33] text-lg">
                                            Batas Pembayaran - {`${formatDate(detail.tanggal_mulai)}`}
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="border-t border-[#FF4D30] mt-2"></div>
                            <div className="w-full flex flex-row justify-end">
                                <a className="hover:underline cursor-pointer" onClick={() => openModalPayment(detail)}>
                                    <Button>
                                        <Label>
                                            <span>
                                                Batalkan
                                            </span>
                                        </Label>
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))
            )}

            {bookedDetails && bookedDetails.length > 0 && (
                bookedDetails
                    .sort((a, b) => b.id - a.id)  // Sort by `id` in descending order
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
                                            {detail.status_history}
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="border-t border-[#FF4D30] mt-2"></div>
                            <div className="w-full flex flex-col md:flex-row gap-2 justify-end items-end">
                                <div>
                                    <Button onClick={() => handleInvoicePopup(detail.id)} variant='outline'>
                                        <Label>
                                            <span className="text-[#FF4D33] cursor-pointer">
                                                Tampilkan Invoice
                                            </span>
                                        </Label>
                                    </Button>
                                </div>
                                <div>
                                    <Button className="cursor-pointer" onClick={() => openModalReschedule(detail)}>
                                        <Label>
                                            <span className="cursor-pointer">
                                                Atur Penjadwalan Ulang
                                            </span>
                                        </Label>
                                    </Button>
                                </div>
                            </div>
                        </motion.div >
                    ))
            )}

            {inUseDetails && inUseDetails.length > 0 && (
                inUseDetails
                    .sort((a, b) => b.id - a.id)  // Sort by `id` in descending order
                    .map((detail) => (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 100 }}
                            key={detail.id} className="w-full flex flex-col gap-3 px-5 py-5 bg-white rounded-md">
                            <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
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
                                            {detail.status_history}
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="border-t border-[#FF4D30] mt-2"></div>
                            <div className="w-full flex flex-row gap-2 justify-end">
                                <Button onClick={() => handleInvoicePopup(detail.id)} >
                                    <Label>
                                        <span className="cursor-pointer">
                                            Tampilkan Invoice
                                        </span>
                                    </Label>
                                </Button>
                            </div>
                        </motion.div>
                    ))
            )}

            {doneRentAfterDetails && doneRentAfterDetails.length > 0 && (
                doneRentAfterDetails
                    .sort((a, b) => b.id - a.id)  // Sort by `id` in descending order
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
            )}
            {selectedDetail && (
                <SeeRatingModal isOpen={isModalOpenRating} onClose={closeModalRating} historyId={historyId} detail={selectedDetail} />
            )}
            {selectedDetail && (
                <GiveRatingModal isOpen={isModalGiveRAting} onClose={closeModalGiveRating} detail={selectedDetail} historyId={historyId} onSuccess={handleRescheduleSuccess} />
            )}
            <CancelReasonModal isOpen={isModalOpenCancel} onClose={closeModalCancel} historyId={historyId} />
            <RescheduleModal
                isOpen={isModalOpenReschedule}
                onClose={closeModalReschedule}
                historyId={historyId}
                onSuccess={handleRescheduleSuccess}
            />
            <PaymentWaitModal isOpen={isModalOpenPayment} onClose={closeModalPayment} historyId={historyId} />
            {showInvoice && (
                <InvoicePopup onClose={() => setShowInvoice(false)} orderId={orderNumber} />
            )}
        </div>
    );
}
