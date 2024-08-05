import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { MdHistory } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InvoicePopup from '../invoice';

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
                setNewOrders(filteredOrders);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewOrders();
    }, []);

    const handleInvociePopup = async (historyId) => {
        await fetchInvoiceDetails(historyId);
        setShowInvoice(true);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                <Spinner color="blue" size="xl" />
            </div>
        );
    }

    return (
        <div className="p-4 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Pesanan Baru</h2>
            <div className="overflow-x-auto">
                <div className="flex gap-x-4">
                    {newOrders.map(order => (
                        <div key={order.id} className="flex-none w-[300px] relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md p-4">
                            <div className="flex items-center mb-4">
                                <MdHistory size='25' className="mr-4 text-blue-600" />
                                <div>
                                    <p className="font-medium">ID Pesanan: {order.id}</p>
                                    <p className="text-sm">Nama Lengkap: {order.nama_lengkap}</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${order.list_motor.gambar_motor}`} alt={order.list_motor.nama_motor} className="w-16 h-16 mr-4 rounded-lg" />
                                <div>
                                    <p className="font-medium">Motor: {order.list_motor.nama_motor} ({order.list_motor.merk_motor})</p>
                                    <p className="text-sm text-gray-500">Tipe: {order.list_motor.tipe_motor}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className="text-sm">No. Telp: {order.no_telp}</p>
                                <p className="text-sm">Email: {order.email}</p>
                                <p className="text-sm">Keperluan Menyewa: {order.keperluan_menyewa}</p>
                                <p className="text-sm">Total Pembayaran: Rp. {order.total_pembayaran}</p>
                                <p className="text-sm">Metode Pembayaran: {order.metode_pembayaran}</p>
                                <p className="text-sm">Tanggal Mulai: {order.tanggal_mulai}</p>
                                <p className="text-sm">Tanggal Selesai: {order.tanggal_selesai}</p>
                            </div>
                            <div className='mt-5'>
                                <Button onClick={() => handleInvociePopup(order.id)} variant='outline'>
                                    <Label>
                                        <span className="text-[#FF4D33] cursor-pointer">
                                            Tampilkan Invoice
                                        </span>
                                    </Label>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
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
