'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { fetchInvoice } from '@/utils/services/invoiceServices';

const InvoicePopup = ({ onClose, orderId }) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [hari, setHari] = useState(0);
    const token = Cookies.get('token');

    useEffect(() => {
        const getInvoiceData = async () => {
            try {
                const data = await fetchInvoice(orderId, token);
                setInvoiceData(data);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        getInvoiceData();
    }, [orderId, token]);

    const {
        midtrans
    } = invoiceData || {};

    const {
        no_pemesanan,
        tanggal_pemesanan,
        tanggal_pembayaran,
        metode_pembayaran,
        total_pemesanan,
        status_pembayaran,
        history
    } = midtrans || {};

    const {
        nama_lengkap,
        email,
        total_pembayaran,
        list_motor,
        diskon,
    } = history || {};

    const {
        nama_motor,
        harga_motor_per_1_hari,
    } = list_motor || {};

    const {
        potongan_harga,
    } = diskon || {};

    useEffect(() => {
        if (!invoiceData) return;

        const { midtrans } = invoiceData;
        if (!midtrans) return;

        const { total_pemesanan, history } = midtrans;
        if (!total_pemesanan || !history) return;

        const { diskon, tanggal_mulai, tanggal_selesai } = history;
        if (!diskon) {
            setDiscountedTotal(total_pemesanan);
            setDiscountAmount(0);
        } else {
            const { potongan_harga } = diskon;
            const discountValue = (total_pemesanan * potongan_harga) / 100;
            const discountedTotal = total_pemesanan - discountValue;
            setDiscountedTotal(discountedTotal);
            setDiscountAmount(discountValue);
        }

        if (tanggal_mulai && tanggal_selesai) {
            const calculateDuration = (startDate, endDate) => {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                return duration;
            };

            setHari(calculateDuration(tanggal_mulai, tanggal_selesai));
        }
    }, [invoiceData]);

    const handlePdfDownload = () => {
        if (!invoiceData) return;

        const doc = new jsPDF();

        // Add logo
        doc.addImage('/images/logo.png', 'PNG', 10, 10, 38, 38);

        // Add title
        doc.setFontSize(16);
        doc.text('Rental Motor Kudus', 60, 25);

        // Add invoice details
        doc.setFontSize(12);
        const margin = 10;
        const lineSpacing = 7;
        let cursorY = 60;

        const drawText = (label, text) => {
            doc.text(label, margin, cursorY);
            doc.text(String(text), margin + 50, cursorY);
            cursorY += lineSpacing;
        };

        drawText('No. Pemesanan:', invoiceData?.midtrans?.no_pemesanan || '');
        drawText('Tgl. Pemesanan:', invoiceData?.midtrans?.tanggal_pemesanan || '');
        drawText('Nama Pemesan:', invoiceData?.midtrans?.history?.nama_lengkap || '');
        drawText('Email:', invoiceData?.midtrans?.history?.email || '');
        drawText('Tanggal Pembayaran:', invoiceData?.midtrans?.tanggal_pembayaran || '');
        drawText('Metode Pembayaran:', invoiceData?.midtrans?.metode_pembayaran || '');
        drawText('Total Pembayaran:', invoiceData?.midtrans?.history?.total_pembayaran || '');
        drawText('Status:', invoiceData?.midtrans?.status_pembayaran || '');

        cursorY += lineSpacing;

        doc.text('DETAIL PEMBAYARAN', margin, cursorY);
        cursorY += lineSpacing;
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, cursorY, 200, cursorY);
        cursorY += lineSpacing;

        const motorDetails = [
            { label: 'Keterangan', text: invoiceData?.midtrans?.history?.list_motor?.nama_motor || '' },
            { label: 'Hari', text: String(hari) },
            { label: 'Satuan', text: invoiceData?.midtrans?.history?.list_motor?.harga_motor_per_1_hari || '' },
            { label: 'Total', text: hari * harga_motor_per_1_hari || '' }
        ];

        motorDetails.forEach(detail => {
            drawText(detail.label, detail.text);
        });

        cursorY += lineSpacing;
        doc.line(margin, cursorY, 200, cursorY);
        cursorY += lineSpacing;

        drawText('Total Pemesanan', hari * harga_motor_per_1_hari || '');
        drawText('Diskon', `${discountAmount} | ${invoiceData?.midtrans?.history?.diskon?.potongan_harga || ''}%`);
        drawText('Total Dibayar', invoiceData?.midtrans?.history?.total_pembayaran || '');

        doc.save('invoice.pdf');
    };

    if (!invoiceData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50 p-4"
        >
            <div className="bg-[#F6F7F9] p-6 rounded-lg relative mx-4 w-fit max-w-lg md:max-w-3xl overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Image src='/images/logo.png' alt='Logo' width={38} height={38} className='cursor-pointer' />
                        <span className='font-bold ml-2 hidden md:block text-base md:text-lg'>
                            Rental Motor Kudus
                        </span>
                    </div>
                    <AiOutlineClose className="w-6 h-6 cursor-pointer" onClick={onClose} />
                </div>
                <div className="bg-[#FFFFFF] p-4 rounded-lg">
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">No. Pemesanan :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{no_pemesanan}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Tgl. Pemesanan :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{tanggal_pemesanan}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Nama Pemesan :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{nama_lengkap}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Email :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{email}</span>
                    </div>
                    <div className='mt-5'>
                        <span className='font-semibold text-sm md:text-base'>INFO PEMBAYARAN</span>
                    </div>
                    <div className="border-t border-black my-2"></div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Tanggal Pembayaran :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{tanggal_pembayaran}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Metode Pembayaran :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{metode_pembayaran}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Total Pembayaran :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{total_pembayaran}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold opacity-55 text-sm md:text-base">Status :</span>
                        <span className="font-semibold ml-2 text-sm md:text-base">{status_pembayaran}</span>
                    </div>
                    <div className='mt-5'>
                        <span className='font-semibold text-sm md:text-base'>DETAIL PEMBAYARAN</span>
                    </div>
                    <div className="border-t border-black my-2"></div>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className='flex-col'>
                            <div className='mb-2'>
                                <span className='font-semibold text-sm md:text-base'>Keterangan</span>
                            </div>
                            <div className=''>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>{nama_motor}</span>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <div className='mb-2'>
                                <span className='font-semibold text-sm md:text-base'>Hari</span>
                            </div>
                            <div className=''>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>{hari}</span>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <div className='mb-2'>
                                <span className='font-semibold text-sm md:text-base'>Satuan</span>
                            </div>
                            <div className=''>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>{harga_motor_per_1_hari}</span>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <div className='mb-2'>
                                <span className='font-semibold text-sm md:text-base'>Total</span>
                            </div>
                            <div>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>{hari * harga_motor_per_1_hari}</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-black my-2"></div>
                    <div className='flex justify-end'>
                        <div className='flex-col'>
                            <div className='flex gap-5 mb-2'>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>Total Pemesanan</span>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>{hari * harga_motor_per_1_hari}</span>
                            </div>
                            <div className='flex gap-5'>
                                <span className='font-semibold opacity-55 text-sm md:text-base'>Diskon</span>
                                <div className='w-full text-end'>
                                    <span className='font-semibold opacity-55 text-sm md:text-base'>{discountAmount} | {potongan_harga}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-black my-2"></div>
                    <div className='flex justify-end gap-5 mb-4'>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>Total Dibayar</span>
                        </div>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>{total_pembayaran}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div>
                            <span className='italic text-xs md:text-sm'>Terima kasih telah booking di Rental Motor Kudus</span>
                        </div>
                        <div>
                            <button
                                onClick={handlePdfDownload}
                                className="flex items-center border border-black bg-transparent px-2 py-1 rounded-lg font-medium hover:bg-gray-100 text-sm md:text-base"
                            >
                                <AiOutlineFilePdf className="mr-2 h-6 w-6" />
                                <span>Cetak PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

    );
};

export default InvoicePopup;
