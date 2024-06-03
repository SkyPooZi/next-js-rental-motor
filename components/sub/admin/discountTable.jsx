"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { MdDone } from "react-icons/md";
import { PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
    Breadcrumbs,
} from "@material-tailwind/react";

import NavbarAdmin from "@/components/sub/admin/navbar";

const TABLE_HEAD = ["No", "Nama Diskon", "Potongan Harga", "Periode", ""];

function PopupDelete() {
    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
        setShowPopup(false);
        // window.location.reload();
    };

    return (
        showPopup && (
            <div className="fixed z-50 flex flex-col gap-2 items-center bg-[#F6F7F9] px-4 py-4 rounded-md shadow-lg" role="alert">
                <span className="">
                    Apakah anda yakin ingin menghapus diskon ini?
                </span>
                <div className="w-full flex flex-row justify-end gap-4">
                    <Button color="red" onClick={handleClosePopup}>
                        Batal
                    </Button>
                    <Button color="green">
                        Konfirmasi
                    </Button>
                </div>
            </div>
        )
    );
}

export function DiscountTable() {
    const [id, setId] = useState(null); // State to store the id
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [diskon, setDiskon] = useState([]);
    const [totalDiskon, setTotalDiskon] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                }
            });
            const responseText = await response.text();
            console.log('Response Text:', responseText);

            const data = JSON.parse(responseText);
            console.log('Parsed JSON Data:', data);

            const diskons = data.diskon;
            console.log('Diskon Data:', diskons);

            setDiskon(diskons);

            const totalDiskon = diskons.length;
            setTotalDiskon(totalDiskon);

            if (diskons.length > 0) {
                setId(diskons[0].id);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredDiscounts = diskon.filter(diskon =>
        diskon.nama_diskon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDiscountData = filteredDiscounts.slice(startIndex, endIndex);

    // Calculate the total number of pages based on the filtered data
    const totalPages = Math.ceil(filteredDiscounts.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const deleteDiscount = async (discountId) => {
        if (!discountId) {
            setError('No ID available to delete.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/delete/${discountId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Trigger a new fetch request to update the data
                fetchData(); // Assuming fetchData is defined to fetch the motor data
                setDiskon((prevDiskon) => prevDiskon.filter(m => m.id !== discountId));
                console.log(`discount with id ${discountId} deleted successfully.`);
                setError(''); // Clear any previous errors
                setShowNotification(true); // Show notification
                // Optionally, hide notification after a certain duration
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000); // 3000 milliseconds (3 seconds)
            } else {
                const errorMessage = await response.text();
                console.error('Failed to delete the discount:', errorMessage);
                setError(`Failed to delete the discount: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            setError(`Delete error: ${error.message}`);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleShowPupup = () => {
        setShowPopup(true);
    };

    return (
        <>
            <div className="p-4">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Semua Diskon
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total {totalDiskon} Diskon
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
                                <a href="/admin/addDiscount">
                                    <Button
                                        className="flex items-center gap-3 capitalize text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]" size="sm">
                                        Tambah Diskon Baru
                                    </Button>
                                </a>
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
                                {currentDiscountData.length === 0 ? (
                                    <Typography className="p-4" variant="small" color="grey">
                                        Data tidak ditemukan
                                    </Typography>
                                ) : (
                                    currentDiscountData && currentDiscountData.map((diskonData, index) => (
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
                                                    {diskonData.nama_diskon}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="pl-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {diskonData.potongan_harga}%
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="pl-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {diskonData.tanggal_mulai} - {diskonData.tanggal_selesai}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Link href={`/admin/detailDiscount/${diskonData.id}`}>
                                                    <Tooltip content="Detail">
                                                        <IconButton variant="text" className="bg-[#0D6EFD]">
                                                            <MagnifyingGlassIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={`/admin/editDiscount/${diskonData.id}`}>
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
                                                        onClick={() => deleteDiscount(diskonData.id)}
                                                    >
                                                        <TrashIcon color="white" className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    )))}
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
            </div>
        </>
    );
}