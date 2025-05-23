import React from 'react';
import {
    Card,
    CardHeader,
    Button,
    Input,
    Popover,
    PopoverHandler,
    PopoverContent,
    Select,
    Option,
    Typography,
} from "@material-tailwind/react";
import { DayPicker } from 'react-day-picker';
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';

const EditDiscountForm = ({
    handleSubmit,
    handleImageChange,
    handleButtonClick,
    fileInputRef,
    imagePreview,
    image,
    diskon,
    setNamaDiskon,
    setPotonganHarga,
    tanggal_mulai,
    handleDateStart,
    tanggal_selesai,
    handleDateEnd,
    loading,
    nama_diskon,
    potongan_harga,
    is_hidden,
    handleSelectIsHidden
}) => {
    return (
        <form action="post" method="post" onSubmit={handleSubmit}>
            <Card className="mb-20 xl:mb-0 w-full h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-4">
                        <span className="text-black font-medium">
                            Edit Diskon Baru
                        </span>
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
                        <span className="text-[#6B7280] text-xs">
                            Gambar profile memiliki rasio 1:1
                            dan tidak lebih dari 2MB.
                        </span>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Nama Diskon</span>
                                <Input
                                    label={`Masukkan nama diskon`}
                                    value={nama_diskon || ''}
                                    onChange={(e) => setNamaDiskon(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Potongan Harga</span>
                                <Input
                                    type="number"
                                    label={`Masukkan potongan harga`}
                                    value={potongan_harga || ''}
                                    onChange={(e) => {
                                        const value = Math.min(20, Number(e.target.value));
                                        setPotonganHarga(value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">Tanggal Mulai</span>
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label={`Pilih tanggal mulai`}
                                            onChange={() => null}
                                            value={tanggal_mulai ? format(new Date(tanggal_mulai), 'yyyy-MM-dd') : ''}
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
                                                caption: 'flex justify-center py-2 mb-4 relative items-center',
                                                caption_label: 'text-sm font-medium text-gray-900',
                                                nav: 'flex items-center',
                                                nav_button:
                                                    'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                                                nav_button_previous: 'absolute left-1.5',
                                                nav_button_next: 'absolute right-1.5',
                                                table: 'w-full border-collapse',
                                                head_row: 'flex font-medium text-gray-900',
                                                head_cell: 'm-0.5 w-9 font-normal text-sm',
                                                row: 'flex w-full mt-2',
                                                cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                                                day: 'h-9 w-9 p-0 font-normal',
                                                day_range_end: 'day-range-end',
                                                day_selected:
                                                    'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
                                                day_today: 'rounded-md bg-gray-200 text-gray-900',
                                                day_outside:
                                                    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                                                day_disabled: 'text-gray-500 opacity-50',
                                                day_hidden: 'invisible',
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
                                <span className="text-black">Tanggal Selesai</span>
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label={`Pilih tanggal selesai`}
                                            onChange={() => null}
                                            value={tanggal_selesai ? format(new Date(tanggal_selesai), 'yyyy-MM-dd') : ''}
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
                                                caption: 'flex justify-center py-2 mb-4 relative items-center',
                                                caption_label: 'text-sm font-medium text-gray-900',
                                                nav: 'flex items-center',
                                                nav_button:
                                                    'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                                                nav_button_previous: 'absolute left-1.5',
                                                nav_button_next: 'absolute right-1.5',
                                                table: 'w-full border-collapse',
                                                head_row: 'flex font-medium text-gray-900',
                                                head_cell: 'm-0.5 w-9 font-normal text-sm',
                                                row: 'flex w-full mt-2',
                                                cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                                                day: 'h-9 w-9 p-0 font-normal',
                                                day_range_end: 'day-range-end',
                                                day_selected:
                                                    'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
                                                day_today: 'rounded-md bg-gray-200 text-gray-900',
                                                day_outside:
                                                    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                                                day_disabled: 'text-gray-500 opacity-50',
                                                day_hidden: 'invisible',
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
                        <div className="w-full flex flex-col gap-2">
                            <span className="text-black text-lg">
                                Status Tampilkan Diskon <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Select
                                label={`Masukkan status diskon`}
                                onChange={handleSelectIsHidden}
                                value={is_hidden}
                                name="diskonStatus"
                            >
                                <Option className="text-white mb-2 rounded-md w-full bg-yellow-800" value={0}>
                                    Tampilkan
                                </Option>
                                <Option className="text-white rounded-md w-full bg-gray-800" value={1}>
                                    Sembunyikan
                                </Option>
                            </Select>
                            {is_hidden === 0 && (
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
                                    Pilih Tampilkan Jika Ingin Menampilkan Diskon
                                </Typography>
                            )}
                            {is_hidden === 1 && (
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
                                    Pilih Sembunyikan Jika Ingin Menyembunyikan Diskon
                                </Typography>
                            )}
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

export default EditDiscountForm;
