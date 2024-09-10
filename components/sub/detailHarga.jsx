import React from 'react';
import { Select, Option, Radio } from '@material-tailwind/react';
import { Label } from '@/components/ui/label';
import { AiOutlineDollarCircle } from 'react-icons/ai';

const DetailHarga = ({
    hargaRental, durasi, nama_motor, usePoint, handleCheckboxChange, point, pointValue, diskons, handleSelectChangeDiskon,
    total_pembayaran, clickedPaymentTunai, handleClickPaymentTunai, clickedPaymentCashless, handleClickPaymentCashless, biayaAdmin
}) => {
    // Calculate days and hours from durasi
    let days = Math.floor(durasi / 24);
    let hours = durasi % 24;

    // If hours exceed 4, add 1 more day and reset hours to 0
    if (hours > 4) {
        days += 1;
        hours = 0;
    }

    // Calculate price per hour (for overtime), but this won't be used if hours > 4
    const pricePerHour = hargaRental / 24;

    return (
        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                <Label>
                    <span className='font-extrabold text-black text-lg'>
                        Detail Harga
                    </span>
                </Label>
                <span className='text-[#00875A] text-[14px]'>
                    Gunakan kupon di halaman pembayaran untuk harga yang lebih murah
                </span>
            </div>

            <div className='mt-10'>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-5'>
                        {/* Harga Sewa */}
                        <div className='flex flex-row gap-5 justify-between'>
                            <Label>
                                <span className='font-medium text-base'>
                                    Harga Sewa
                                </span>
                            </Label>
                            <Label>
                                <span className='font-medium text-sm'>
                                    Rp. {hargaRental.toLocaleString()} (x{days} hari)
                                </span>
                            </Label>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <Label>
                                <span className='font-medium text-sm text-[#757575]'>
                                    {nama_motor} ({days} hari)
                                </span>
                            </Label>
                            <Label>
                                <span className='font-medium text-sm'>
                                    Rp. {(hargaRental * days).toLocaleString()}
                                </span>
                            </Label>
                        </div>

                        <div className="flex flex-row justify-between">
                            <Label>
                                <span className='font-medium text-sm text-[#757575]'>
                                    Biaya Admin 2%
                                </span>
                            </Label>
                            <Label>
                                <span className='font-medium text-sm'>
                                    Rp. {(biayaAdmin).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                            </Label>
                        </div>

                        {/* Overtime Price Section */}
                        {/* Only show this section if hours is greater than 0 and less than or equal to 4 */}
                        {hours > 0 && hours <= 4 && (
                            <div className='flex flex-row justify-between'>
                                <Label>
                                    <span className='font-medium text-sm text-[#757575]'>
                                        Harga Overtime ({hours} jam)
                                    </span>
                                </Label>
                                <Label>
                                    <span className='font-medium text-sm'>
                                        Rp. {(pricePerHour * hours).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </span>
                                </Label>
                            </div>
                        )}

                        {/* Checkbox for Points */}
                        <div className='flex flex-row gap-2 mt-2 items-center justify-between'>
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="checkbox"
                                    id="points"
                                    checked={usePoint}
                                    onChange={handleCheckboxChange}
                                    className={`custom-checkbox h-5 w-5 rounded-full border-2 border-orange-600 text-orange-600 transition duration-150 ease-in-out cursor-pointer`}
                                    style={{
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none'
                                    }}
                                />
                                <div className='flex flex-row gap-1 items-center'>
                                    <AiOutlineDollarCircle color='#FF4D30' size='23px' />
                                    <Label>
                                        <span className='font-medium text-[14px] text-[#FF4D30]'>
                                            {point} Gunakan Poin
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label>
                                    <span className='font-medium text-[14px] text-[#FF4D30]'>
                                        -Rp. {pointValue}
                                    </span>
                                </Label>
                            </div>
                        </div>

                        {/* Diskon Select */}
                        <div className='flex flex-row justify-end'>
                            <div className='w-full max-w-[368px] flex flex-col gap-2'>
                                <span className="text-black">Diskon</span>
                                {diskons.length > 0 && (
                                    <div className="w-full">
                                        <Select
                                            label={`Pilih diskon`}
                                            onChange={handleSelectChangeDiskon}
                                            value={diskons[0]?.id}
                                        >
                                            {diskons.map((diskon) => {
                                                const potonganRupiah = (hargaRental * days * diskon.potongan_harga) / 100;
                                                return (
                                                    <Option key={diskon.id} value={diskon.id}>
                                                        {diskon.nama_diskon} - Potongan: Rp. {potonganRupiah.toLocaleString()}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Total Payment */}
                        <div className='flex flex-row justify-end mt-2'>
                            <Label>
                                <span className='font-medium md:text-base text-xs'>
                                    Rp. {total_pembayaran.toLocaleString()}
                                </span>
                            </Label>
                        </div>
                        <div className="border-t border-[#757575] mt-2"></div>
                        <div className='flex flex-row justify-between'>
                            <Label>
                                <span className='font-medium text-base'>
                                    Total Harga
                                </span>
                            </Label>
                            <Label>
                                <span className='font-medium text-base text-[#FF4D30]'>
                                    Rp. {total_pembayaran.toLocaleString()}
                                </span>
                            </Label>
                        </div>

                        {/* Payment Options */}
                        <div className='flex flex-row gap-12 mt-2 '>
                            <div className={`flex flex-row items-center cursor-pointer`}>
                                <Radio
                                    checked={clickedPaymentTunai}
                                    onChange={handleClickPaymentTunai}
                                    label={'Tunai'}
                                />
                            </div>
                            <div className={`flex flex-row items-center cursor-pointer`}>
                                <Radio
                                    checked={clickedPaymentCashless}
                                    onChange={handleClickPaymentCashless}
                                    label={'Non-Tunai'}
                                />
                            </div>
                        </div>
                        {clickedPaymentTunai && (
                            <span className='text-[#FF4D33]'>Booking dengan pembayaran tunai hanya bisa dilakukan hari ini!</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailHarga;
