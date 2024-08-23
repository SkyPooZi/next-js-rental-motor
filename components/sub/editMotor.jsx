import React from 'react';
import { Card, CardHeader, Select, Option, Input, Textarea, Button, Typography } from '@material-tailwind/react';

const EditMotorForm = ({
    handleSubmit,
    handleImageChange,
    handleButtonClick,
    fileInputRef,
    imagePreview,
    image,
    motor,
    motors,
    handleSelectChangeNamaMotor,
    handleSelectChangeType,
    setNamaMotor,
    setMerkMotor,
    setStokMotor,
    setHargaMotorPer1Hari,
    setHargaMotorPer1Minggu,
    setFasilitasMotor,
    handleSelectChangeStatus,
    loading
}) => {
    return (
        <form action="post" method="post" onSubmit={handleSubmit}>
            <Card className="w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Edit Motor</span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <span className="text-black">Foto</span>
                        <div className="mr-4">
                            <img
                                src={imagePreview || image}
                                alt="Image Preview"
                                className="max-w-40 h-auto rounded-md"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                id="picture"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                            >
                                Pilih Foto
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Motor</span>
                                <Input
                                    onChange={(e) => setNamaMotor(e.target.value)}
                                    label={`Masukkan nama motor (${motor.nama_motor})`}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Tipe</span>
                                <Select
                                    onChange={handleSelectChangeType}
                                    label={`Masukkan tipe motor (${motor.tipe_motor})`}
                                >
                                    <Option className="rounded-md w-full" value="Matic">
                                        Matic
                                    </Option>
                                    <Option className="my-2 rounded-md w-full" value="Manual">
                                        Manual
                                    </Option>
                                    <Option className="my-2 rounded-md w-full" value="Premium Matic">
                                        Premium Matic
                                    </Option>
                                    <Option className="my-2 rounded-md w-full" value="Sport">
                                        Sport
                                    </Option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Merk</span>
                                <Input
                                    onChange={(e) => setMerkMotor(e.target.value)}
                                    label={`Masukkan merk motor (${motor.merk_motor})`}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Stok</span>
                                <Input
                                    onChange={(e) => setStokMotor(e.target.value)}
                                    label={`Masukkan stok motor (${motor.stok_motor})`}
                                    type="number"
                                />
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
                                    Gunakan angka untuk memasang stok
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Harga Motor Per 1 Hari</span>
                                <Input
                                    onChange={(e) => setHargaMotorPer1Hari(e.target.value)}
                                    label={`Masukkan harga motor perhari (${motor.harga_motor_per_1_hari})`}
                                    type="number"
                                />
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
                                <span className="text-black">Harga Motor Per 1 Minggu</span>
                                <Input
                                    onChange={(e) => setHargaMotorPer1Minggu(e.target.value)}
                                    label={`Masukkan harga motor perminggu (${motor.harga_motor_per_1_minggu})`}
                                    type="number"
                                />
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
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Fasilitas <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Textarea
                                    onChange={(e) => setFasilitasMotor(e.target.value)}
                                    label={`Masukkan fasilitas tambahan (${motor.fasilitas_motor})`}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Status <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Select
                                    label={`Masukkan status motor (${motor.status_motor})`}
                                    onChange={handleSelectChangeStatus}
                                    name="motorStatus"
                                >
                                    <Option className="text-white rounded-md w-full bg-green-400" value="Tersedia">
                                        Tersedia
                                    </Option>
                                    <Option className="text-white my-2 rounded-md w-full bg-orange-400" value="Tertunda">
                                        Tertunda
                                    </Option>
                                    <Option className="text-white rounded-md w-full bg-red-400" value="Tidak Tersedia">
                                        Tidak Tersedia
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

export default EditMotorForm;
