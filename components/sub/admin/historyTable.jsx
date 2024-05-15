"use client";

import React, { useState } from "react";

import { PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
    Breadcrumbs,
} from "@material-tailwind/react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns"

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

const TABLE_HEAD = ["No", "Pengguna", "Jenis Motor", "Tanggal Booking", "Status", ""];

const TABLE_ROWS = [
    {
        no: 1,
        name: "Qamar",
        motorType: "Vario 150",
        bookingDate: "10-03-2024 - 18-03-2024",
        status: "Menunggu Pembayaran",
    },
    {
        no: 2,
        name: "Khalid",
        motorType: "CRF",
        bookingDate: "10-03-2024 - 18-03-2024",
        status: "Dipesan",
    },
    {
        no: 3,
        name: "Khidir",
        motorType: "NMAX",
        bookingDate: "10-03-2024 - 18-03-2024",
        status: "Sedang Digunakan",
    },
    {
        no: 4,
        name: "Ismail",
        motorType: "Beat",
        bookingDate: "10-03-2024 - 18-03-2024",
        status: "Selesai",
    },
    {
        no: 5,
        name: "Skipo",
        motorType: "PCX",
        bookingDate: "10-03-2024 - 18-03-2024",
        status: "Dibatalkan",
    },
];

function PopupDelete() {
    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
        setShowPopup(false);
        window.location.reload();
    };

    return (
        showPopup && (
            <div className="fixed z-50 flex flex-col gap-2 items-center bg-[#F6F7F9] px-4 py-4 rounded-md shadow-lg" role="alert">
                <span className="">
                    Apakah anda yakin ingin menghapus history ini?
                </span>
                <div className="w-full flex flex-row justify-end gap-4">
                    <Button variant="destructive" onClick={handleClosePopup}>
                        Batal
                    </Button>
                    <Button variant="done">
                        Konfirmasi
                    </Button>
                </div>
            </div>
        )
    );
}

