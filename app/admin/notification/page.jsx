'use client';

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import {
    Card,
    CardHeader,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import { Label } from "@/components/ui/label";

import dynamic from 'next/dynamic';

const NavbarAdmin = dynamic(() => import('@/components/sub/admin/navbar'), { ssr: false });
const Sidebar = dynamic(() => import('@/components/main/sidebar'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/sub/admin/dashboard'), { ssr: false });
const MotorList = dynamic(() => import('@/components/sub/admin/motorList'), { ssr: false });
const User = dynamic(() => import('@/components/sub/admin/user'), { ssr: false });
const History = dynamic(() => import('@/components/sub/admin/history'), { ssr: false });
const Rating = dynamic(() => import('@/components/sub/admin/rating'), { ssr: false });
const Discount = dynamic(() => import('@/components/sub/admin/discount'), { ssr: false });

export default function Notification() {
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationCancel, setShowNotificationCancel] = useState(false);
    const [id, setId] = useState(null); // State to store the id
    const [history, setHistory] = useState([]);
    const [status_history, setStatusHistory] = useState('');
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("notification");
    const [loadData, setLoadData] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredHistories = data.history.filter(item =>
                    item.status_history === 'Menunggu Pembayaran' && item.metode_pembayaran === 'Tunai'
                );
                setHistory(filteredHistories);
            } catch (error) {
                console.error('Fetch Data Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
                setLoadData(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        if (!id) {
            setError('No ID available to process.');
            return;
        }

        setBtnLoading(true);

        try {
            const formData = new FormData();
            formData.append('status_history', 'Dipesan');
            setLoadingCancel(true);

            // First API call: Update history
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to update data: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Updated data:', data);
            setShowNotification(true);
            setHistory(prevHistory => prevHistory.map(item =>
                item.id === id ? { ...item, status_history: 'Dipesan' } : item
            ));
            setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
            setTimeout(() => {
                setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
                setLoadingCancel(false);
                setShowNotification(false);
            }, 1000);
            setSelectedId(null);

            const orderId = Cookies.get('orderIdTunai');

            // Third API call: Update Invoice with status
            const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-invoice/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status_history: 'Dipesan',
                    status_pembayaran: 'Lunas',
                }),
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update invoice status');
            }

            const updateData = await updateResponse.json();
            console.log('Invoice status update response:', updateData);

            // Handle successful submission
            setShowNotification(true);
            setHistory(prevHistory => prevHistory.map(item =>
                item.id === id ? { ...item, status_history: 'Dipesan' } : item
            ));

            setTimeout(() => {
                setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
                setBtnLoading(false);
                setShowNotification(false);
            }, 1000);

            setSelectedId(null);

        } catch (error) {
            console.error('An error occurred:', error);
            setError(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }

    };

    const handleSubmitCancel = async (e, id) => {
        e.preventDefault();
        if (!id) {
            setError('No ID available to edit.');
            return;
        };
        const formData = new FormData();
        const currentDate = new Date().toISOString().split('T')[0];
        formData.append('status_history', 'Dibatalkan');
        formData.append('tanggal_pembatalan', currentDate);
        formData.append('alasan_pembatalan', 'Tidak Disetujui oleh Admin');
        setLoadingCancel(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
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
                setHistory(prevHistory => prevHistory.map(item =>
                    item.id === id ? { ...item, status_history: 'Dibatalkan' } : item
                ));
                setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
                setTimeout(() => {
                    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
                    setLoadingCancel(false);
                    setShowNotificationCancel(false);
                    setTimeout(() => setShowNotificationCancel(false), 3000);
                }, 1000);
                setSelectedId(null);
            };
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setLoadingCancel(false);
        };
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
    }

    if (typeof window !== 'undefined') {
        console.log("Window Test");
    }

    return (
        <>
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' ? (
                null
            ) : activeComponent === 'list' ? (
                null
            ) : activeComponent === 'user' ? (
                null
            ) : activeComponent === 'discount' ? (
                null
            ) : activeComponent === 'history' ? (
                null
            ) : activeComponent === 'rating' ? (
                null
            ) :
                <div className="p-4 xl:ml-80">
                    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                        <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                            <div className="capitalize">
                                <nav aria-label="breadcrumb" className="w-max">
                                    <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                        <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                            <a href="#">
                                                <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">beranda</p>
                                            </a>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Notifikasi</p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Notifikasi</h6>
                            </div>
                            <div className="flex">
                                <div className="md:order-1 sm:order-2 order-2">
                                    <NavbarAdmin />
                                </div>
                                <div className="order-1">
                                    <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="mt-12 flex flex-col gap-4">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            Array.isArray(history) && history.length > 0 ? (
                                history.map(item => (
                                    <div key={item.id}>
                                        <Card className="w-full h-full">
                                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                                <div className="mb-4 flex flex-col gap-4">
                                                    <div className="flex flex-row gap-4">
                                                        <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                                        <div className="flex flex-col gap-2">
                                                            <span className="font-semibold text-black text-lg">
                                                                {item.nama_lengkap}
                                                            </span>
                                                            <span className="text-black">
                                                                {item.nama_lengkap} ingin menyewa motor {item.list_motor.nama_motor}, apakah anda menyetujui pemintaan ini?
                                                            </span>
                                                            <Label className="flex gap-2">
                                                                <span>Total pembayaran </span>
                                                                <span className="font-bold">
                                                                    {`Rp. ${detail.total_pembayaran}`}
                                                                </span>
                                                            </Label>
                                                        </div>
                                                    </div>
                                                    <div className="border-t border-[#969696] w-full"></div>
                                                    <div className="w-full justify-end flex flex-row gap-4">
                                                        <form onSubmit={(e) => handleSubmitCancel(e, item.id)} method="post">
                                                            <Button color="red" type="submit">
                                                                Batal
                                                            </Button>
                                                        </form>
                                                        <form onSubmit={(e) => handleSubmit(e, item.id)} method="post">
                                                            <Button type="submit" color="green">
                                                                Konfirmasi
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <div>Notification kosong</div>
                            )
                        )}
                        {showNotification && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                <span>Konfirmasi Berhasil</span>
                                <MdDone className="ml-2 text-white" />
                            </div>
                        )}
                        {showNotificationCancel && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                <span>Pembatalan Berhasil</span>
                                <MdDone className="ml-2 text-white" />
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}