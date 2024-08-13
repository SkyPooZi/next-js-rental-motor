import React from 'react';
import { Card, CardHeader, Input, Select, Option, Textarea } from "@material-tailwind/react";

const UserDetail = ({image, userData}) => {
    return (
        <Card className="w-full h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-4">
                    <span className="text-black font-medium">
                        Detail Pengguna
                    </span>
                    <div className="border-t border-[#969696] w-full"></div>
                    <span className="text-black">
                        Foto
                    </span>
                    <div className="mr-4">
                        <img
                            src={image || 'https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg='}
                            alt="Image Preview"
                            className="max-w-32 h-auto rounded-full"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Pengguna
                            </span>
                            <Input label="Masukkan nama pengguna" value={userData.nama_pengguna} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nama Lengkap
                            </span>
                            <Input label="Masukkan nama Lengkap" value={userData.nama_lengkap} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Email
                            </span>
                            <Input label="Masukkan email" type="email" value={userData.email} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Nomor HP
                            </span>
                            <Input label="Masukkan nomor HP" type="number" value={userData.nomor_hp} disabled />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Alamat
                            </span>
                            <Textarea label="Masukkan alamat lengkap" value={userData.alamat} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Peran
                            </span>
                            <Select label="Masukkan status motor" value={userData.peran} disabled>
                                <Option className="text-white rounded-md w-full bg-blue-400" value='admin'>
                                    Admin
                                </Option>
                                <Option className="text-white my-2 rounded-md w-full bg-green-400" value='user'>
                                    User
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

export default UserDetail