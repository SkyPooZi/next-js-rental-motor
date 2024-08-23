import React from 'react';
import {
    Card,
    CardHeader,
    Button,
    Checkbox,
    Input,
    Select,
    Option,
    Textarea,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const EditHistoryForm = ({
    handleSubmit,
    history,
    setNamaLengkap,
    setEmail,
    setNomorTelp,
    setAkunSosmed,
    setAlamat,
    motors,
    handleSelectChangeNamaMotor,
    tanggal_mulai,
    handleDateStart,
    tanggal_selesai,
    handleDateEnd,
    setKeperluan,
    setNamaKontakDarurat,
    setNomorKontakDarurat,
    setHubunganKontakDarurat,
    diskons,
    handleSelectChangeDiskon,
    setTotalPembayaran,
    handleSelectChangeStatus,
    loading,
}) => {
    return (
        <form action='post' method='post' onSubmit={handleSubmit}>
            <Card className="w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">
                            Edit Riwayat
                        </span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Nama Lengkap
                                </span>
                                <Input
                                    label={`Masukkan nama lengkap (${history.nama_lengkap})`}
                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Email
                                </span>
                                <Input
                                    label={`Masukkan email (${history.email})`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Nomor Telp
                                </span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                                        +62
                                    </span>

                                    <Input
                                        type="number"
                                        label={`Masukkan nomor telp (${history.no_telp})`}
                                        placeholder="8892384434"
                                        onChange={(e) => {
                                            const inputValue = e.target.value;

                                            // Prevents user from starting the input with "0" after "+62"
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
                                <Input
                                    label={`Masukkan akun sosmed (${history.akun_sosmed})`}
                                    onChange={(e) => setAkunSosmed(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Alamat Lengkap
                                </span>
                                <Textarea
                                    label={`Masukkan alamat lengkap (${history.alamat})`}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Penyewa
                                </span>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex items-center">
                                        <Checkbox
                                            value="Diri Sendiri"
                                            checked={history.penyewa === "Diri Sendiri"}
                                            disabled
                                        />
                                        Diri Sendiri
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            value="Orang Lain"
                                            checked={history.penyewa === "Orang Lain"}
                                            disabled
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
                                {motors.length > 0 && (
                                    <div className="w-full">
                                        <Select
                                            label={`Pilih nama motor (${history.list_motor.nama_motor})`}
                                            onChange={handleSelectChangeNamaMotor}
                                        >
                                            {motors.map((motor) => (
                                                <Option key={motor.id} value={motor.id}>
                                                    {motor.nama_motor}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                )}
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
                                            label={`Pilih tanggal mulai (${history.tanggal_mulai})`}
                                            onChange={() => null}
                                            value={tanggal_mulai ? format(new Date(tanggal_mulai), "yyyy-MM-dd") : ""}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={tanggal_mulai ? new Date(tanggal_mulai) : undefined}
                                            onSelect={handleDateStart}
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
                                            label={`Pilih tanggal selesai (${history.tanggal_selesai})`}
                                            onChange={() => null}
                                            value={tanggal_selesai ? format(new Date(tanggal_selesai), "yyyy-MM-dd") : ""}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={tanggal_selesai ? new Date(tanggal_selesai) : undefined}
                                            onSelect={handleDateEnd}
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
                                <Textarea
                                    label={`Masukkan keperluan menyewa (${history.keperluan_menyewa})`}
                                    onChange={(e) => setKeperluan(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Penerimaan Motor
                                </span>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex items-center">
                                        <Checkbox
                                            value="Diambil"
                                            checked={history.penerimaan_motor === "Diambil"}
                                            disabled
                                        />
                                        Diambil
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            value="Diantar"
                                            checked={history.penerimaan_motor === "Diantar"}
                                            disabled
                                        />
                                        Diantar
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Nama Kontak Darurat
                                </span>
                                <Input
                                    label={`Masukkan nama kontak darurat (${history.nama_kontak_darurat})`}
                                    onChange={(e) => setNamaKontakDarurat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Nomor Kontak Darurat
                                </span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                                        +62
                                    </span>
                                    <Input
                                        type="number"
                                        label={`Masukkan nomor kontak darurat (${history.nomor_kontak_darurat})`}
                                        placeholder="8892384434"
                                        onChange={(e) => {
                                            const inputValue = e.target.value;

                                            // Prevents user from starting the input with "0" after "+62"
                                            if (inputValue.startsWith('0')) {
                                                setNomorKontakDarurat(inputValue.slice(1));
                                            } else {
                                                setNomorKontakDarurat(inputValue);
                                            }
                                        }}
                                        required
                                        className="border rounded-r"
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
                                <Input
                                    label={`Masukkan hubungan dengan kontak darurat (${history.hubungan_dengan_kontak_darurat})`}
                                    onChange={(e) => setHubunganKontakDarurat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Diskon
                                </span>
                                {diskons && diskons.length > 0 ? (
                                    <div className="w-full">
                                        <Select
                                            label={`Pilih diskon (${history.diskon?.nama_diskon || "Tidak ada diskon"})`}
                                            onChange={handleSelectChangeDiskon}
                                            disabled
                                        >
                                            {diskons.map((id_diskon) => (
                                                <Option key={id_diskon.id} value={id_diskon.id}>
                                                    {id_diskon.nama_diskon}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <Select
                                            label="Pilih diskon"
                                            onChange={handleSelectChangeDiskon}
                                            disabled
                                        >
                                            <Option key="no-discount" value="">
                                                Tidak ada diskon
                                            </Option>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Metode Pembayaran
                                </span>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex items-center">
                                        <Checkbox
                                            value="Tunai"
                                            checked={history.metode_pembayaran === "Tunai"}
                                            disabled
                                        />
                                        Tunai
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            value="Non-Tunai"
                                            checked={history.metode_pembayaran === "Non-Tunai"}
                                            disabled
                                        />
                                        Non-Tunai
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Total Pembayaran
                                </span>
                                <Input
                                    label={`Masukkan total pembayaran (${history.total_pembayaran})`}
                                    onChange={(e) => setTotalPembayaran(e.target.value)}
                                    type='number'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Status
                                </span>
                                <Select
                                    label={`Masukkan status (${history.status_history})`}
                                    onChange={handleSelectChangeStatus}
                                >
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
                            <Button
                                type="submit"
                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                loading={loading}
                            >
                                {loading ? 'Loading...' : 'Ubah Data'}
                            </Button>
                        </div>
                        <div>
                            <a href="/admin">
                                <button
                                    type='button'
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Kembali
                                </button>
                            </a>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </form>
    );
};

export default EditHistoryForm;
