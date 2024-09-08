import React from 'react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Card, CardHeader, Radio, Input, Select, Option, Textarea, Typography, Popover, PopoverHandler, PopoverContent, } from "@material-tailwind/react";

const MoneyReportDetail = ({ keuangan, image }) => {
    const formatDate = (dateString) => {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        const date = new Date(dateString);
        const dayOfWeek = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();

        let period = 'pagi';
        if (hours === 0) {
            hours = 12;
        } else if (hours < 12) {
            period = 'pagi';
        } else if (hours === 12) {
            period = 'siang';
        } else if (hours > 12 && hours < 18) {
            hours -= 12;
            period = 'siang';
        } else if (hours >= 18) {
            hours -= 12;
            period = 'malam';
        }
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${dayOfWeek}, ${day} ${month} ${year}, ${hours}.${formattedMinutes} ${period}`;
    };
    return (
        <Card className="mb-20 xl:mb-0 w-full h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-4">
                    <span className="text-black font-medium">
                        Detail Laporan Keuangan
                    </span>
                    <div className="border-t border-[#969696] w-full"></div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Lengkap
                            </span>
                            <Input label="Masukkan nama pengguna" value={keuangan.history.nama_lengkap} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Email
                            </span>
                            <Input label="skipo@gmail.com" type="email" value={keuangan.history.email} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black text-lg">Total Harga Motor</span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                    Rp
                                </span>
                                <Input
                                    value={keuangan.total_harga_motor}
                                    label={`Masukkan harga motor perhari`}
                                    type="number"
                                />
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Gunakan angka untuk memasang harga
                            </Typography>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black text-lg">Total Biaya Overtime</span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                    Rp
                                </span>
                                <Input
                                    value={keuangan.total_biaya_overtime}
                                    label={`Masukkan harga motor perminggu`}
                                    type="number"
                                />
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Gunakan angka untuk memasang harga
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <a href="/admin">
                            <button
                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                            >
                                Kembali
                            </button>
                        </a>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default MoneyReportDetail