export function HistoryTable() {
    const [date, setDate] = React.useState(Date);

    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleShowPupup = () => {
        setShowPopup(true);
    };

    const [filteredData, setFilteredData] = useState(TABLE_ROWS);
    const [activeComponent, setActiveComponent] = useState('all');

    const handleButtonClick = (type) => {
        let newData = [];

        switch (type) {
            case 'all':
                newData = TABLE_ROWS;
                break;
            case 'paymentWait':
                newData = TABLE_ROWS.filter(row => row.status === "Menunggu Pembayaran");
                break;
            case 'inOrder':
                newData = TABLE_ROWS.filter(row => row.status === "Dipesan");
                break;
            case 'inUse':
                newData = TABLE_ROWS.filter(row => row.status === "Sedang Digunakan");
                break;
            case 'done':
                newData = TABLE_ROWS.filter(row => row.status === "Selesai");
                break;
            case 'cancelled':
                newData = TABLE_ROWS.filter(row => row.status === "Dibatalkan");
                break;
            default:
                newData = TABLE_ROWS;
        }

        setFilteredData(newData);
        setActiveComponent(type);
    };

    const [position, setPosition] = React.useState("bottom");

    return (
        <>
            <div className="h-full w-full flex flex-row justify-center">
                {showPopup && <PopupDelete onClose={handleClosePopup} />}
            </div>
            <div className="p-4">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Semua Riwayat
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total 134 Riwayat
                                </Typography>
                            </div>
                            <div className="flex md:flex-row flex-col w-full shrink-0 gap-2 md:w-max items-end md:items-center">
                                <div className="w-full md:w-72">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-between text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "LLL dd, y")} -{" "}
                                                            {format(date.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(date.from, "LLL dd, y")
                                                    )
                                                ) : (
                                                    <span>Pilih</span>
                                                )}
                                                <CalendarIcon className="h-5 w-5" color="black" />
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
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Ketik disini"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
                                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                        <DropdownMenuRadioItem value="all">
                                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'all' ? 'text-black' : ''}`} onClick={() => handleButtonClick('all')}>
                                                <Typography className={`text-sm ${activeComponent !== 'all' ? '' : ''}`}>
                                                    Semua
                                                </Typography>
                                            </button>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="paymentWait">
                                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'paymentWait' ? 'text-black' : ''}`} onClick={() => handleButtonClick('paymentWait')}>
                                                <Typography className={`text-sm ${activeComponent !== 'paymentWait' ? '' : ''}`}>
                                                    Menunggu Pembayaran
                                                </Typography>
                                            </button>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="inOrder">
                                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'inOrder' ? 'text-black' : ''}`} onClick={() => handleButtonClick('inOrder')}>
                                                <Typography className={`text-sm ${activeComponent !== 'inOrder' ? '' : ''}`}>
                                                    Dipesan
                                                </Typography>
                                            </button>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="inUse">
                                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'inUse' ? 'text-black' : ''}`} onClick={() => handleButtonClick('inUse')}>
                                                <Typography className={`text-sm ${activeComponent !== 'inUse' ? '' : ''}`}>
                                                    Sedang Digunakan
                                                </Typography>
                                            </button>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="done">
                                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'done' ? 'text-black' : ''}`} onClick={() => handleButtonClick('done')}>
                                                <Typography className={`text-sm ${activeComponent !== 'done' ? '' : ''}`}>
                                                    Selesai
                                                </Typography>
                                            </button>
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="cancelled">
                                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'cancelled' ? 'text-black' : ''}`} onClick={() => handleButtonClick('cancelled')}>
                                                <Typography className={`text-sm ${activeComponent !== 'cancelled' ? '' : ''}`}>
                                                    Dibatalkan
                                                </Typography>
                                            </button>
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-full justify-between hidden md:flex">
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'all' ? 'text-black' : ''}`} onClick={() => handleButtonClick('all')}>
                                <Typography className={`text-sm ${activeComponent !== 'all' ? '' : ''}`}>
                                    Semua
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'paymentWait' ? 'text-black' : ''}`} onClick={() => handleButtonClick('paymentWait')}>
                                <Typography className={`text-sm ${activeComponent !== 'paymentWait' ? '' : ''}`}>
                                    Menunggu Pembayaran
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'inOrder' ? 'text-black' : ''}`} onClick={() => handleButtonClick('inOrder')}>
                                <Typography className={`text-sm ${activeComponent !== 'inOrder' ? '' : ''}`}>
                                    Dipesan
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'inUse' ? 'text-black' : ''}`} onClick={() => handleButtonClick('inUse')}>
                                <Typography className={`text-sm ${activeComponent !== 'inUse' ? '' : ''}`}>
                                    Sedang Digunakan
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'done' ? 'text-black' : ''}`} onClick={() => handleButtonClick('done')}>
                                <Typography className={`text-sm ${activeComponent !== 'done' ? '' : ''}`}>
                                    Selesai
                                </Typography>
                            </button>
                            <button className={`cursor-pointer text-[#6B7280] ${activeComponent === 'cancelled' ? 'text-black' : ''}`} onClick={() => handleButtonClick('cancelled')}>
                                <Typography className={`text-sm ${activeComponent !== 'cancelled' ? '' : ''}`}>
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
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(
                                    (
                                        {
                                            no,
                                            name,
                                            motorType,
                                            bookingDate,
                                            status,
                                        },
                                        index,
                                    ) => {
                                        const isLast = index === filteredData.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={name}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {no}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="pl-3">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {motorType}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {bookingDate}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            className="capitalize"
                                                            size="sm"
                                                            variant="ghost"
                                                            value={status}
                                                            color={
                                                                status === "Selesai"
                                                                    ? "green"
                                                                    : status === "Menunggu Pembayaran"
                                                                        ? "blue"
                                                                        : status === "Dipesan"
                                                                            ? "yellow"
                                                                            : status === "Sedang Digunakan"
                                                                                ? "orange"
                                                                                : "red"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <a href="/admin/detailHistory">
                                                        <Tooltip content="Detail">
                                                            <IconButton variant="text" className="bg-[#0D6EFD]">
                                                                <MagnifyingGlassIcon color="white" className="h-5 w-5" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                    <a href="/admin/editHistory">
                                                        <Tooltip content="Edit">
                                                            <IconButton variant="text" className="bg-[#FFC107] mx-2">
                                                                <PencilSquareIcon color="white" className="h-5 w-5" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                    <Tooltip content="Delete">
                                                        <IconButton variant="text" className="bg-red-500" onClick={handleShowPupup}>
                                                            <TrashIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
                        <div className="flex items-center gap-2">
                            <IconButton variant="outlined" size="sm">
                                1
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                2
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                3
                            </IconButton>
                        </div>
                    </CardFooter>
                </Card>
            </div >
        </>
    );
}