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

const TABLE_HEAD = ["No", "Pengguna", "Penilaian", "Comment", ""];

const TABLE_ROWS = [
    {
        no: 1,
        user: "Qidir",
        rating: 4,
        comment: "Motor Vario 150 sangat keren",
    },
    {
        no: 2,
        user: "Qamar",
        rating: 5,
        comment: "Motor Vario 150 sangat keren",
    },
    {
        no: 3,
        user: "Zidan",
        rating: 5,
        comment: "Motor Vario 150 sangat keren",
    },
    {
        no: 4,
        user: "Damar",
        rating: 3,
        comment: "Motor Vario 150 sangat keren",
    },
    {
        no: 5,
        user: "Arvi",
        rating: 3,
        comment: "Bagus",
    },
];

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
                    Apakah anda yakin ingin menghapus pengguna ini?
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

export function RatingTable() {
    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleShowPupup = () => {
        setShowPopup(true);
    };

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
                                    Semua Pengguna
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total 258 Pengguna
                                </Typography>
                            </div>
                            <div className="flex md:flex-row flex-col w-full shrink-0 gap-2 md:w-max items-end md:items-center">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Ketik disini"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
                                {TABLE_ROWS.map(
                                    (
                                        {
                                            no,
                                            user,
                                            rating,
                                            comment,
                                        },
                                        index,
                                    ) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={user}>
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
                                                        {user}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="pl-3 flex items-center">
                                                        {Array.from({ length: rating }, (_, i) => (
                                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                                                <path d="M12 .587l3.668 7.425 8.332 1.212-6.042 5.888 1.426 8.31L12 18.897l-7.384 3.925 1.426-8.31L.412 9.224l8.332-1.212L12 .587z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {comment}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <a href="/admin/detailRating">
                                                        <Tooltip content="Detail">
                                                            <IconButton variant="text" className="bg-[#0D6EFD]">
                                                                <MagnifyingGlassIcon color="white" className="h-5 w-5" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                    <a href="/admin/editRating">
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
            </div>
        </>
    );
}