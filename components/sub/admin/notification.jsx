'use client';

import React, { useState } from "react";
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

function AlertConfirm() {
    const [showAlert, setShowAlert] = useState(true);

    const handleCloseAlert = () => {
        setShowAlert(false);
        window.location.reload();
    };

    return (
        showAlert && (
            <div className="fixed z-50 flex items-center bg-[#F6F7F9] px-4 py-4 rounded-md shadow-lg" role="alert">
                <IconButton variant="text" className="bg-[#DEF7EC]">
                    <CheckCircleIcon color="#0E9F6E" className="h-6 w-6" />
                </IconButton>
                <span className="mx-2 text-[#6B7280] text-sm">Berhasil menyetujui.</span>
                <button onClick={handleCloseAlert}>
                    <XMarkIcon className="h-6 w-6" color="#9CA3AF" />
                </button>
            </div>
        )
    );
}

export default function Notification() {
    const [showAlertCancel, setShowAlertCancel] = useState(false);

    const handleCloseAlertCancel = () => {
        setShowAlertCancel(false);
    };

    const handleShowAlertCancel = () => {
        setShowAlertCancel(true);
    };

    const [showAlertConfirm, setShowAlertConfirm] = useState(false);

    const handleCloseAlertConfirm = () => {
        setShowAlertConfirm(false);
    };

    const handleShowAlertConfirm = () => {
        setShowAlertConfirm(true);
    };

    return (
        <div className="p-4 xl:ml-80">
            <div className="h-full w-full flex flex-row justify-center">
                {showAlertCancel && <AlertCancel onClose={handleCloseAlertCancel} />}
                {showAlertConfirm && <AlertConfirm onClose={handleCloseAlertConfirm} />}
            </div>
            <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                    <div className="capitalize">
                        <nav aria-label="breadcrumb" className="w-max">
                            <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                    <a href="#">
                                        <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
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
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-black">
                                        Qamar
                                    </span>
                                    <span className="text-black">
                                        Qamar ingin menyewa motor NMAX, apakah anda menyetujui pemintaan ini?
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="w-full justify-end flex flex-row gap-4">
                                <Button color="red" onClick={handleShowAlertCancel}>
                                    Batal
                                </Button>
                                <Button color="green" onClick={handleShowAlertConfirm}>
                                    Konfirmasi
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-black">
                                        Qamar
                                    </span>
                                    <span className="text-black">
                                        Qamar ingin menyewa motor NMAX, apakah anda menyetujui pemintaan ini?
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="w-full justify-end flex flex-row gap-4">
                                <Button color="red" onClick={handleShowAlertCancel}>
                                    Batal
                                </Button>
                                <Button color="green" onClick={handleShowAlertConfirm}>
                                    Konfirmasi
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-black">
                                        Qamar
                                    </span>
                                    <span className="text-black">
                                        Qamar ingin menyewa motor NMAX, apakah anda menyetujui pemintaan ini?
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="w-full justify-end flex flex-row gap-4">
                                <Button color="red" onClick={handleShowAlertCancel}>
                                    Batal
                                </Button>
                                <Button color="green" onClick={handleShowAlertConfirm}>
                                    Konfirmasi
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar" />
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-black">
                                        Qamar
                                    </span>
                                    <span className="text-black">
                                        Qamar ingin menyewa motor NMAX, apakah anda menyetujui pemintaan ini?
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="w-full justify-end flex flex-row gap-4">
                                <Button color="red" onClick={handleShowAlertCancel}>
                                    Batal
                                </Button>
                                <Button color="green" onClick={handleShowAlertConfirm}>
                                    Konfirmasi
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}