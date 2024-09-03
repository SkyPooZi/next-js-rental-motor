import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardHeader,
    Button,
    Radio,
    Input,
    Select,
    Option,
    Textarea,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

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
    selectedMotor,
    minEndDate,
    total_pembayaran,
    nomor_hp,
    nomor_kontak_darurat
}) => {
    return (
        <form action='post' method='post' onSubmit={handleSubmit}>
            <Card className="w-full h-full mb-12 lg:mb-0">
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
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.nama_lengkap}
                                // onChange={(e) => setNamaLengkap(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Email
                                </span>
                                <Input
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.email}
                                    // onChange={(e) => setEmail(e.target.value)}
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
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        +62
                                    </span>
                                    <Input
                                        disabled
                                        type="number"
                                        value={nomor_hp}
                                        label={`Tidak ada`}
                                        placeholder="8892384434"
                                    // onChange={(e) => {
                                    //     const inputValue = e.target.value;
                                    //     if (inputValue.startsWith('0')) {
                                    //         setNomorTelp(inputValue.slice(1));
                                    //     } else {
                                    //         setNomorTelp(inputValue);
                                    //     }
                                    // }}
                                    />
                                </div>
                                <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Akun Sosmed
                                </span>
                                <Input
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.akun_sosmed}
                                // onChange={(e) => setAkunSosmed(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Alamat Lengkap
                                </span>
                                <Textarea
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.alamat}
                                // onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Penyewa
                                </span>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex items-center">
                                        <Radio
                                            value="Diri Sendiri"
                                            checked={history.penyewa === "Diri Sendiri"}
                                            disabled
                                        />
                                        Diri Sendiri
                                    </div>
                                    <div className="flex items-center">
                                        <Radio
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
                                <div className='text-sm w-full'>
                                    {motors.length > 0 && (
                                        <Select
                                            label="Pilih nama motor"
                                            // value={selectedMotor}
                                            onChange={handleSelectChangeNamaMotor}
                                        >
                                            {motors
                                                .filter((motor) => motor.is_hidden !== 1)
                                                .map((motor) => (
                                                    <Option
                                                        key={motor.id}
                                                        value={motor.id}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className='flex gap-2 items-center flex-grow'>
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${motor.gambar_motor}`}
                                                                    alt={motor.nama_motor}
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-10 h-10 rounded-full mr-2"
                                                                />
                                                                <span className='mr-5'>{motor.nama_motor}</span>
                                                            </div>
                                                        </div>
                                                    </Option>
                                                ))}
                                        </Select>
                                    )}
                                </div>
                            </div>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='flex md:flex-row flex-col gap-5'>
                                <div className='w-full flex flex-col gap-2'>
                                    <span className="text-black">
                                        Tanggal Mulai <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <DateTimePicker
                                        disabled
                                        label="Pilih Tanggal Mulai"
                                        value={tanggal_mulai ? dayjs(tanggal_mulai) : null}
                                        onChange={handleDateStart}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Tanggal Selesai <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <DateTimePicker
                                        disabled
                                        label="Pilih Tanggal Selesai"
                                        value={tanggal_selesai ? dayjs(tanggal_selesai) : null}
                                        onChange={handleDateEnd}
                                        minDateTime={minEndDate ? dayjs(minEndDate) : null}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Keperluan Menyewa
                                </span>
                                <Textarea
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.keperluan_menyewa}
                                // onChange={(e) => setKeperluan(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Penerimaan Motor
                                </span>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex items-center">
                                        <Radio
                                            value="Diambil"
                                            checked={history.penerimaan_motor === "Diambil"}
                                            disabled
                                        />
                                        Diambil
                                    </div>
                                    <div className="flex items-center">
                                        <Radio
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
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.nama_kontak_darurat}
                                // onChange={(e) => setNamaKontakDarurat(e.target.value)}
                                />
                            </div>
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
                                        label={`Tidak ada`}
                                        value={nomor_kontak_darurat}
                                        placeholder="8892384434"
                                        // onChange={(e) => {
                                        //     const inputValue = e.target.value;
                                        //     if (inputValue.startsWith('0')) {
                                        //         setNomorKontakDarurat(inputValue.slice(1));
                                        //     } else {
                                        //         setNomorKontakDarurat(inputValue);
                                        //     }
                                        // }}
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
                                    disabled
                                    label={`Tidak ada`}
                                    value={history.hubungan_dengan_kontak_darurat}
                                // onChange={(e) => setHubunganKontakDarurat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Diskon
                                </span>
                                {diskons.length > 0 && (
                                    <div className="w-full">
                                        <Select
                                            label={`Pilih diskon`}
                                            value={history.diskon?.nama_diskon || 'Tidak ada diskon'}
                                            // onChange={handleSelectChangeDiskon}
                                            disabled
                                        >
                                            {diskons.map((id_diskon) => (
                                                <Option key={id_diskon.id} value={id_diskon.nama_diskon}>
                                                    {id_diskon.nama_diskon}
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
                                    Metode Pembayaran
                                </span>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex items-center">
                                        <Radio
                                            value="Tunai"
                                            checked={history.metode_pembayaran === "Tunai"}
                                            disabled
                                        />
                                        Tunai
                                    </div>
                                    <div className="flex items-center">
                                        <Radio
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
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-xl">
                                        Rp
                                    </span>
                                    <Input
                                        disabled
                                        label={`Masukkan total pembayaran`}
                                        value={total_pembayaran}
                                        onChange={(e) => setTotalPembayaran(e.target.value)}
                                        type='number'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Status
                                </span>
                                <Select
                                    label={`Ubah status`}
                                    onChange={handleSelectChangeStatus}
                                >
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
