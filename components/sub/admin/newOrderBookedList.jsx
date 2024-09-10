import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import ReactWhatsapp from 'react-whatsapp';
import { RiMotorbikeFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import {
    Spinner,
    Card,
    Typography,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from '@/components/ui/loading';
import InvoicePopup from '../invoice';
import Image from 'next/image';

const NewOrderBookedList = () => {
    const [newOrders, setNewOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderNumber, setOrderNumber] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const token = Cookies.get('token');

    const fetchInvoiceDetails = async (historyId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoice/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            const invoiceList = data.midtrans;

            if (Array.isArray(invoiceList)) {
                const matchingInvoice = invoiceList.find(midtrans => midtrans.history_id === historyId);
                if (matchingInvoice) {
                    setOrderNumber(matchingInvoice.id);
                } else {
                    console.error('No matching invoice found for historyId:', historyId);
                }
            } else {
                console.error('Invoice list is not an array:', invoiceList);
            }
        } catch (error) {
            console.error('Failed to fetch invoice list:', error);
        }
    };

    useEffect(() => {
        const fetchNewOrders = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const responseData = await response.json();
                const filteredOrders = responseData.history.filter(order => order.status_history === 'Dipesan');

                const sortedOrders = filteredOrders.sort((a, b) => b.id - a.id);

                console.log('Sorted orders:', sortedOrders);
                setNewOrders(sortedOrders);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewOrders();
    }, [token]);

    const handleInvociePopup = async (historyId) => {
        await fetchInvoiceDetails(historyId);
        setShowInvoice(true);
    };

    const formatTime = (dates) => {
        const date = new Date(dates);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = hours >= 12 ? 'Sore' : 'Pagi';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutes} ${period}`;
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="p-4 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Pesanan Baru</h2>
            <div className='flex gap-3 overflow-x-scroll'>
                {newOrders.map(order => (
                    <Card key={order.id} className="mt-6 mb-2">
                        <CardBody className='w-80'>
                            <Typography variant='h5' color='gray' className='mb-2' >
                                <span className='opacity-80'>Id Pesanan:</span> <span className='font-semibold'>{order.id}</span>
                            </Typography>
                            <div className='flex gap-2'>
                                <div className='flex gap-1.5 py-1 px-2 w-fit items-center mb-2 rounded-md bg-blue-500/10'>
                                    <RiMotorbikeFill size='20' className='text-blue-500' />
                                    <Typography>
                                        <span className='text-blue-500 font-bold'>{order.penerimaan_motor}</span>
                                    </Typography>
                                </div>
                                <div className='flex gap-1.5 py-1 px-2 w-fit items-center mb-2 rounded-md bg-blue-gray-50'>
                                    <IoTimeOutline size='20' className='opacity-90' />
                                    <Typography>
                                        <span className='font-bold opacity-90'>{formatTime(order.tanggal_mulai)}</span>
                                    </Typography>
                                </div>
                            </div>
                            <div className='flex items-center mb-2'>
                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${order.list_motor.gambar_motor}`} alt={order.list_motor.nama_motor} width={100} height={100} className="w-16 h-16 mr-4 rounded-lg" />
                                <div className='flex flex-col max-w-40'>
                                    <Typography variant="h5" color="blue-gray">
                                        {order.list_motor.nama_motor}
                                    </Typography>
                                    <Typography variant="h7" color="blue-gray" className='break-words flex gap-1 items-center'>
                                        <FaLocationDot color='red' /> {order.alamat}
                                    </Typography>
                                </div>
                            </div>
                            <div className="border-t border-gray-500 shadow-md mb-4"></div>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='flex gap-3'>
                                    <Avatar className="w-12 h-12">
                                        {order.user.gambar ? (
                                            <AvatarImage
                                                className="w-full h-full object-cover"
                                                src={
                                                    order.user.google_id || order.user.facebook_id
                                                        ? order.user.gambar
                                                        : `${process.env.NEXT_PUBLIC_API_URL}/storage/${order.user.gambar}`
                                                }
                                            />
                                        ) : (
                                            <AvatarFallback>o_o</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <Typography variant='h6' color='gray'>
                                            <span className='font-semibold opacity-75'>Customer</span>
                                        </Typography>
                                        <Typography variant='h5' color='black'>
                                            <span className='font-bold'>{order.nama_lengkap}</span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <motion.div
                                        whileHover={{
                                            background: '#1b5e20',
                                            color: '#fff',
                                            transition: { duration: 0.3, type: 'tween', bounce: 0.25 },
                                        }}
                                        className='px-3 py-3 rounded-full bg-green-500 cursor-pointer'
                                    >
                                        <ReactWhatsapp number={order.nomor_hp} message={`Hai ${order.nama_lengkap}, Motor yang anda sewa adalah motor ${order.list_motor.nama_motor}} `} className="flex items-center font-bold text-white wa">
                                            <FaWhatsapp size='20' color='white' />
                                        </ReactWhatsapp>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="border-t border-gray-500 shadow-md"></div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className='self-end'>
                                <Button className="bg-blue-500">
                                    <Link href={`/admin/editHistory/${order.id}`}>
                                        <Label>
                                            <span className="cursor-pointer">
                                                Lihat Detail
                                            </span>
                                        </Label>
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                        <CardFooter className="pt-0">
                            <div className='self-end'>
                                <Button onClick={() => handleInvociePopup(order.id)} variant='outline'>
                                    <Label>
                                        <span className="text-blue-500 cursor-pointer">
                                            Tampilkan Invoice
                                        </span>
                                    </Label>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {showInvoice && (
                <InvoicePopup
                    onClose={() => setShowInvoice(false)}
                    orderId={orderNumber}
                    style={{ zIndex: 50 }}
                />
            )}
        </div>
    );
};

export default NewOrderBookedList;
