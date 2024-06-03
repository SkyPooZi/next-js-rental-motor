'use client';

import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { MdDone } from "react-icons/md";
import { CheckCircleIcon, CheckIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

import NavbarAdmin from "@/components/sub/admin/navbar";

function AlertCancel() {
    const [showAlert, setShowAlert] = useState(true);

    const handleCloseAlert = () => {
        setShowAlert(false);
        window.location.reload();
    };

    return (
        showAlert && (
            <div className="fixed z-50 flex items-center bg-[#F6F7F9] px-4 py-4 rounded-md shadow-lg" role="alert">
                <IconButton variant="text" className="bg-[#FDE8E8]">
                    <XCircleIcon color="#F05252" className="h-6 w-6" />
                </IconButton>
                <span className="mx-2 text-[#6B7280] text-sm">Gagal menyetujui.</span>
                <button onClick={handleCloseAlert}>
                    <XMarkIcon className="h-6 w-6" color="#9CA3AF" />
                </button>
            </div>
        )
    );
}

export default function Notification() {
    const [showAlertCancel, setShowAlertCancel] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [id, setId] = useState(null); // State to store the id
    const [history, setHistory] = useState([]);
    const [status_history, setStatusHistory] = useState('');
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredHistories = data.history.filter(item => item.status_history === 'Menunggu Pembayaran');
                setHistory(filteredHistories);

                if (filteredHistories.length > 0) {
                    setId(filteredHistories[0].id);
                }

            } catch (error) {
                console.error('Fetch Data Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            setError('No ID available to edit.');
            return;
        }

        const formData = new FormData();
        formData.append('status_history', 'Dipesan');

        setBtnLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                },
                body: formData
            });

            if (!response.ok) {
                setError(`Failed to update data: ${response.statusText}`);
            } else {
                const data = await response.json();
                console.log('Updated data:', data);
                setShowNotification(true);

                setHistory(prevHistory => prevHistory.map(item =>
                    item.id === id ? { ...item, status_history: 'Dipesan' } : item
                ));

                setTimeout(() => {
                    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
                    setBtnLoading(false);
                    setShowNotification(false);
                    setTimeout(() => setShowNotification(false), 3000);
                }, 1000);
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlertCancel = () => {
        setShowAlertCancel(false);
    };

    const handleShowAlertCancel = (id) => {
        setShowAlertCancel(true);
    };

    const handleCloseAlert = () => {
        setShowNotification(false);
    };

    return (
        <div className="p-4 xl:ml-80">
            <div className="h-full w-full flex flex-row justify-center">
                {showAlertCancel && <AlertCancel onClose={handleCloseAlertCancel} />}
            </div>
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
                    <NavbarAdmin />
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
                                    <form onSubmit={(e) => handleSubmit(e, item.id)} method="post">
                                        <CardHeader floated={false} shadow={false} className="rounded-none">
                                            <div className="mb-4 flex flex-col gap-4">
                                                <div className="flex flex-row gap-4">
                                                    <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                                    <div className="flex flex-col gap-2">
                                                        <span className="font-semibold text-black">
                                                            {item.nama_lengkap}
                                                        </span>
                                                        <span className="text-black">
                                                            {item.nama_lengkap} ingin menyewa motor {item.list_motor.nama_motor}, apakah anda menyetujui pemintaan ini?
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-[#969696] w-full"></div>
                                                <div className="w-full justify-end flex flex-row gap-4">
                                                    <Button color="red" onClick={() => handleShowAlertCancel(item.id)}>
                                                        Batal
                                                    </Button>
                                                    <Button type="submit" color="green">
                                                        Konfirmasi
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </form>
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
            </div>
        </div>
    );
}