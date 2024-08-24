"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { MdDone } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
    Spinner
} from "@material-tailwind/react";

const TABLE_HEAD = ["No", "Nama Pengguna", "Email", "Peran", ""];

export function UserListTable() {
    const [id, setId] = useState(null); // State to store the id
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;
    const token = Cookies.get('token');

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const responseText = await response.text();
            console.log('Response Text:', responseText);

            const data = JSON.parse(responseText);
            console.log('Parsed JSON Data:', data);

            const users = data.user;
            console.log('User Data:', users);

            setUser(users);

            const totalUser = users.length;
            setTotalUser(totalUser);

            if (users.length > 0) {
                setId(users[0].id);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredUsers = user.filter(user =>
        user.nama_pengguna.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUserData = filteredUsers.slice(startIndex, endIndex);

    // Calculate the total number of pages based on the filtered data
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const deleteUser = async (userId) => {
        if (!userId) {
            setError('No ID available to delete.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchData();
                setUser((prevUser) => prevUser.filter(m => m.id !== userId));
                console.log(`user with id ${userId} deleted successfully.`);
                setError('');
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } else {
                const errorMessage = await response.text();
                console.error('Failed to delete the user:', errorMessage);
                setError(`Failed to delete the user: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            setError(`Delete error: ${error.message}`);
        }
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
                                    Semua Pengguna
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total {totalUser} Pengguna
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
                                {currentUserData.length === 0 ? (
                                    <Typography className="p-4" variant="small" color="grey">
                                        Data tidak ditemukan
                                    </Typography>
                                ) : (
                                    currentUserData && currentUserData.map((userData, index) => (
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
                                                    {userData.nama_pengguna}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="pl-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {userData.email}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {userData.peran}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Link href={`/admin/detailUser/${userData.id}`}>
                                                    <Tooltip content="Detail">
                                                        <IconButton variant="text" className="bg-[#0D6EFD]">
                                                            <MagnifyingGlassIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={`/admin/editUser/${userData.id}`}>
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
                                                        onClick={() => deleteUser(userData.id)}
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
            </div>
        </>
    );
}