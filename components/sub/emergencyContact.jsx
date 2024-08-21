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
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <span className="text-black">
                                Nomor Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <Input
                                type='number'
                                label="Masukkan nomor kontak darurat"
                                value={nomor_kontak_darurat}
                                onChange={(e) => setNomorKontakDarurat(e.target.value)}
                                required
                            />
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
