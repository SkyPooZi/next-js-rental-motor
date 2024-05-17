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

const TABLE_HEAD = ["No", "Nama Pengguna", "Email", "Peran", ""];

const TABLE_ROWS = [
    {
        no: 1,
        name: "Qidir",
        email: "user@gmail.com",
        role: "User",
    },
    {
        no: 2,
        name: "Qamar",
        email: "user@gmail.com",
        role: "User",
    },
    {
        no: 3,
        name: "Zidan",
        email: "user@gmail.com",
        role: "User",
    },
    {
        no: 4,
        name: "Damar",
        email: "user@gmail.com",
        role: "User",
    },
    {
        no: 5,
        name: "Arvi",
        email: "user@gmail.com",
        role: "Admin",
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

export function UserListTable() {
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
                                            name,
                                            email,
                                            role,
                                        },
                                        index,
                                    ) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
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
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {role}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <a href="/admin/detailUser">
                                                        <Tooltip content="Detail">
                                                            <IconButton variant="text" className="bg-[#0D6EFD]">
                                                                <MagnifyingGlassIcon color="white" className="h-5 w-5" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                    <a href="/admin/editUser">
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