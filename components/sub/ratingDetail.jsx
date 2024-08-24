import React from 'react';
import { Card, CardHeader, Input, Textarea } from "@material-tailwind/react";

const RatingDetail = ({image, review}) => {
    return (
        <Card className="mb-20 xl:mb-0 w-full h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-4">
                    <span className="text-black font-medium">
                        Detail Ulasan
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
                                Nama Pengguna
                            </span>
                            <Input label="Masukkan nama pengguna" value={review.user.nama_pengguna} disabled />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Penilaian
                            </span>
                            <div className="flex gap-3">
                                {Array.from({ length: review.penilaian }, (_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                        <path d="M12 .587l3.668 7.425 8.332 1.212-6.042 5.888 1.426 8.31L12 18.897l-7.384 3.925 1.426-8.31L.412 9.224l8.332-1.212L12 .587z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black">
                                Komentar
                            </span>
                            <Textarea label="Masukkan komentar" value={review.komentar} disabled />
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

export default RatingDetail