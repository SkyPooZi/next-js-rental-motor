import React from 'react';
import { Card, CardHeader, Input, Textarea, Button, Select, Option } from '@material-tailwind/react';

const EditUserForm = ({
    handleSubmit,
    imagePreview,
    image,
    user,
    setNamaPengguna,
    setNamaLengkap,
    setEmail,
    setNomorHp,
    setAlamat,
    handleSelectChangeRole,
    handleImageChange,
    handleButtonClick,
    fileInputRef,
    loading,
    nama_pengguna,
    nama_lengkap,
    email,
    nomor_hp,
    alamat,
    peran,
}) => {
    return (
        <form action="post" method="post" onSubmit={handleSubmit}>
            <Card className="mb-20 xl:mb-0 w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">Edit Pengguna</span>
                        <div className="border-t border-[#969696] w-full"></div>
                        <span className="text-black">Foto</span>
                        <div className="mr-4">
                            <img
                                src={imagePreview || image}
                                alt="Image Preview"
                                className="w-32 h-32 rounded-full object-cover"
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
                            {/* <button
                                type="button"
                                onClick={handleButtonClick}
                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                            >
                                Pilih Foto
                            </button> */}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Pengguna</span>
                                <Input
                                    disabled
                                    label={`Masukkan nama pengguna`}
                                    value={nama_pengguna || ''}
                                    onChange={(e) => setNamaPengguna(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Lengkap</span>
                                <Input
                                    disabled
                                    label={`Masukkan nama lengkap`}
                                    value={nama_lengkap || ''}
                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Email</span>
                                <Input
                                    disabled
                                    label={`Masukkan email`}
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nomor HP</span>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                                        +62
                                    </span>
                                    <Input
                                        disabled
                                        type="number"
                                        label={`Masukkan no hp`}
                                        value={nomor_hp || ''}
                                        placeholder="8892384434"
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (inputValue.startsWith('0')) {
                                                setNomorHp(inputValue.slice(1));
                                            } else {
                                                setNomorHp(inputValue);
                                            }
                                        }}
                                    />
                                </div>
                                <span className='text-sm text-[#ff4d30]'>contoh: 88812345678</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Alamat</span>
                                <Textarea
                                    disabled
                                    value={alamat || ''}
                                    label={`Masukkan alamat`}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Peran</span>
                                <Select
                                    label={`Masukkan peran`}
                                    value={peran || ''}
                                    onChange={handleSelectChangeRole}
                                >
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

export default EditUserForm;
