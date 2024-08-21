import React from 'react';
import { Select, Option, Radio } from '@material-tailwind/react';
import { Label } from '@/components/ui/label';
import { AiOutlineDollarCircle } from 'react-icons/ai';

const DetailHarga = ({ hargaRental, durasi, nama_motor, usePoint, handleCheckboxChange, point, pointValue, diskons, handleSelectChangeDiskon, total_pembayaran, clickedPaymentTunai, handleClickPaymentTunai, clickedPaymentCashless, handleClickPaymentCashless }) => {
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
                <div className='flex flex-col gap-8 '>
                    <div className='flex flex-col gap-5 '>
                        <div className='flex flex-row gap-5 justify-between'>
                            <Label>
                                <span className='font-medium text-base'>
                                    Harga Sewa
                                </span>
                            </Label>
                            <Label>
                                <span className='font-medium text-sm'>
                                    Rp. {hargaRental.toLocaleString()} (x{durasi})
                                </span>
                            </Label>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <Label>
                                <span className='font-medium text-sm text-[#757575]'>
                                    {nama_motor} ( {durasi} - Hari )
                                </span>
                            </Label>
                            <Label>
                                <span className='font-medium text-sm'>
                                    Rp. {(hargaRental * durasi).toLocaleString()}
                                </span>
                            </Label>
                        </div>
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
                        <div className='flex flex-row justify-end'>
                            <div className='w-full max-w-[368px] flex flex-col gap-2'>
                                <span className="text-black">
                                    Diskon
                                </span>
                                {diskons.length > 0 && (
                                    <div className="w-full">
                                        <Select
                                            label={`Pilih diskon`}
                                            onChange={handleSelectChangeDiskon}
                                            value={diskons[0].id}
                                        >
                                            {diskons.map((diskon) => {
                                                const potonganRupiah = (hargaRental * durasi * diskon.potongan_harga) / 100;
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
                        <div className='flex flex-row gap-12 mt-2 '>
                            <div className={`flex flex-row items-center cursor-pointer`}>
                                <Radio
                                    checked={clickedPaymentTunai}
                                    onChange={handleClickPaymentTunai}
                                />
                                Tunai
                            </div>
                            <div className={`flex flex-row items-center cursor-pointer`}>
                                <Radio
                                    checked={clickedPaymentCashless}
                                    onChange={handleClickPaymentCashless}
                                />
                                Non-Tunai
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
