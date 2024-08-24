"use client";

import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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

const TABLE_HEAD = ["No", "Pengguna", "Jenis Motor", "Tanggal Booking", "Status", ""];

export function HistoryTable({ onSelectRange }) {
    const [date, setDate] = useState(null);
    const [id, setId] = useState(null); // State to store the id
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [history, setHistory] = useState([]);
    const [totalHistory, setTotalHistory] = useState(0);
    const [activeComponent, setActiveComponent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;
    const token = Cookies.get("token");

    const fetchData = async () => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/history/all`;

            if (date?.from && date?.to) {
                const fromDate = format(date.from, 'yyyy-MM-dd');
                const toDate = format(date.to, 'yyyy-MM-dd');
                url += `?tanggal_mulai=${fromDate}&tanggal_selesai=${toDate}`;
            }

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

            setHistory(data.history || []);

            const totalHistory = data.history?.length || 0;
            setTotalHistory(totalHistory);

            if (data.history.length > 0) {
                setId(data.history[0].id);
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

    const getFilteredHistory = () => {
        let filteredHistory = history;

        if (activeComponent !== 'all') {
            filteredHistory = filteredHistory.filter(history => history.status_history === activeComponent);
        }

        // Filter by search term
        if (searchTerm) {
            filteredHistory = filteredHistory.filter(history =>
                history.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by date range
        if (date?.from && date?.to) {
            filteredHistory = filteredHistory.filter(history => {
                const itemStartDate = new Date(history.tanggal_mulai);
                const itemEndDate = new Date(history.tanggal_selesai);
                return itemStartDate >= date.from && itemEndDate <= date.to;
            });
        }

        return filteredHistory;
    }

    const filteredHistory = getFilteredHistory();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHistoryData = filteredHistory.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const deleteHistory = async (historyId) => {
        if (!historyId) {
            setError('No ID available to delete.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/delete/${historyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchData();
                setHistory((prevHistory) => prevHistory.filter(m => m.id !== historyId));
                console.log(`history with id ${historyId} deleted successfully.`);
                setError('');
                setShowNotification(true); // Show notification
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } else {
                const errorMessage = await response.text();
                console.error('Failed to delete the history:', errorMessage);
                setError(`Failed to delete the history: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            setError(`Delete error: ${error.message}`);
        }
    };

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    const [position, setPosition] = React.useState("bottom");

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
                                    Semua Riwayat
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total {totalHistory} Riwayat
                                </Typography>
                            </div>
                            <div className="flex md:flex-row flex-col w-full shrink-0 gap-2 md:w-max items-end md:items-center">
                                <div className="w-full md:w-72">
                                    <div className={cn("grid gap-2")}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "yyyy-MM-dd")} -{" "}
                                                                {format(date.to, "yyyy-MM-dd")}
                                                            </>
                                                        ) : (
                                                            format(date.from, "yyyy-MM-dd")
                                                        )
                                                    ) : (
                                                        <span>Pilih Tanggal</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={setDate}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
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
                        <div className="md:hidden flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Kategori</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={position} onValueChange={handleButtonClick}>
                                        <DropdownMenuRadioItem value="all">
                                            <Typography className={`text-sm ${activeComponent === 'all' ? 'text-black' : 'text-[#6B7280]'}`}>
                                                Semua
                                            </Typography>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Menunggu Pembayaran">
                                            <Typography className={`text-sm ${activeComponent === 'Menunggu Pembayaran' ? 'text-black' : 'text-[#6B7280]'}`}>
                                                Menunggu Pembayaran
                                            </Typography>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Dipesan">
                                            <Typography className={`text-sm ${activeComponent === 'Dipesan' ? 'text-black' : 'text-[#6B7280]'}`}>
                                                Dipesan
                                            </Typography>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Sedang Digunakan">
                                            <Typography className={`text-sm ${activeComponent === 'Sedang Digunakan' ? 'text-black' : 'text-[#6B7280]'}`}>
                                                Sedang Digunakan
                                            </Typography>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Selesai">
                                            <Typography className={`text-sm ${activeComponent === 'Selesai' ? 'text-black' : 'text-[#6B7280]'}`}>
                                                Selesai
                                            </Typography>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Dibatalkan">
                                            <Typography className={`text-sm ${activeComponent === 'Dibatalkan' ? 'text-black' : 'text-[#6B7280]'}`}>
                                                Dibatalkan
                                            </Typography>
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-full justify-between hidden md:flex">
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'all' ? 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} onClick={() => { handleButtonClick('all'), setCurrentPage(1); }}>
                                <Typography className={`text-sm ${activeComponent !== 'all' ? '' : ''}`}>
                                    Semua
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'Menunggu Pembayaran' ? 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} onClick={() => { handleButtonClick('Menunggu Pembayaran'), setCurrentPage(1); }}>
                                <Typography className={`text-sm ${activeComponent !== 'Menunggu Pembayaran' ? '' : ''}`}>
                                    Menunggu Pembayaran
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'Dipesan' ? 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} onClick={() => { handleButtonClick('Dipesan'), setCurrentPage(1); }}>
                                <Typography className={`text-sm ${activeComponent !== 'Dipesan' ? '' : ''}`}>
                                    Dipesan
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'Sedang Digunakan' ? 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} onClick={() => { handleButtonClick('Sedang Digunakan'), setCurrentPage(1); }}>
                                <Typography className={`text-sm ${activeComponent !== 'Sedang Digunakan' ? '' : ''}`}>
                                    Sedang Digunakan
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'Selesai' ? 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} onClick={() => { handleButtonClick('Selesai'), setCurrentPage(1); }}>
                                <Typography className={`text-sm ${activeComponent !== 'Selesai' ? '' : ''}`}>
                                    Selesai
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'Dibatalkan' ? 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:duration-500 text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} onClick={() => { handleButtonClick('Dibatalkan'), setCurrentPage(1); }}>
                                <Typography className={`text-sm ${activeComponent !== 'Dibatalkan' ? '' : ''}`}>
                                    Dibatalkan
                                </Typography>
                            </button>
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
                                                    {historyData.nama_lengkap}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="pl-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {historyData.list_motor.nama_motor}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal tracking-widest"
                                                >
                                                    {historyData.tanggal_mulai} - {historyData.tanggal_selesai}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-max">
                                                    <Chip
                                                        className="capitalize"
                                                        size="sm"
                                                        variant="ghost"
                                                        value={historyData.status_history}
                                                        color={
                                                            historyData.status_history === "Selesai"
                                                                ? "green"
                                                                : historyData.status_history === "Menunggu Pembayaran"
                                                                    ? "blue"
                                                                    : historyData.status_history === "Dipesan"
                                                                        ? "yellow"
                                                                        : historyData.status_history === "Sedang Digunakan"
                                                                            ? "orange"
                                                                            : "red"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Link href={`/admin/detailHistory/${historyData.id}`}>
                                                    <Tooltip content="Detail">
                                                        <IconButton variant="text" className="bg-[#0D6EFD]">
                                                            <MagnifyingGlassIcon color="white" className="h-5 w-5" />
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
                                                <Tooltip content="Delete">
                                                    <IconButton
                                                        variant="text"
                                                        className="bg-red-500"
                                                        onClick={() => deleteHistory(historyData.id)}
                                                    >
                                                        <TrashIcon color="white" className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
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
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <IconButton
                                    key={i}
                                    variant="text"
                                    size="sm"
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}
                                >
                                    {i + 1}
                                </IconButton>
                            ))}
                        </div>
                    </CardFooter>
                </Card>
            </div >
        </>
    );
}