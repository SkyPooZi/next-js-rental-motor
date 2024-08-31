import React from 'react';
import { Input } from '@material-tailwind/react';
import { Label } from '@/components/ui/label';

const EmergencyContact = ({ nama_kontak_darurat, setNamaKontakDarurat, nomor_kontak_darurat, setNomorKontakDarurat, hubungan_dengan_kontak_darurat, setHubunganDenganKontakDarurat }) => {
    return (
        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                <Label>
                    <span className='font-extrabold text-black text-lg'>
                        Kontak Darurat
                    </span>
                </Label>
                <span className='text-[#FF4D30] text-[14px]'>
                    Untuk mengatasi masalah seperti kecelakaan dibutuhkan kontak selain pemesan
                </span>
            </div>
            <div className='mt-10'>
                <div className='flex flex-col gap-8 '>
                    <div className='flex md:flex-row flex-col gap-5 '>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Nama Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                label="Masukkan nama kontak darurat"
                                value={nama_kontak_darurat}
                                onChange={(e) => setNamaKontakDarurat(e.target.value)}
                                required
                            />
                            {/* Additional text below the input field */}
                            <span className='text-sm text-[#FF4d33]'>
                                Pastikan nama kontak darurat berbeda dari nama pemesan.
                            </span>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Nomor Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                                    +62
                                </span>
                                <Input
                                    type="number"
                                    label="Masukkan nomor kontak darurat"
                                    placeholder="8892384434"
                                    value={nomor_kontak_darurat}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
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
                    <div className='flex flex-row gap-5 '>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Hubungan Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                label="Masukkan hubungan kontak darurat"
                                value={hubungan_dengan_kontak_darurat}
                                onChange={(e) => setHubunganDenganKontakDarurat(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContact;
