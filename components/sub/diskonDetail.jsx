import React from 'react';
import { Card, CardHeader, Input } from "@material-tailwind/react";
import DateInput from './dateInput';

const DiskonDetail = ({ diskon, image }) => {
    return (
        <Card className="w-full h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-4">
                    <span className="text-black font-medium">
                        Detail Diskon
                    </span>
                    <div className="border-t border-[#969696] w-full"></div>
                    <span className="text-black">
                        Foto
                    </span>
                    <div className="mr-4">
                        <img
                            src={image || 'https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg='}
                            alt="Image Preview"
                            className="max-w-40 h-auto rounded-md"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Diskon
                            </span>
                            <Input label="Masukkan nama diskon" value={diskon.nama_diskon} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Potongan Harga
                            </span>
                            <Input label="Masukkan potongan harga" value={diskon.potongan_harga} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <DateInput label="Tanggal Mulai" selectedDate={diskon.tanggal_mulai} onSelectDate={() => { }} />
                        <DateInput label="Tanggal Selesai" selectedDate={diskon.tanggal_selesai} onSelectDate={() => { }} />
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
    );
};

export default DiskonDetail;
