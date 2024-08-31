"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { MdDone } from "react-icons/md";
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
    Spinner
} from "@material-tailwind/react";
import DeleteConfirmationModal from "../deleteConfirmModal";

const TABLE_HEAD = ["No", "Nama Motor", "Stock", "Harga", "Status", ""];

export function MotorListTable() {
    const [id, setId] = useState(null); // State to store the id
    const [showPopup, setShowPopup] = useState(false);
    const [motor, setMotor] = useState([]);
    const [totalMotor, setTotalMotor] = useState(0);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [motorToDelete, setMotorToDelete] = useState(null); // Motor to delete
    const itemsPerPage = 5;
    const token = Cookies.get("token");

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Parsed JSON Data:', data);

            const motors = data.listMotor;
            console.log('Motor Data:', motors);

            setMotor(motors);

            const totalMotor = motors.length;
            setTotalMotor(totalMotor);

            if (motors.length > 0) {
                setId(motors[0].id);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError(`Fetch error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredMotors = motor.filter(motor =>
        motor.nama_motor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMotorData = filteredMotors.slice(startIndex, endIndex);

    // Calculate the total number of pages based on the filtered data
    const totalPages = Math.ceil(filteredMotors.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const confirmDeleteMotor = (motorId) => {
        setMotorToDelete(motorId);
        setIsModalOpen(true);
    };

    const deleteMotor = async () => {
        if (!motorToDelete) {
            setError('No ID available to delete.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/delete/${motorToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchData();
                setMotor((prevMotor) => prevMotor.filter(m => m.id !== motorToDelete));
                console.log(`Motor with id ${motorToDelete} deleted successfully.`);
                setError('');
                setShowNotification(true); // Show notification
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } else {
                const errorMessage = await response.text();
                console.error('Failed to delete the motor:', errorMessage);
                setError(`Failed to delete the motor: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            setError(`Delete error: ${error.message}`);
        } finally {
            setIsModalOpen(false); // Close the modal
            setMotorToDelete(null); // Clear the motor to delete
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
                                    Semua Motor
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Total {totalMotor} Motor
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
                                <Link href="/admin/addMotor">
                                    <Button
                                        className="flex items-center gap-3 capitalize text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]" size="sm">
                                        Tambah Motor Baru
                                    </Button>
                                </Link>
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
                                {currentMotorData.length === 0 ? (
                                    <Typography className="p-4" variant="small" color="grey">
                                        Data tidak ditemukan
                                    </Typography>
                                ) : (
                                    currentMotorData && currentMotorData.map((motorData, index) => (
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
                                                    {motorData.nama_motor}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="pl-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {motorData.stok_motor}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {motorData.harga_motor_per_1_hari}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-max">
                                                    <Chip
                                                        className="capitalize"
                                                        size="sm"
                                                        variant="ghost"
                                                        value={motorData.status_motor}
                                                        color={
                                                            motorData.status_motor === "Tersedia"
                                                                ? "green"
                                                                : motorData.status_motor === "Tertunda"
                                                                    ? "amber"
                                                                    : "red"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Link href={`/admin/detailMotor/${motorData.id}`}>
                                                    <Tooltip content="Detail">
                                                        <IconButton variant="text" className="bg-[#0D6EFD]">
                                                            <EyeIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Link href={`/admin/editMotor/${motorData.id}`}>
                                                    <Tooltip content="Edit">
                                                        <IconButton variant="text" className="bg-[#FFC107] mx-2">
                                                            <PencilSquareIcon color="white" className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                {/* <Tooltip content="Delete">
                                                    <IconButton
                                                        variant="text"
                                                        className="bg-red-500"
                                                        onClick={() => confirmDeleteMotor(motorData.id)}
                                                    >
                                                        <TrashIcon color="white" className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip> */}
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

            {/* Use the DeleteConfirmationModal component */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={deleteMotor}
                entityName="motor" // Pass the entity name here
            />
        </>
    );
}
