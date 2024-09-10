'use client';

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Cookies from "js-cookie";

import {
    Card,
    CardHeader,
    CardFooter,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { Button as Buttons } from "@/components/ui/button";
import { MdDone } from "react-icons/md";
import { Label } from "@/components/ui/label";
import CancelConfirmationModal from "@/components/sub/cancelConfirmModal";
import { fetchCancelledModal } from "@/utils/services/fetchCancelledModal";

import dynamic from 'next/dynamic';
import Link from "next/link";
import ConfirmMoneyModal from "./confirmMoneyModal";
import { fetchMoneyReport } from "@/utils/services/fetchMoneyReport";
import { fetchNotificationDana } from "@/utils/services/fetchNotificationDana";

const NavbarAdmin = dynamic(() => import('@/components/sub/admin/navbar'), { ssr: false });
const Sidebar = dynamic(() => import('@/components/main/sidebar'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/sub/admin/dashboard'), { ssr: false });
const MotorList = dynamic(() => import('@/components/sub/admin/motorList'), { ssr: false });
const User = dynamic(() => import('@/components/sub/admin/user'), { ssr: false });
const History = dynamic(() => import('@/components/sub/admin/history'), { ssr: false });
const Rating = dynamic(() => import('@/components/sub/admin/rating'), { ssr: false });
const Discount = dynamic(() => import('@/components/sub/admin/discount'), { ssr: false });

export default function MoneyNotification() {
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationCancel, setShowNotificationCancel] = useState(false);
    const [id, setId] = useState(null); // State to store the id
    const [peran, setPeran] = useState('');
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [total_biaya, setTotalPembayaran] = useState(0);
    const [history, setHistory] = useState([]);
    const [status_history, setStatusHistory] = useState('');
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("notification");
    const [loadData, setLoadData] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifToCancel, setNotifToCancel] = useState(null);
    const [isNotFound, setIsNotFound] = useState(false); // To track 404 or no data found
    const [point, setPoint] = useState(0);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification-dana/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data);

                if (data && Array.isArray(data.notificationDana)) {
                    const visibleNotifications = data.notificationDana.filter(notification => notification.is_hidden === 0);

                    console.log('Visible notifications:', visibleNotifications);

                    const sortedData = visibleNotifications.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

                    setHistory(sortedData);
                } else {
                    console.error('data.notificationDana is not an array or is undefined');
                }
            } catch (error) {
                console.error('Fetch Data Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
                setLoadData(false);
            }
        };
        fetchData();
    }, [token]);

    function formatDateInDutch(datetime) {
        const date = new Date(datetime);

        // Define Dutch month names
        const months = [
            'januari', 'februari', 'maart', 'april', 'mei', 'juni',
            'juli', 'agustus', 'september', 'oktober', 'november', 'december'
        ];

        // Get date components
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Get time components
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure minutes are always 2 digits
        let period = '';

        // Format to 12-hour clock
        if (hours >= 18) {
            period = 'malam'; // For 6 PM - 11:59 PM
            if (hours > 12) hours -= 12;
        } else if (hours >= 15) {
            period = 'sore'; // For 3 PM - 5:59 PM
            hours -= 12; // Convert to 12-hour clock
        } else if (hours >= 12) {
            period = 'siang'; // For 12 PM - 2:59 PM
            if (hours > 12) hours -= 12;
        } else {
            period = hours === 0 ? 'malam' : 'pagi'; // For AM (12 AM = malam, 1 AM - 11:59 AM = pagi)
            if (hours === 0) hours = 12; // Midnight should be 12 instead of 0
        }

        return `${day} ${month} ${year} ${hours}:${minutes} ${period}`;
    }

    useEffect(() => {
        const getHistoryDetail = async () => {
            try {
                const response = await fetchNotificationDana(token, notifToCancel);
                const data = response.notificationDana;
                setPeran(data.user.peran);
                setNamaLengkap(data.user.nama_lengkap);
                setTotalPembayaran(data.total_biaya);
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            }
        };
        getHistoryDetail();
    }, [token, notifToCancel]);

    const handleSubmitCancel = async () => {
        if (!notifToCancel) {
            setError('No ID available to edit.');
            return;
        };

        const formData = new FormData();
        formData.append('is_hidden', 1);
        setLoadingCancel(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification-dana/edit/${notifToCancel}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                setError(`Failed to update data: ${response.statusText}`);
            } else {
                const data = await response.json();
                console.log('Updated data:', data);
                setShowNotificationCancel(true);
                setIsModalOpen(false);
                setHistory(prevHistory => prevHistory.filter(item => item.id !== notifToCancel));
                setTimeout(() => {
                    setLoadingCancel(false);
                    setShowNotificationCancel(false);
                }, 1000);
                setSelectedId(null);
            };
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setLoadingCancel(false);
        };
    };

    const confirmCancelNotif = (userId) => {
        console.log(userId)
        setNotifToCancel(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log('this works')
        setIsModalOpen(false);
        setNotifToCancel(null);
    }

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    }

    if (typeof window !== 'undefined') {
        console.log("Window Test");
    }

    return (
        <>
            <div className="mb-14 flex flex-col gap-4">
                {isNotFound ? (
                    <p>Kosong</p>
                ) : (
                    Array.isArray(history) && history.length > 0 ? (
                        history.map(item => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                key={item.id}
                            >
                                <Card className="w-full h-full">
                                    <CardHeader floated={false} shadow={false} className="rounded-none">
                                        <div className="mb-4 flex flex-col gap-4">
                                            <div className="flex flex-row gap-4">
                                                <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between">
                                                        <span className="w-[70%] text-red-500">
                                                            {item.pesan}
                                                        </span>
                                                        <Label className="">
                                                            <span className="text-gray-500">{formatDateInDutch(item.datetime)}</span>
                                                        </Label>
                                                    </div>
                                                    <CardFooter className="p-0 pt-2">
                                                        <div className=''>
                                                            <Buttons>
                                                                <Link href={`/admin/detailHistory/${item.riwayat_data.history.id}`}>
                                                                    <Label>
                                                                        <span className="text-white cursor-pointer">
                                                                            Lihat Detail
                                                                        </span>
                                                                    </Label>
                                                                </Link>
                                                            </Buttons>
                                                        </div>
                                                    </CardFooter>
                                                </div>
                                            </div>
                                            <div className="border-t border-[#969696] w-full"></div>
                                            <div className="w-full justify-end flex flex-row gap-4">
                                                <Button
                                                    color="green"
                                                    type="button"
                                                    onClick={() => confirmCancelNotif(item.id)}
                                                >
                                                    Konfirmasi
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <p>Kosong</p>
                    )
                )}
                {showNotification && (
                    <div className="fixed top-4 left-1/2 z-[999] transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                        <span>Konfirmasi Berhasil</span>
                        <MdDone className="ml-2 text-white" />
                    </div>
                )}
                {showNotificationCancel && (
                    <div className="fixed top-4 left-1/2 z-[999] transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                        <span>Konfirmasi Berhasil</span>
                        <MdDone className="ml-2 text-white" />
                    </div>
                )}
                <ConfirmMoneyModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleSubmitCancel}
                    peran={peran}
                    nama_lengkap={nama_lengkap}
                    total_biaya={total_biaya}
                />
            </div>
        </>
    );
}