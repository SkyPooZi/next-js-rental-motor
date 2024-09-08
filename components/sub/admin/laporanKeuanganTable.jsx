"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
    Spinner
} from "@material-tailwind/react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns"
import { MdDone } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import DeleteConfirmationModal from "../deleteConfirmModal";

const TABLE_HEAD = ["No", "Pengguna", "Email", "Nama Motor", "Total Pembayaran", ""];

export function MoneyManagementTable({ onSelectRange }) {
    const [date, setDate] = useState(null);
    const [id, setId] = useState(null);
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [keuangan, setKeuangan] = useState([]);
    const [totalLaporan, setTotalLaporan] = useState(0);
    const [activeComponent, setActiveComponent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [historyToDelete, setHistoryToDelete] = useState(null); // History to delete
    const itemsPerPage = 5;
    const token = Cookies.get("token");

    const formatRupiah = (number) => {
        const stringNumber = number.toString();
        const split = stringNumber.split(',');
        const sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        const ribuan = split[0].substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return 'Rp ' + rupiah;
    };

    const fetchData = async () => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/keuangan/all`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const responseText = await response.text();
            console.log('Response Text:', responseText);

            const data = JSON.parse(responseText);
            console.log('Parsed JSON Data:', data);

            setKeuangan(data.keuangan || []);

            const totalLaporan = data.keuangan?.length || 0;
            setTotalLaporan(totalLaporan);

            if (data.keuangan.length > 0) {
                setId(data.keuangan[0].id);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [date]);

    const filteredHistory = keuangan.filter(keuangan =>
        keuangan.history.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHistoryData = filteredHistory.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const confirmDeleteHistory = (historyId) => {
        setHistoryToDelete(historyId);
        setIsModalOpen(true);
    };

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                    <Spinner color="blue" size="xl" />
                </div>
            )}
            <div className="mb-20 xl:mb-0 p-4">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Semua Laporan Keuangan
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total {totalLaporan} Laporan
                                </Typography>
                            </div>
                            <div className="flex md:flex-row flex-col w-full shrink-0 gap-2 md:w-max items-end md:items-center">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Ketik disini"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                className="font-semibold text-black leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentHistoryData.length === 0 ? (
                                    <Typography className="p-4" variant="small" color="grey">
                                        Data tidak ditemukan
                                    </Typography>
                                ) : (
                                    currentHistoryData && currentHistoryData.map((historyData, index) => (
                                        <tr key={index}>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {historyData.history.nama_lengkap}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {historyData.history.email}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {historyData.history.list_motor.nama_motor}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {formatRupiah(historyData.history.total_pembayaran)}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Link href={`/admin/detailMoneyManagement/${historyData.id}`}>
                                                    <Tooltip content="Detail">
                                                        <IconButton variant="text" className="bg-[#0D6EFD]">
                                                            <EyeIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={`/admin/editHistory/${historyData.id}`}>
                                                    <Tooltip content="Edit">
                                                        <IconButton variant="text" className="bg-[#FFC107] mx-2">
                                                            <PencilSquareIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                {showNotification && (
                                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                        <span>Delete Berhasil</span>
                                        <MdDone className="ml-2 text-white" />
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide max-w-xs">
                            {Array.from({ length: totalPages }, (_, i) => {
                                let startPage = 0;
                                let endPage = 0;

                                if (totalPages <= 5) {
                                    // Show all pages if total pages are 5 or less
                                    startPage = 0;
                                    endPage = totalPages;
                                } else if (currentPage <= 3) {
                                    // If current page is 3 or less, show the first 5 pages
                                    startPage = 0;
                                    endPage = 5;
                                } else if (currentPage + 2 >= totalPages) {
                                    // If current page is near the end, show the last 5 pages
                                    startPage = totalPages - 5;
                                    endPage = totalPages;
                                } else {
                                    // Otherwise, show the current page in the middle
                                    startPage = currentPage - 3;
                                    endPage = currentPage + 2;
                                }

                                if (i >= startPage && i < endPage) {
                                    return (
                                        <IconButton
                                            key={i}
                                            variant="text"
                                            size="sm"
                                            onClick={() => handlePageChange(i + 1)}
                                            className={currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}
                                        >
                                            {i + 1}
                                        </IconButton>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
