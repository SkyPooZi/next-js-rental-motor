import React from 'react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Card, CardHeader, Checkbox, Input, Select, Option, Textarea, Popover, PopoverHandler, PopoverContent, } from "@material-tailwind/react";

const HistoryDetail = ({ history, image }) => {
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
                        Detail Riwayat
                    </span>
                    <div className="border-t border-[#969696] w-full"></div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Lengkap
                            </span>
                            <Input label="Masukkan nama pengguna" value={history.nama_lengkap} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Email
                            </span>
                            <Input label="skipo@gmail.com" type="email" value={history.email} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nomor Telp
                            </span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                    +62
                                </span>
                                <Input
                                    disabled
                                    type="number"
                                    label={`Tidak ada`}
                                    value={history.no_telp}
                                    placeholder="8892384434"
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (inputValue.startsWith('0')) {
                                            setNomorTelp(inputValue.slice(1));
                                        } else {
                                            setNomorTelp(inputValue);
                                        }
                                    }}
                                />
                            </div>
                            <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Akun Sosmed
                            </span>
                            <Input label="Masukkan akun sosmed" value={history.akun_sosmed} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Alamat Lengkap
                            </span>
                            <Textarea label="Masukkan alamat lengkap" value={history.alamat} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Penyewa
                            </span>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="flex items-center cursor-not-allowed">
                                    <Checkbox
                                        disabled
                                        value="Diri Sendiri"
                                        checked={history.penyewa === "Diri Sendiri"}
                                    />
                                    Diri Sendiri
                                </div>
                                <div className="flex items-center cursor-not-allowed">
                                    <Checkbox
                                        disabled
                                        value="Orang Lain"
                                        checked={history.penyewa === "Orang Lain"}
                                    />
                                    Orang Lain
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Motor
                            </span>
                            <Input label="Masukkan nama motor" value={history.list_motor.nama_motor} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Tanggal Mulai
                            </span>
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <Input
                                        disabled
                                        value={formatDate(history.tanggal_mulai)}
                                        onChange={() => null}
                                    />
                                </PopoverHandler>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        showOutsideDays
                                        className="border-0"
                                        classNames={{
                                            caption: "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label: "text-sm font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous: "absolute left-1.5",
                                            nav_button_next: "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row: "flex font-medium text-gray-900",
                                            head_cell: "m-0.5 w-9 font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today: "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled: "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Tanggal Selesai
                            </span>
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <Input
                                        disabled
                                        value={formatDate(history.tanggal_selesai)}
                                        onChange={() => null}
                                    />
                                </PopoverHandler>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        showOutsideDays
                                        className="border-0"
                                        classNames={{
                                            caption: "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label: "text-sm font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous: "absolute left-1.5",
                                            nav_button_next: "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row: "flex font-medium text-gray-900",
                                            head_cell: "m-0.5 w-9 font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today: "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled: "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Keperluan Menyewa
                            </span>
                            <Textarea label="Masukkan keperluan menyewa" value={history.keperluan_menyewa} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Penerimaan Motor
                            </span>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="flex items-center cursor-not-allowed">
                                    <Checkbox
                                        disabled
                                        value="Diambil"
                                        checked={history.penerimaan_motor === "Diambil"}
                                    />
                                    Diambil
                                </div>
                                <div className="flex items-center cursor-not-allowed">
                                    <Checkbox
                                        disabled
                                        value="Diantar"
                                        checked={history.penerimaan_motor === "Diantar"}
                                    />
                                    Diantar
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nomor Kontak Darurat
                            </span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                    +62
                                </span>
                                <Input
                                    disabled
                                    type="number"
                                    label={`Masukkan nomor telp`}
                                    value={history.no_telp_kontak_darurat}
                                    placeholder="8892384434"
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (inputValue.startsWith('0')) {
                                            setNomorTelp(inputValue.slice(1));
                                        } else {
                                            setNomorTelp(inputValue);
                                        }
                                    }}
                                />
                            </div>
                            <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Hubungan Dengan Kontak Darurat
                            </span>
                            <Input label="Masukkan Hubungan Dengan Kontak Darurat" value={history.hubungan_dengan_kontak_darurat} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Diskon
                            </span>
                            <Input label="Tidak ada" type="number" value={history.diskon} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Metode Pembayaran
                            </span>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="flex items-center cursor-not-allowed">
                                    <Checkbox
                                        disabled
                                        value="Tunai"
                                        checked={history.metode_pembayaran === "Tunai"}
                                    />
                                    Tunai
                                </div>
                                <div className="flex items-center cursor-not-allowed">
                                    <Checkbox
                                        disabled
                                        value="Non-Tunai"
                                        checked={history.metode_pembayaran === "Non-Tunai"}
                                    />
                                    Non-Tunai
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Total Pembayaran
                            </span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                    Rp
                                </span>
                                <Input label="Masukkan total pembayaran" type="number" value={history.total_pembayaran} disabled />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Status
                            </span>
                            <Select label="Masukkan status motor" value={history.status_history} disabled>
                                <Option className="text-white rounded-md w-full bg-blue-400" value='Menunggu Pembayaran'>
                                    Menunggu Pembayaran
                                </Option>
                                <Option className="text-white my-2 rounded-md w-full bg-yellow-400" value='Dipesan'>
                                    Dipesan
                                </Option>
                                <Option className="text-white my-2 rounded-md w-full bg-orange-400" value='Sedang Digunakan'>
                                    Sedang Digunakan
                                </Option>
                                <Option className="text-white my-2 rounded-md w-full bg-green-400" value='Selesai'>
                                    Selesai
                                </Option>
                                <Option className="text-white my-2 rounded-md w-full bg-red-400" value='Dibatalkan'>
                                    Dibatalkan
                                </Option>
                            </Select>
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

export default HistoryDetail